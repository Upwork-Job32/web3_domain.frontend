import { ethers } from 'ethers'
import { WalletState, TransactionHistoryItem } from '../../types/wallet'
import {
  stringToHex,
  fetchMinValue,
  CONSTANTS,
  delay
} from '../../services/wallet-service'

/**
 * Helper function to update transaction history in the wallet state
 */
export const updateTransactionHistory = (
  walletState: WalletState,
  setWalletState: React.Dispatch<React.SetStateAction<WalletState>>,
  setWalletHistory: (history: TransactionHistoryItem[]) => void,
  currentStep: number,
  status: WalletState['status'],
  values: {
    stakeAmount?: string
    domainName?: string
    currentPrice?: string
    maxPkt?: string
    stakeId?: string
    txId?: string
  }
) => {
  setWalletState((prev) => {
    console.log(walletState)
    const newHistory = [...(prev.transactionHistory || [])]
    // Remove any existing entry for this step
    const stepIndex = newHistory.findIndex((step) => step.step === currentStep)
    if (stepIndex >= 0) {
      newHistory.splice(stepIndex, 1)
    }
    // Add new entry
    newHistory.push({
      step: currentStep,
      status,
      ...values,
      timestamp: Date.now()
    })

    // Update the context with the new history
    setWalletHistory(newHistory)
    console.log(`Updating wallet history for step ${currentStep}:`, newHistory)

    return {
      ...prev,
      status,
      step: currentStep,
      ...values,
      transactionHistory: newHistory
    }
  })
}

/**
 * Helper function to handle transaction errors
 */
export const handleTransactionError = async (
  error: any,
  step: number,
  walletState: WalletState,
  setIsAvailableRegister: React.Dispatch<React.SetStateAction<boolean>>,
  setWalletHistory: (history: TransactionHistoryItem[]) => void,
  navigate: (path: string, options?: any) => void
) => {
  console.error('Transaction error:', error)
  setIsAvailableRegister(true)

  // Store the history in a local variable to ensure we have it for navigation
  const historyToSave = walletState.transactionHistory || []

  // Update the context
  if (historyToSave.length > 0) {
    setWalletHistory(historyToSave)
    console.log('Setting wallet history in context:', historyToSave)
  }

  await delay(500) // Shorter delay to give context time to update

  // Navigate with history as state parameter for redundancy
  navigate('/web3-register/failed', {
    state: {
      history: historyToSave,
      step: walletState.step || step
    }
  })
}

/**
 * Execute the domain registration process
 */
export const registerDomain = async (
  walletState: WalletState,
  setWalletState: React.Dispatch<React.SetStateAction<WalletState>>,
  setWalletHistory: (history: TransactionHistoryItem[]) => void,
  setIsAvailableRegister: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: (path: string, options?: any) => void,
  domainName: string,
  stakeAmount: string,
  currentPrice: bigint
) => {
  const { PKT_BASE, LOCKBOX, PNS, MULTIPAY } = CONSTANTS

  setIsAvailableRegister(false)
  let maxPkt: bigint
  let myStakeId = 0

  try {
    if (stakeAmount === '') {
      maxPkt = 50000n * 10n ** 18n
    } else {
      maxPkt = ethers.parseEther(stakeAmount)
    }
  } catch (e) {
    const err = `The maximum PKT to stake must be a valid integer`
    console.log(err)
    alert(err)
    return
  }

  if (!/^[a-z0-9-]+$/.test(domainName)) {
    const err = `Domains can only have the letters, numbers and dashes`
    console.log(err)
    alert(err)
    return
  }

  try {
    // Get current minimum value from API
    const minValue = await fetchMinValue(walletState.address!, domainName)

    // Check if stake amount meets minimum value
    if (maxPkt < minValue) {
      const err = `The maximum PKT to stake is less than required amount: ${ethers.formatEther(
        minValue
      )}`
      console.log(err)
      setWalletState((prev) => ({ ...prev, status: 'price_changed' }))
      return
    }

    const availableRes = await fetch(
      `https://app.pkt.cash/api/v1/pns/domain-available/${domainName}`
    )
    const available = await availableRes.json()
    console.log(available, domainName, 'available')

    if (!available.is_available) {
      const err = `Domain ${domainName}.pkt is already registered`
      console.log(err)
      alert(err)
      return
    }

    if (!available.is_valid) {
      const err = `Domain ${domainName}.pkt is not valid (can only be letters and numbers split up by dashes)`
      console.log(err)
      alert(err)
      return
    }

    if (maxPkt < BigInt(available.min_value)) {
      const err = `The maximum PKT to stake is less than required amount: ${ethers.formatEther(
        available.min_value
      )}`
      console.log(err)
      alert(err)
      return
    }

    if (
      !walletState.signer ||
      !walletState.erc20abi ||
      !walletState.lockboxabi ||
      !walletState.multipayabi ||
      !walletState.pnsabi
    ) {
      console.error('Wallet state is not properly initialized')
      return
    }

    const token = new ethers.Contract(
      PKT_BASE,
      walletState.erc20abi,
      walletState.signer
    )
    const lockbox = new ethers.Contract(
      LOCKBOX,
      walletState.lockboxabi,
      walletState.signer
    )
    const multipay = new ethers.Contract(
      MULTIPAY,
      walletState.multipayabi,
      walletState.signer
    )
    const pns = new ethers.Contract(PNS, walletState.pnsabi, walletState.signer)

    // Step 1: Pre-allocating stake
    console.log(`[1/4] Pre-allocating stake`)
    updateTransactionHistory(
      walletState,
      setWalletState,
      setWalletHistory,
      1,
      'pre_allocating',
      {
        domainName,
        currentPrice: Number(ethers.formatEther(currentPrice)).toLocaleString(),
        maxPkt: stakeAmount
      }
    )

    try {
      myStakeId = await multipay.getStake(walletState.address)
      if (myStakeId > 0) {
        console.log(`  - Got stake: ${myStakeId}`)
        updateTransactionHistory(
          walletState,
          setWalletState,
          setWalletHistory,
          1,
          'pre_allocating',
          {
            stakeId: myStakeId.toString(),
            domainName,
            currentPrice: Number(
              ethers.formatEther(currentPrice)
            ).toLocaleString(),
            maxPkt: stakeAmount
          }
        )
      } else {
        const gasLimit = await multipay.createEmptyStake.estimateGas(LOCKBOX)
        const res = await multipay.createEmptyStake(LOCKBOX, { gasLimit })
        const tx = await res.wait()
        console.log(`  - TXID: ${tx.hash}`)
        await showTempTxId(walletState, setWalletState, tx.hash)

        myStakeId = await multipay.getStake(walletState.address)
        console.log(`  - Got stake: ${myStakeId}`)
        updateTransactionHistory(
          walletState,
          setWalletState,
          setWalletHistory,
          1,
          'pre_allocating',
          {
            stakeId: myStakeId.toString(),
            domainName,
            currentPrice: Number(
              ethers.formatEther(currentPrice)
            ).toLocaleString(),
            maxPkt: stakeAmount,
            txId: tx.hash
          }
        )
      }
    } catch (error) {
      console.error('Error in pre-allocation:', error)
      await handleTransactionError(
        error,
        1,
        walletState,
        setIsAvailableRegister,
        setWalletHistory,
        navigate
      )
      return
    }

    // Step 2: Authorizing
    console.log(
      `[2/4] Authorizing Multipay contract to stake up to ${ethers.formatEther(
        maxPkt
      )} PKT`
    )
    updateTransactionHistory(
      walletState,
      setWalletState,
      setWalletHistory,
      2,
      'authorizing',
      {
        stakeId: myStakeId.toString(),
        domainName,
        currentPrice: Number(ethers.formatEther(currentPrice)).toLocaleString(),
        maxPkt: stakeAmount
      }
    )

    try {
      const balance = await token.balanceOf(walletState.address)
      console.log('User balance:', ethers.formatEther(balance), 'PKT')

      if (balance < maxPkt) {
        setWalletState((prev) => ({ ...prev, status: 'low_funds' }))
        return
      }

      const gasLimit = await token.approve.estimateGas(MULTIPAY, maxPkt)
      const res = await token.approve(MULTIPAY, maxPkt, { gasLimit })
      const tx = await res.wait()
      console.log(`  - TXID: ${tx.hash}`)
      await showTempTxId(walletState, setWalletState, tx.hash)
      updateTransactionHistory(
        walletState,
        setWalletState,
        setWalletHistory,
        2,
        'authorizing',
        {
          stakeId: myStakeId.toString(),
          domainName,
          currentPrice: Number(
            ethers.formatEther(currentPrice)
          ).toLocaleString(),
          maxPkt: stakeAmount,
          txId: tx.hash
        }
      )
    } catch (error) {
      console.error('Approval error:', error)
      await handleTransactionError(
        error,
        2,
        walletState,
        setIsAvailableRegister,
        setWalletHistory,
        navigate
      )
      return
    }

    // Step 3: Staking Domain
    console.log(`[3/4] Calling Multipay.stakeDomain()`)
    updateTransactionHistory(
      walletState,
      setWalletState,
      setWalletHistory,
      3,
      'staking',
      {
        stakeId: myStakeId.toString(),
        domainName,
        currentPrice: Number(ethers.formatEther(currentPrice)).toLocaleString(),
        maxPkt: stakeAmount
      }
    )

    try {
      const encodedDomain = stringToHex(domainName)
      const args = [PKT_BASE, LOCKBOX, PNS, maxPkt, encodedDomain, '0x']
      const gasLimit = await multipay.stakeDomain.estimateGas(...args)
      const res = await multipay.stakeDomain(...args, { gasLimit })
      const tx = await res.wait()
      console.log(`  - TXID: ${tx.hash}`)

      const stakeObj = await lockbox.lockups(myStakeId)
      const actualStake = ethers.formatEther(stakeObj[0])
      console.log(`Actual PKT staked: ${actualStake}`)

      updateTransactionHistory(
        walletState,
        setWalletState,
        setWalletHistory,
        3,
        'staking',
        {
          stakeId: myStakeId.toString(),
          domainName,
          currentPrice: Number(
            ethers.formatEther(currentPrice)
          ).toLocaleString(),
          maxPkt: stakeAmount,
          txId: tx.hash
        }
      )
    } catch (error) {
      console.error('Stake domain error:', error)
      await handleTransactionError(
        error,
        3,
        walletState,
        setIsAvailableRegister,
        setWalletHistory,
        navigate
      )
      return
    }

    // Step 4: Finalizing Registration
    console.log(`[4/4] Calling PNS.register() to finalize registration`)
    updateTransactionHistory(
      walletState,
      setWalletState,
      setWalletHistory,
      4,
      'reserved',
      {
        stakeId: myStakeId.toString(),
        domainName,
        currentPrice: Number(ethers.formatEther(currentPrice)).toLocaleString(),
        maxPkt: stakeAmount
      }
    )

    try {
      const encodedDomain = stringToHex(domainName)
      const args = [myStakeId, encodedDomain, '0x']
      const gasLimit = await pns.register.estimateGas(...args)
      const res = await pns.register(...args, { gasLimit })
      const tx = await res.wait()
      console.log(`  - TXID: ${tx.hash}`)
      await showTempTxId(walletState, setWalletState, tx.hash)

      const did = await pns.getDomainIdByLockupId(myStakeId)
      console.log(`Got domain ID ${did}`)

      updateTransactionHistory(
        walletState,
        setWalletState,
        setWalletHistory,
        4,
        'reserved',
        {
          stakeAmount: myStakeId.toString(),
          domainName,
          currentPrice: Number(
            ethers.formatEther(currentPrice)
          ).toLocaleString(),
          maxPkt: stakeAmount,
          txId: tx.hash
        }
      )
      await delay(2000)
      navigate('/web3-register/success', {
        state: { domainId: myStakeId.toString() }
      })
    } catch (error) {
      console.error('Error finalizing registration:', error)
      await handleTransactionError(
        error,
        4,
        walletState,
        setIsAvailableRegister,
        setWalletHistory,
        navigate
      )
    }
  } catch (error) {
    console.error(error)
    setWalletState((prev) => ({ ...prev, status: 'connected' }))
  }
}

/**
 * Helper function to show transaction ID temporarily
 */
export const showTempTxId = async (
  walletState: WalletState,
  setWalletState: React.Dispatch<React.SetStateAction<WalletState>>,
  txHash: string
) => {
  setWalletState((prev) => {
    const newHistory = [...(prev.transactionHistory || [])]
    const currentStep = prev.step || 1
    console.log(walletState)
    // Update or add the current step's transaction
    const stepIndex = newHistory.findIndex((step) => step.step === currentStep)
    if (stepIndex >= 0) {
      newHistory[stepIndex] = {
        ...newHistory[stepIndex],
        txId: txHash,
        stakeAmount: prev.stakeAmount,
        timestamp: Date.now()
      }
    } else {
      newHistory.push({
        step: currentStep,
        status: prev.status || '',
        txId: txHash,
        stakeAmount: prev.stakeAmount,
        timestamp: Date.now()
      })
    }

    return { ...prev, txId: txHash, transactionHistory: newHistory }
  })
  await delay(2000)
  setWalletState((prev) => ({ ...prev, txId: undefined }))
}

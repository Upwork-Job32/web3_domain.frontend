import { useEffect } from 'react'
import { ethers } from 'ethers'
import { WalletState } from '../../types/wallet'

import { erc20Abi } from '../../abi/erc20-abi'
import { lockboxAbi } from '../../abi/lockbox-abi'
import { multiPlayAbi } from '../../abi/multipay-abi'
import { pnsAbi } from '../../abi/pns-abi'

interface WalletConnectorProps {
  walletState: WalletState
  setWalletState: React.Dispatch<React.SetStateAction<WalletState>>
  simulateWalletFlow: () => Promise<void>
}

const WalletConnector: React.FC<WalletConnectorProps> = ({
  walletState,
  setWalletState,
  simulateWalletFlow
}) => {
  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      setWalletState({ status: 'not_found', transactionHistory: [] })
    } else {
      simulateWalletFlow()
    }
  }

  const handleChainChanged = () => {
    simulateWalletFlow()
  }

  useEffect(() => {
    const initWallet = async () => {
      setWalletState({ ...walletState, status: 'loading' })

      if (typeof window.ethereum === 'undefined') {
        console.log('No wallet found')
        setWalletState({ ...walletState, status: 'not_found' })
        return
      }

      try {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' })
        } catch (error: any) {
          if (error.code === -32002) {
            console.log(
              'Wallet connection request already pending. Please check your wallet.'
            )
            setWalletState({ ...walletState, status: 'not_found' })
            return
          }
          throw error
        }

        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x2105' }]
          })
        } catch (switchError: any) {
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: '0x2105',
                    chainName: 'Base',
                    nativeCurrency: {
                      name: 'ETH',
                      symbol: 'ETH',
                      decimals: 18
                    },
                    rpcUrls: ['https://mainnet.base.org'],
                    blockExplorerUrls: ['https://basescan.org']
                  }
                ]
              })
            } catch (addError) {
              console.error('Failed to add Base network:', addError)
              setWalletState({ ...walletState, status: 'not_found' })
              return
            }
          } else {
            console.error('Failed to switch to Base network:', switchError)
            setWalletState({ ...walletState, status: 'not_found' })
            return
          }
        }

        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const address = await signer.getAddress()

        setWalletState({
          ...walletState,
          status: 'connected',
          address: address,
          label: address.slice(0, 6) + '...' + address.slice(-4),
          provider: provider,
          signer: signer,
          erc20abi: erc20Abi,
          lockboxabi: lockboxAbi,
          multipayabi: multiPlayAbi,
          pnsabi: pnsAbi
        })
        console.log('Ready.')

        window.ethereum.on('accountsChanged', handleAccountsChanged)
        window.ethereum.on('chainChanged', handleChainChanged)
      } catch (error) {
        console.error('Error connecting to wallet:', error)
        setWalletState({ ...walletState, status: 'not_found' })
      }
    }

    initWallet()

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
        window.ethereum.removeListener('chainChanged', handleChainChanged)
      }
    }
  }, [])

  return null
}

export default WalletConnector

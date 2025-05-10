import { ethers } from 'ethers'
import { WalletState } from '../types/wallet'

export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const stringToHex = (str: string): string => {
  return (
    '0x' +
    Array.from(str)
      .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('')
  )
}

export const getStakeLabel = (status: WalletState['status']): string => {
  return status === 'pre_allocating' ? 'Got stake:' : 'Actual stake amount:'
}

export const CONSTANTS = {
  PKT_BASE: '0x917f39bb33b2483dd19546b1e8d2f09ce481ee44',
  LOCKBOX: '0x14d15765c66e8f0c7f8757d1d19137b714dfcc60',
  PNS: '0xDc8eb1D1052a2078B33dd188201eAf3F080E0258',
  MULTIPAY: '0x3e11E1F68F736209662d5695148986585ca2c971',
  BASE_PRICE: 1000n * 10n ** 18n, // 1000 PKT in wei
  PRICE_HALVING_INTERVAL: 60 * 60 * 1000 // 1 hour in milliseconds
}

export const isWalletAvailable = (): boolean => {
  return typeof window.ethereum !== 'undefined'
}

export const connectWallet =
  async (): Promise<ethers.BrowserProvider | null> => {
    if (!isWalletAvailable()) {
      return null
    }

    try {
      await window.ethereum!.request({ method: 'eth_requestAccounts' })

      try {
        await window.ethereum!.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x2105' }]
        })
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          try {
            await window.ethereum!.request({
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
            return null
          }
        } else {
          console.error('Failed to switch to Base network:', switchError)
          return null
        }
      }

      return new ethers.BrowserProvider(window.ethereum!)
    } catch (error) {
      console.error('Error connecting to wallet:', error)
      return null
    }
  }

export const calculatePrice = (
  domainName: string,
  purchaseHistory: { domain: string; timestamp: number }[]
): bigint => {
  const now = Date.now()

  let price = CONSTANTS.BASE_PRICE
  const recentPurchases = purchaseHistory.filter(
    (purchase) => purchase.domain === domainName
  )

  for (let i = 0; i < recentPurchases.length; i++) {
    price *= 2n
  }

  if (recentPurchases.length > 0) {
    const lastPurchase = recentPurchases[recentPurchases.length - 1]
    const hoursSinceLastPurchase = Math.floor(
      (now - lastPurchase.timestamp) / CONSTANTS.PRICE_HALVING_INTERVAL
    )

    for (
      let i = 0;
      i < hoursSinceLastPurchase && price > CONSTANTS.BASE_PRICE;
      i++
    ) {
      price /= 2n
    }
  }

  return price
}

export const fetchMinValue = async (
  address: string,
  domain?: string
): Promise<bigint> => {
  try {
    if (domain) {
      const response = await fetch(
        `https://app.pkt.cash/api/v1/pns/domain-available/${domain}`
      )
      const data = await response.json()
      if (data.min_value) {
        return BigInt(data.min_value)
      }
    }

    const response = await fetch(
      `https://app.pkt.cash/api/v1/pns/qualifying-lockups/${address}`
    )
    const data = await response.json()
    if (data.min_value) {
      return BigInt(data.min_value)
    }
  } catch (error) {
    console.error('Error fetching minimum value:', error)
  }
  return CONSTANTS.BASE_PRICE
}

export const checkDomainAvailability = async (
  domainName: string
): Promise<{
  isAvailable: boolean
  isValid: boolean
  minValue?: bigint
  errorMessage?: string
}> => {
  try {
    const response = await fetch(
      `https://app.pkt.cash/api/v1/pns/domain-available/${domainName}`
    )
    const data = await response.json()

    let errorMessage: string | undefined

    if (!data.is_available) {
      errorMessage = `Domain ${domainName}.pkt is already registered`
    } else if (!data.is_valid) {
      errorMessage = `Domain ${domainName}.pkt is not valid (can only be letters and numbers split up by dashes)`
    }

    return {
      isAvailable: data.is_available,
      isValid: data.is_valid,
      minValue: data.min_value ? BigInt(data.min_value) : undefined,
      errorMessage
    }
  } catch (error) {
    console.error('Error checking domain availability:', error)
    return {
      isAvailable: false,
      isValid: false,
      errorMessage: 'Error checking domain availability'
    }
  }
}

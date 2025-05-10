import { createContext, useState, ReactNode } from 'react'
import { WalletHistoryType, WalletHistoryContextType } from '../types/wallet'

/**
 * Type definition for a transaction history entry
 */
export type TransactionHistoryItem = {
  step: number
  status: string
  txId?: string
  stakeAmount?: string
  timestamp: number
  domainName?: string
  currentPrice?: string
  maxPkt?: string
  stakeId?: string
}

const defaultContext: WalletHistoryContextType = {
  walletHistory: [],
  setWalletHistory: () => {}
}

export const WalletErrorContext =
  createContext<WalletHistoryContextType>(defaultContext)

export const WalletHistoryProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const [walletHistory, setWalletHistory] = useState<WalletHistoryType>([])

  return (
    <WalletErrorContext.Provider value={{ walletHistory, setWalletHistory }}>
      {children}
    </WalletErrorContext.Provider>
  )
}

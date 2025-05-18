import { ethers } from 'ethers'

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


export type WalletHistoryType = TransactionHistoryItem[]

/**
 * Type for wallet state in the registration process
 */
export interface WalletState {
  status:
    | 'loading'
    | 'connected'
    | 'pre_allocating'
    | 'authorizing'
    | 'staking'
    | 'reserved'
    | 'not_found'
    | 'price_changed'
    | 'low_funds'
    | 'success'
    | 'failed'
  step?: number
  txId?: string
  stakeAmount?: string
  address?: string
  label?: string
  domainId?: string
  stakeId?: string
  provider?: ethers.BrowserProvider
  signer?: ethers.JsonRpcSigner
  erc20abi?: Array<any>
  lockboxabi?: Array<any>
  multipayabi?: Array<any>
  pnsabi?: Array<any>
  transactionHistory?: WalletHistoryType
}

/**
 * Type definition for the wallet error context
 */
export interface WalletHistoryContextType {
  walletHistory: WalletHistoryType
  setWalletHistory: (walletHistory: WalletHistoryType) => void
}

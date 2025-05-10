import { ReactNode } from 'react'
import {
  WalletHistoryProvider,
  WalletErrorContext
} from './WalletHistoryProvider'

interface ProvidersProps {
  children: ReactNode
}

export { WalletHistoryProvider, WalletErrorContext }

export type {
  WalletHistoryType,
  TransactionHistoryItem,
  WalletHistoryContextType
} from '../types/wallet'

export const Providers = ({ children }: ProvidersProps) => {
  return <WalletHistoryProvider>{children}</WalletHistoryProvider>
}

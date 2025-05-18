import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/base/adapters/evm/wagmi'
import { WagmiProvider } from 'wagmi'
import { base } from 'viem/chains'
import React from 'react'

const projectId = '5932391dbb0b923a14c367f7c2970edd'

const metadata = {
  name: 'Web3 Domain Registration',
  description: 'Register your Web3 Domain',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [base] as const
export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  enableCoinbase: true,
  enableWalletConnect: true,
  enableInjected: true,
  enableEIP6963: true
})

createWeb3Modal({
  wagmiConfig: wagmiConfig,
  projectId,
  enableAnalytics: true,
  defaultChain: base,
  featuredWalletIds: ['coinbaseWallet']
})

interface Web3ModalProviderProps {
  children: React.ReactNode
}

export const Web3ModalProvider: React.FC<Web3ModalProviderProps> = ({
  children
}) => {
  return <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
}

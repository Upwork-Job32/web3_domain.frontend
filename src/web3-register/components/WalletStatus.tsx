import React from 'react'
import connected from '../../assets/images/connected.svg'
import { WalletState } from '../../types/wallet'

interface WalletStatusProps {
  walletState: WalletState
  renderStepHistory: (currentStep: number) => React.ReactNode
}

const WalletStatus: React.FC<WalletStatusProps> = ({
  walletState,
  renderStepHistory
}) => {
  const getStatusMessage = (status: WalletState['status']): string => {
    switch (status) {
      case 'pre_allocating':
        return 'Pre-allocating stake'
      case 'authorizing':
        return 'Authorizing stake'
      case 'staking':
        return 'Staking domain'
      default:
        return ''
    }
  }

  const getStakeLabel = (status: WalletState['status']): string => {
    return status === 'pre_allocating' ? 'Got stake:' : 'Actual stake amount:'
  }

  const renderCurrentStep = () => {
    return (
      <div className="mb-6">
        <div className="text-white text-base font-medium mb-4">
          Step {walletState.step}/4: {getStatusMessage(walletState.status)}
        </div>
        <div className="flex items-center mb-6">
          <div className="h-[12px] flex-grow bg-[#1A2747] rounded-full overflow-hidden relative">
            <div className="absolute inset-0 bg-[#FFFFFF]/20 rounded-full" />
            <div
              className="h-full bg-[#4DCA6A] rounded-full transition-all duration-300 relative z-10"
              style={{ width: `${(walletState.step || 1) * 25}%` }}
            />
          </div>
        </div>
        <div className="space-y-4 font-mono text-sm">
          {walletState.stakeId &&
            walletState.stakeId !== '0' &&
            walletState.step === 1 && (
              <div>
                <div className="text-[#8F9BB7] mb-1">Stake ID:</div>
                <div className="text-white">{walletState.stakeId}</div>
              </div>
            )}
          <div>
            <div className="text-[#8F9BB7] mb-1">
              {walletState.txId ? '- TXID:' : ''}
            </div>
            <div className="text-white break-all">{walletState.txId}</div>
          </div>
          {walletState.stakeAmount && (
            <div>
              <div className="text-[#8F9BB7] mb-1">
                {getStakeLabel(walletState.status)}
              </div>
              <div className="text-white">{walletState.stakeAmount}</div>
            </div>
          )}
        </div>
      </div>
    )
  }

  const firstStepHistory = walletState.transactionHistory?.find(
    (step) => step.step === 1
  )

  switch (walletState.status) {
    case 'loading':
      return (
        <div className="rounded-[16px] p-6 text-center w-full flex flex-col items-center justify-center min-h-[200px]">
          <div className="text-white text-base mb-6">Wallet loading...</div>
          <div className="flex justify-center mb-6">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#0D4AE7] border-t-transparent"></div>
          </div>
          <div className="text-[#8F9BB7] text-sm">Trying to detect wallet</div>
        </div>
      )

    case 'connected':
      return (
        <div className="rounded-[16px] p-6 text-center w-full flex flex-col items-center justify-center h-full">
          <div className="text-white text-base mb-6">Wallet connected</div>
          <div className="flex justify-center mb-6">
            <img
              src={connected}
              alt="connected"
              className="w-[70px] h-[70px]"
            />
          </div>
          <div className="text-[#8F9BB7] text-sm font-mono mb-4">
            {walletState.label}
          </div>
        </div>
      )

    case 'pre_allocating':
      return (
        <div className="rounded-[20px] p-6 w-[90%]">
          {renderCurrentStep()}
          {renderStepHistory(1)}
        </div>
      )

    case 'authorizing':
      return (
        <div className="rounded-[20px] p-6 w-[90%]">
          {renderCurrentStep()}
          {renderStepHistory(2)}
        </div>
      )

    case 'staking':
      return (
        <div className="rounded-[20px] p-6 w-[90%]">
          {renderCurrentStep()}
          {renderStepHistory(3)}
        </div>
      )

    case 'reserved':
      return (
        <div className="rounded-[20px] p-6 w-full">
          <div className="text-center">
            <div className="text-white text-base font-medium mb-6">
              Domain reserved
            </div>
            <div className="flex items-center mb-6 mt-4">
              <div className="h-[12px] flex-grow bg-[#1A2747] rounded-full overflow-hidden relative">
                <div className="absolute inset-0 bg-[#FFFFFF]/20 rounded-full" />
                <div className="h-full bg-[#4DCA6A] rounded-full w-full relative z-10" />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-white font-mono text-sm">
                Domain ID: {firstStepHistory?.stakeId || walletState.stakeId}
              </div>
              <div className="text-[#8F9BB7] text-sm">sending to wallet</div>
            </div>
          </div>
        </div>
      )

    case 'not_found':
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="text-center mb-[24px]">
            <div className="text-lg mb-[24px]">
              <span className="text-white/80">Wallet</span>{' '}
              <button
                onClick={() => window.location.reload()}
                className="text-red-600 hover:text-red-500 transition-colors duration-200"
              >
                not found
              </button>
            </div>
            <div className="text-white">
              Desktop wallet browser extension is required
            </div>
          </div>
          <button
            onClick={() =>
              window.open('https://discord.gg/9qgtGgx2Ku', '_blank')
            }
            className="w-[50%] bg-[#0D4AE7] text-white rounded-full py-3 flex items-center justify-center space-x-2"
          >
            <span>Need help?</span>
            <span className="w-5 h-5 rounded-full bg-transparent border border-white/20 flex items-center justify-center text-xs">
              ?
            </span>
          </button>
        </div>
      )

    case 'price_changed':
      return (
        <div className="rounded-[20px] p-6 w-full h-full flex flex-col items-center justify-center">
          <div className="text-center mb-4">
            <div className="text-lg">Price is higher than input 😕</div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="w-[50%] bg-[#0D4AE7] text-white rounded-full py-3"
          >
            Try again
          </button>
        </div>
      )

    case 'low_funds':
      return (
        <div>
          <div className="text-center mb-4 flex flex-col w-full h-full items-center justify-center">
            <div className="text-lg">You are low on funds 😕</div>
            <button
              onClick={() => window.location.reload()}
              className="w-[200px] h-[36px] bg-[#0D4AE7] text-white rounded-full mt-[24px]"
            >
              Try again
            </button>
          </div>
        </div>
      )

    default:
      return null
  }
}

export default WalletStatus

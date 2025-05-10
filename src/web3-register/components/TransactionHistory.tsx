import React from 'react'
import { TransactionHistoryItem } from '../../types/wallet'

interface TransactionHistoryProps {
  transactionHistory?: TransactionHistoryItem[]
  currentStep: number
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  transactionHistory,
  currentStep
}) => {
  if (!transactionHistory) return null

  return (
    <div className="space-y-4">
      {transactionHistory
        .filter((step) => step.step < currentStep)
        .sort((a, b) => b.step - a.step)
        .map((step, index) => (
          <div key={index} className="mb-4">
            <div className="text-[#8F9BB7] text-sm mb-1">
              Step {step.step}: {step.status}
            </div>
            {step.txId && (
              <div className="text-white break-all text-sm mb-1">
                TXID: {step.txId}
              </div>
            )}
            {step.stakeAmount && (
              <div className="text-white text-sm mb-1">
                Stake Amount: {step.stakeAmount}
              </div>
            )}
            {step.domainName && (
              <div className="text-white text-sm mb-1">
                Domain: {step.domainName}
              </div>
            )}
            {step.currentPrice && (
              <div className="text-white text-sm mb-1">
                Current Price: {step.currentPrice} PKT
              </div>
            )}
            {step.maxPkt && (
              <div className="text-white text-sm">
                Max PKT: {step.maxPkt} PKT
              </div>
            )}
          </div>
        ))}
    </div>
  )
}

export default TransactionHistory

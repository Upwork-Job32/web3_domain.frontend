import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import bg from '../assets/images/failed.jpg'
import help from '../assets/images/help.svg'
import MainLayout from '../components/layout/MainLayout'
import { WalletErrorContext } from '../providers'
import { WalletHistoryType, TransactionHistoryItem } from '../types/wallet'
import { WalletHistoryContextType } from '../types/wallet'

interface LocationState {
  txId?: string
  stakeAmount?: string
  step?: number
  history?: TransactionHistoryItem[]
}

const RegistrationFailed: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as LocationState
  // const txId = state?.txId
  // const stakeAmount = state?.stakeAmount
  const step = state?.step || 4 // Default to step 4 if not provided
  const stateHistory = state?.history || []
  const { walletHistory } = useContext(
    WalletErrorContext
  ) as WalletHistoryContextType

  // Combine both sources of history, prioritizing state history as it's more recent
  const [combinedHistory, setCombinedHistory] = useState<WalletHistoryType>([])

  useEffect(() => {
    const mergedHistory = [...stateHistory]

    if (walletHistory && walletHistory.length > 0) {
      walletHistory.forEach((item) => {
        const isDuplicate = mergedHistory.some(
          (existingItem) =>
            existingItem.step === item.step &&
            existingItem.timestamp === item.timestamp
        )
        if (!isDuplicate) {
          mergedHistory.push(item)
        }
      })
    }

    mergedHistory.sort((a, b) => a.step - b.step)

    setCombinedHistory(mergedHistory)

    console.log('State History:', stateHistory)
    console.log('Context History:', walletHistory)
    console.log('Combined History:', mergedHistory)
  }, [stateHistory, walletHistory])

  const renderHistory = () => {
    if (combinedHistory.length === 0) return null

    return (
      <div className="h-[100%] w-[100%] flex flex-col overflow-y-scroll [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-white/10 [&::-webkit-scrollbar-thumb]:bg-white/40 [&::-webkit-scrollbar-thumb]:rounded-full">
        {combinedHistory
          .filter((item) => item.step <= step)
          .map((item, index) => (
            <div key={index} className="mb-4">
              <div className="text-[#8F9BB7] mb-1 text-[16px]">
                Step {item.step}: {item.status}
              </div>
              {item.txId && (
                <>
                  <div className="text-[#8F9BB7] mb-1 text-[16px]">- TXID:</div>
                  <div className="text-white break-all font-mono text-[16px]">
                    {item.txId}
                  </div>
                </>
              )}
              {item.stakeId && (
                <>
                  <div className="text-[#8F9BB7] mb-1 mt-4 text-[16px]">
                    - Stake ID:
                  </div>
                  <div className="text-white font-mono text-[16px]">
                    {item.stakeId}
                  </div>
                </>
              )}
              {item.domainName && (
                <>
                  <div className="text-[#8F9BB7] mb-1 mt-4 text-[16px]">
                    - Domain:
                  </div>
                  <div className="text-white font-mono text-[16px]">
                    {item.domainName}
                  </div>
                </>
              )}
              {item.currentPrice && (
                <>
                  <div className="text-[#8F9BB7] mb-1 mt-4 text-[16px]">
                    - Current Price:
                  </div>
                  <div className="text-white font-mono text-[16px]">
                    {item.currentPrice} PKT
                  </div>
                </>
              )}
              {item.maxPkt && (
                <>
                  <div className="text-[#8F9BB7] mb-1 mt-4 text-[16px]">
                    - Max PKT:
                  </div>
                  <div className="text-white font-mono text-[16px]">
                    {item.maxPkt} PKT
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
    )
  }

  return (
    <MainLayout>
      <div className="min-h-screen w-full fixed inset-0 bg-[#000B1E] px-[4vw] sm:px-6 md:px-8 lg:px-[15vw] overflow-auto">
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-90">
          <div
            className="bg-cover bg-center h-full w-full absolute z-[-1]"
            style={{ backgroundImage: `url(${bg})` }}
          />
          <div className="flex flex-col items-center justify-center rounded-[30px] p-[20px] w-[90%] md:h-[90%]  h-[650px] md:max-w-[760px] md:max-h-[640px] text-center bg-white bg-opacity-[12%] backdrop-blur-sm">
            <div className="w-full h-full flex flex-col items-center justify-center p-[20px]">
              <h1 className="text-white md:text-[64px] text-[48px] mb-4">
                Registration <span className="text-red-500">failed</span>
              </h1>
              <p className="text-[#8F9BB7] mb-6 text-[20px]">
                Please make sure you have PKT and ETH on Base in your Web3
                Wallet
              </p>
              <div className="w-auto h-auto p-[15px] flex flex-col items-center justify-center bg-white/10 rounded-[40px]">
                <div className="w-[100%] h-[168px] md:w-[418px] md:h-[164px] bg-white/10 rounded-[32px] text-left md:px-[30px] md:py-[20px] px-[20px] py-[20px]">
                  {renderHistory()}
                </div>
              </div>
              <div className="w-full h-auto flex gap-3 mt-[20px] md:mt-[50px] mb-[35px] md:flex-row flex-col items-center justify-center">
                <button
                  onClick={() => navigate('/web3-register')}
                  className="rounded-full text-sm sm:text-base transition-all duration-300 text-white sm:w-[200px] w-[100%] h-[45px] bg-[#0D4AE7]  shadow-[0_0_20px_rgba(45,128,255,0.15)]"
                >
                  Try again
                </button>
                <button
                  onClick={() => window.open('https://docs.pkt.cash', '_blank')}
                  className="rounded-full flex items-center justify-center text-sm sm:text-base transition-all duration-300 text-white sm:w-[200px] w-[100%] h-[45px] bg-transparent  border-2 border-white"
                >
                  Get help
                  <img src={help} alt="help" className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default RegistrationFailed

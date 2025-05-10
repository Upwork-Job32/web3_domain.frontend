import React, { useState, useEffect, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import bgImage from '../assets/images/bg.jpg'

import MainLayout from '../components/layout/MainLayout'
import { WalletErrorContext } from '../providers'
import { WalletState, WalletHistoryContextType } from '../types/wallet'
import {
  fetchMinValue,
  checkDomainAvailability,
  calculatePrice
} from '../services/wallet-service'

import {
  WalletStatus,
  RegistrationForm,
  TransactionHistory,
  WalletConnector,
  registerDomain
} from './components'

import LogoHeader from '../components/common/LogoHeader'

const BASE_PRICE = 1000n * 10n ** 18n

interface PurchaseHistory {
  domain: string
  timestamp: number
}

declare global {
  interface Window {
    ethereum?: any
  }
}

const Web3Register: React.FC = () => {
  const navigate = useNavigate()
  const { setWalletHistory } = useContext(
    WalletErrorContext
  ) as WalletHistoryContextType
  const scroll = useRef<HTMLDivElement>(null)
  const [walletState, setWalletState] = useState<WalletState>({
    status: 'loading',
    transactionHistory: []
  })
  const [domainName, setDomainName] = useState('')
  const [stakeAmount, setStakeAmount] = useState('')

  const [purchaseHistory] = useState<PurchaseHistory[]>([])
  const [currentPrice, setCurrentPrice] = useState<bigint>(BASE_PRICE)
  const [isAvailableRegister, setIsAvailableRegister] = useState<boolean>(false)
  const [isBlockInput, setIsBlockInput] = useState<boolean>(false)

  const simulateWalletFlow = async () => {
    console.log('Simulating wallet flow')
  }

  const handleDomainChange = async (value: string) => {
    setDomainName(value)
    setIsAvailableRegister(true)

    if (value) {
      const result = await checkDomainAvailability(value)
      setIsBlockInput(!result.isAvailable || !result.isValid)
      setIsAvailableRegister(result.isAvailable && result.isValid)

      if (result.minValue) {
        setCurrentPrice(result.minValue)
      }
    }
  }

  const handleStakeAmountChange = (value: string) => {
    setStakeAmount(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await registerDomain(
      walletState,
      setWalletState,
      setWalletHistory,
      setIsAvailableRegister,
      navigate,
      domainName,
      stakeAmount,
      currentPrice
    )
  }

  const renderStepHistory = (currentStep: number) => {
    return (
      <TransactionHistory
        transactionHistory={walletState.transactionHistory}
        currentStep={currentStep}
      />
    )
  }

  // Update price when wallet is connected or domain name changes
  useEffect(() => {
    const address = walletState.address
    if (address && domainName) {
      fetchMinValue(address, domainName).then((price) => setCurrentPrice(price))
    } else if (address) {
      fetchMinValue(address).then((price) => setCurrentPrice(price))
    }
  }, [walletState.address, domainName])

  // Update price every 30 seconds
  useEffect(() => {
    const address = walletState.address
    if (address) {
      const interval = setInterval(() => {
        if (domainName) {
          fetchMinValue(address, domainName).then((price) =>
            setCurrentPrice(price)
          )
        } else {
          fetchMinValue(address).then((price) => setCurrentPrice(price))
        }
      }, 30000) // Check every 30 seconds

      return () => clearInterval(interval)
    }
  }, [walletState.address, domainName])

  useEffect(() => {
    const interval = setInterval(() => {
      if (domainName) {
        setCurrentPrice(calculatePrice(domainName, purchaseHistory))
      }
    }, 60000)

    return () => clearInterval(interval)
  }, [domainName, purchaseHistory])

  useEffect(() => {
    if (domainName) {
      setCurrentPrice(calculatePrice(domainName, purchaseHistory))
    }
  }, [domainName])

  return (
    <MainLayout>
      <WalletConnector
        walletState={walletState}
        setWalletState={setWalletState}
        simulateWalletFlow={simulateWalletFlow}
      />

      <div className="min-h-screen w-full fixed inset-0 bg-[#000B1E] px-[4vw] sm:px-6 md:px-8 lg:px-[15vw] overflow-auto">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgImage})` }}
        />

        <LogoHeader />

        <div className="relative md:mt-[30px] mt-[64px] w-full">
          <div className="text-white font-inter sm:text-6xl text-5xl lg:text-[86px] not-italic font-bold leading-tight sm:leading-snug md:leading-normal lg:leading-[112px]">
            Claim your
            <br />
            PKT Domain
          </div>

          <p className="text-white/80 text-lg mb-8 md:w-[60%] md:min-w-[600px] ">
            This is a tool for claiming a PKT domain without first making a
            stake. It does the staking in the same transaction while registering
            the domain.
          </p>

          <div className="flex gap-2 sm:gap-0 pt-2 w-[100%]">
            <button
              onClick={() => {
                navigate('/')
              }}
              className="rounded-full text-sm sm:text-base transition-all duration-300 text-white sm:w-[200px] w-[100%] h-[45px] bg-transparent hover:border-[rgba(255,255,255,0.25)] border-2 border-white backdrop-blur-[32px]"
            >
              Domain Registrar
            </button>
            <button className="rounded-full text-sm sm:text-base transition-all duration-300 text-white sm:w-[200px] w-[100%] h-[45px] bg-[#0D4AE7] shadow-[0_0_20px_rgba(45,128,255,0.15)] ml-[10px] sm:ml-[20px]">
              Web3 Registrar
            </button>
          </div>

          <div className="w-[full] mt-8 sm:mt-12 md:mt-16 lg:mt-[20px]">
            <div className="md:flex md:justify-between md:h-[260px] grid justify-center items-center w-[100%] grid-cols-1 gap-[5%] lg:gap-[10%] mb-[20px]">
              <RegistrationForm
                domainName={domainName}
                stakeAmount={stakeAmount}
                currentPrice={currentPrice}
                isAvailableRegister={isAvailableRegister}
                isBlockInput={isBlockInput}
                onDomainChange={handleDomainChange}
                onStakeAmountChange={handleStakeAmountChange}
                onSubmit={handleSubmit}
                scrollRef={scroll}
              />

              <div
                className="flex justify-center p-[10px] bg-white bg-opacity-10 rounded-[35px] md:w-auto w-[100%] items-center"
                ref={scroll}
              >
                <div className="backdrop-blur-md rounded-[30px] h-[250px] p-[25px] text-white bg-white bg-opacity-10 md:w-[27vw] w-[100%] md:min-w-[300px] flex items-center justify-center">
                  <div className="h-[100%] w-[100%] flex justify-center overflow-y-scroll [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-white/10 [&::-webkit-scrollbar-thumb]:bg-white/40 [&::-webkit-scrollbar-thumb]:rounded-full">
                    <WalletStatus
                      walletState={walletState}
                      renderStepHistory={renderStepHistory}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Web3Register

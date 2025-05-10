import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import bgImage from '../assets/images/bg.jpg'
import LogoHeader from '../components/common/LogoHeader'

const setupAnimations = () => {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  
    .animate-fade-in {
      opacity: 0;
      animation: fadeIn 0.7s ease-out forwards;
    }
  
    .animate-fade-in-up {
      opacity: 0;
      animation: fadeInUp 0.7s ease-out forwards;
    }
  
    .delay-200 {
      animation-delay: 0.2s;
    }
  `
  document.head.appendChild(style)
}

const DomainRegister: React.FC = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [isValidInput, setIsValidInput] = useState(true)

  const validateInput = (input: string) => {
    return /^[a-z0-9-]*$/.test(input)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    if (value.slice(value.length - 4, value.length) == '.pkt') {
      console.log(value.slice(value.length - 4, value.length - 1))
      setIsValidInput(validateInput(value.slice(0, value.length - 4)))
    } else {
      setIsValidInput(validateInput(value))
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.length > 0 && isValidInput) {
      navigate('/search', {
        state: {
          query: searchQuery,
          fromDomainRegister: true
        }
      })
    }
  }

  return (
    <div className="min-h-screen w-full fixed inset-0 bg-[#000B1E] px-[4vw] sm:px-6 md:px-8 lg:px-[15vw] overflow-auto">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      <LogoHeader />

      <div className="relative w-full">
        <div className="w-full mt-[64px] md:mt-[102px]">
          <div className="text-white font-inter sm:text-6xl text-5xl lg:text-[86px] not-italic font-bold leading-tight sm:leading-snug md:leading-normal lg:leading-[112px]">
            Claim your
            <br />
            PKT Domain
          </div>

          <div className="flex gap-2 sm:gap-0 sm:mt-[24px] mt-[36px]">
            <button className="rounded-full text-sm sm:text-base transition-all duration-300 text-white sm:w-[200px] w-[100%] h-[45px] bg-[#0D4AE7]  shadow-[0_0_20px_rgba(45,128,255,0.15)] mr-[10px] sm:mr-[20px]">
              Domain Registrar
            </button>
            <button
              onClick={() => navigate('/web3-register')}
              className="rounded-full text-sm sm:text-base transition-all duration-300 text-white sm:w-[200px] w-[100%] h-[45px] bg-transparent hover:border-[rgba(255,255,255,0.25)] border-2 border-white backdrop-blur-[32px]"
            >
              Web3 Registrar
            </button>
          </div>

          <form
            onSubmit={handleSearch}
            className="relative w-full h-12 sm:h-14 md:h-16 lg:h-[64px] flex items-center bg-white rounded-full backdrop-blur-[20px] mt-[40px] md:mt-8 sm:mt-[36px] sm:flex-row"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Register a domain name to start"
              className="w-full h-full bg-transparent text-black text-sm sm:text-base placeholder:text-white/40 pl-4 sm:pl-6 md:pl-[24px] focus:outline-none rounded-full"
            />
            <button
              type="submit"
              className="absolute md:right-1 md:top-1 top-[100px] text-[18px] text-white rounded-full bg-[#0D4AE7] font-normal h-[56px] md:w-[120px] w-[100%]"
              disabled={!isValidInput || searchQuery.length === 0}
            >
              Search
            </button>
          </form>
          {!isValidInput && (
            <div className="text-red-500 mt-2 text-sm">
              Only lowercase letters (a-z), numbers (0-9) and hyphens (-) are
              allowed
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

setupAnimations()

export default DomainRegister

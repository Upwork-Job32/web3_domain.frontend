import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ethers } from 'ethers'
import bgImage from '../assets/images/bg.jpg'
import circleCheck from '../assets/images/check_circle.png'
import circleBlock from '../assets/images/inputBlock.svg'
import whiteArrow from '../assets/images/arrow-white.svg'
import LogoHeader from '../components/common/LogoHeader'

interface DomainData {
  min_value: number
  name: string
  is_available: boolean
  service_charge: string
  is_valid: boolean
}

const DomainSearchResults: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [custodyType, setCustodyType] = useState<'self' | 'hosted'>('self')
  const [loading, setLoading] = useState(false)
  const [isValidInput, setIsValidInput] = useState(true)

  const [searchQuery, setSearchQuery] = useState(location.state?.query)
  const [domain, setDomain] = useState('')
  const [data, setData] = useState<DomainData>({
    min_value: 0,
    name: '',
    is_valid: false,
    is_available: false,
    service_charge: ''
  })

  const validateInput = (input: string) => {
    return /^[a-z0-9-]*$/.test(input)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    if (value.slice(value.length - 4, value.length) == '.pkt') {
      setIsValidInput(validateInput(value.slice(0, value.length - 4)))
    } else {
      setIsValidInput(validateInput(value))
    }
  }

  const fetchMinValue = useCallback(async () => {
    if (!isValidInput || !searchQuery) return
    if (
      searchQuery.slice(searchQuery.length - 4, searchQuery.length) == '.pkt'
    ) {
      setDomain(searchQuery.slice(0, searchQuery.length - 4))
    } else {
      setDomain(searchQuery)
    }

    setLoading(true)
    console.log(domain)
    if (!domain) return
    try {
      const response = await fetch(
        `https://app.pkt.cash/api/v1/pns/domain-available/${domain}`
      )
      const data = await response.json()

      if (data.min_value) {
        const minValue = (await ethers.formatEther(
          BigInt(data.min_value)
        )) as string

        setData(() => ({
          ...data,
          min_value: Math.floor(Number(minValue))
        }))
      }
    } catch (error) {
      console.error('Error fetching minimum value:', error)
    } finally {
      setLoading(false)
    }
  }, [isValidInput, searchQuery, domain, setData, setDomain])

  useEffect(() => {
    fetchMinValue()
  }, [fetchMinValue])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isValidInput && searchQuery) {
      await fetchMinValue()
    }
  }

  const handleRegister = (domain: string) => {
    console.log(domain)
    navigate('/register-domain', {
      state: {
        domain,
        custody: custodyType
      }
    })
  }

  return (
    <div className="min-h-screen fixed w-full inset-0 bg-[#000B1E] px-4 sm:px-6 md:px-8 lg:px-[15vw] overflow-auto">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-[-1]"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      <LogoHeader />

      <div className="w-full mt-8 sm:mt-12 md:mt-16 lg:mt-[64px]">
        <div className="flex justify-between sm:justify-start">
          <button
            onClick={() => setCustodyType('self')}
            className={`sm:w-[200px] sm:h-[36px] w-[47%] h-[45px] rounded-full text-[16px] sm:mr-[20px] bg-gradient-to-r from-[#3CADEF] via-[#3CADEF] to-[#339DDB] text-white ${
              custodyType === 'self' ? ' opacity-[100%] ' : ' opacity-[70%]'
            }`}
          >
            Custody
          </button>
          <button
            onClick={() => setCustodyType('hosted')}
            className={`sm:w-[200px] sm:h-[36px] w-[47%] h-[45px] rounded-full text-[16px] sm:mr-[20px] bg-gradient-to-r from-[#3CADEF] via-[#3CADEF] to-[#339DDB] text-white ${
              custodyType === 'hosted' ? ' opacity-[100%] ' : ' opacity-[70%]'
            }`}
          >
            Hosted
          </button>
        </div>

        <div className="relative w-full h-[64px] flex items-center bg-white rounded-full backdrop-blur-[20px] mt-10 sm:mt-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            className="w-full h-full bg-transparent text-black text-sm sm:text-base placeholder:text-white/40 pl-4 sm:pl-6 md:pl-[24px] focus:outline-none rounded-full"
            placeholder="Search for a domain"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && isValidInput && searchQuery) {
                handleSearch(e)
              }
            }}
          />
          <button
            onClick={handleSearch}
            className="absolute md:right-1 md:top-1 top-[200px] text-[18px] text-white rounded-full bg-[#0D4AE7] font-normal h-[56px] md:w-[120px] w-[100%]"
            disabled={!isValidInput || !searchQuery}
          >
            Search
          </button>
        </div>
        {!isValidInput && (
          <div className="text-red-500 mt-2 text-sm">
            Only lowercase letters (a-z) and numbers (0-9) are allowed
          </div>
        )}
        {loading === false ? (
          <div className="mt-4 sm:mt-4">
            <div
              className={`h-[65px] flex items-center justify-between bg-white backdrop-blur-md rounded-[16px] px-[10px] mt-4 sm:mt-[16px] mb-4 sm:mb-[16px] ${
                data.is_available && data.is_valid
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              <div className="flex items-center align-middle mb-2 sm:mb-0">
                <img
                  src={
                    data.is_available && data.is_valid
                      ? circleCheck
                      : circleBlock
                  }
                  alt="circle check"
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-[24px] md:h-[24px]"
                />
                {data.is_valid ? (
                  <span className="text-base sm:text-lg md:text-[18px] font-semibold ml-2">
                    {`${domain}.pkt`}
                  </span>
                ) : (
                  <span className="text-base sm:text-lg md:text-[18px] font-semibold ml-2">
                    {`${domain}.pkt`}
                  </span>
                )}
              </div>
              {data.is_available && data.is_valid ? (
                <div className="flex flex-col sm:flex-row items-start sm:items-center w-auto h-[56px]">
                  <button
                    onClick={() => handleRegister(`${domain}.pkt`)}
                    className="relative flex items-center justify-center text-white rounded-full bg-[#0D4AE7] font-normal w-[120px] sm:w-[160px] h-[56px]"
                  >
                    Register
                    <img
                      src={whiteArrow}
                      alt="white arrow"
                      className="w-5 h-5 sm:w-6 sm:h-6 md:w-[24px] md:h-[24px] ml-2"
                    />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-start sm:items-center w-auto">
                  <span className="text-base sm:text-lg md:text-[18px] font-semibold ml-2">
                    Not Available
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center w-[120px] sm:w-[160px] h-[56px]">
            <div className="animate-spin rounded-full h-6 border-2 border-white border-t-transparent"></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DomainSearchResults

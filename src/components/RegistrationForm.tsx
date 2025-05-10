import React, { useState, useEffect } from 'react'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount } from 'wagmi'
import circleCheck from '../assets/images/check_circle.png'
import circle1 from '../assets/images/circle-1.svg'

type FormData = {
  name: string
  phone: string
  email: string
  domainName: string
  custody: 'self' | 'hosted'
  walletAddress?: string
}

interface RegistrationFormProps {
  onSubmit: (data: FormData) => void
  initialData: Omit<FormData, 'walletAddress'> & { walletAddress?: string }
  className?: string
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSubmit,
  initialData,
  className = ''
}) => {
  const [formData, setFormData] = useState<FormData>(initialData)
  const { open } = useWeb3Modal()
  const { address, isConnected } = useAccount()

  useEffect(() => {
    if (isConnected && address) {
      setFormData((prevData) => ({
        ...prevData,
        walletAddress: address
      }))
    } else {
      setFormData((prevData) => ({
        ...prevData,
        walletAddress: undefined
      }))
    }
  }, [address, isConnected])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="mb-4">
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Name"
          className="w-full h-[56px] px-4 pl-6 rounded-full border border-[#E5E7EB] focus:border-[#2D80FF] focus:ring-1 focus:ring-[#2D80FF] outline-none text-[#111827]"
          required
        />
      </div>

      <div className="mb-4 relative">
        {formData.phone && (
          <p className=" absolute left-3 top-[27px] transform -translate-y-1/2 text-[20px] text-black">
            +
          </p>
        )}
        <input
          type="text"
          value={formData.phone}
          onChange={(e) => {
            const value = e.target.value
            if (value.length > 15) {
              return
            }
            if (
              value[value.length - 1] < '0' ||
              value[value.length - 1] > '9'
            ) {
              return
            }
            setFormData({ ...formData, phone: value })
          }}
          placeholder="Phone Number"
          className="w-full h-[56px] px-4 pl-6 rounded-full border border-[#E5E7EB] focus:border-[#2D80FF] focus:ring-1 focus:ring-[#2D80FF] outline-none text-[#111827]"
          required
        />
      </div>

      <div className="mb-4">
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
          className="w-full h-[56px] px-4 pl-6 rounded-full border border-[#E5E7EB] focus:border-[#2D80FF] focus:ring-1 focus:ring-[#2D80FF] outline-none text-[#111827]"
          required
        />
      </div>

      <div className="mb-6 relative">
        <input
          type="text"
          value={formData.domainName}
          readOnly
          className="w-full h-[56px] px-4 pl-6 rounded-full border border-[#E5E7EB] bg-[#F9FAFB] text-[#111827]"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <img src={circleCheck} alt="check" />
        </div>
      </div>

      <div className="flex items-center justify-start mb-6 px-2">
        <span className="text-[#4B5563] pr-[12px]">Self custody</span>
        <label className="relative inline-flex items-center cursor-pointer pr-[12px]">
          <input
            type="checkbox"
            checked={formData.custody === 'hosted'}
            onChange={(e) =>
              setFormData({
                ...formData,
                custody: e.target.checked ? 'hosted' : 'self'
              })
            }
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-[#E5E7EB] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px]  after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2D80FF]"></div>
          <span className="ml-3 text-[#4B5563]">Hosted custody</span>
        </label>
      </div>

      {formData.custody === 'self' ? (
        <button
          type="button"
          onClick={() => open({ view: 'Connect' })}
          className="xl:w-[60%] px-[30px] py-[12px] mb-4 bg-gradient-to-r from-[#3CADEF] to-[#3365C2] border border-[#E5E7EB] text-[#111827] text-[16px] rounded-full flex items-center justify-center hover:bg-[#F9FAFB] transition-colors w-[100%]"
        >
          <span className="text-white pr-[5px]">Connect Web3 wallet</span>
          <img src={circle1} alt="wallet" />
        </button>
      ) : (
        <div></div>
      )}

      <button
        type="submit"
        className="w-full h-[56px] bg-[#0D4AE7] text-white rounded-full font-medium"
      >
        Next
      </button>
    </form>
  )
}

export default RegistrationForm

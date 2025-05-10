import React from 'react'
import { ethers } from 'ethers'
import FormInput from '../../components/common/FormInput'
import inputBlock from '../../assets/images/inputBlock.svg'
import inputCheck from '../../assets/images/inputCheck.svg'

interface RegistrationFormProps {
  domainName: string
  stakeAmount: string
  currentPrice: bigint
  isAvailableRegister: boolean
  isBlockInput: boolean
  onDomainChange: (value: string) => void
  onStakeAmountChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
  scrollRef: React.RefObject<HTMLDivElement>
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  domainName,
  stakeAmount,
  currentPrice,
  isAvailableRegister,
  isBlockInput,
  onDomainChange,
  onStakeAmountChange,
  onSubmit,
  scrollRef
}) => {
  return (
    <form
      className="relative md:h-full flex flex-col justify-around md:w-[50%] h-[250px]"
      onSubmit={(e) => {
        e.preventDefault()
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
        setTimeout(() => {
          onSubmit(e)
        }, 500)
      }}
    >
      <div className="relative">
        <FormInput
          value={domainName}
          onChange={onDomainChange}
          placeholder="Domain name"
        />
        {domainName && (
          <img
            src={isBlockInput ? inputBlock : inputCheck}
            className="absolute right-[25px] top-[19px]"
            alt=""
          />
        )}
      </div>

      <FormInput
        type="number"
        value={stakeAmount}
        onChange={onStakeAmountChange}
        placeholder={`Min PKT (${Number(
          ethers.formatEther(currentPrice)
        ).toLocaleString()}) PKT you're willing to stake`}
      />

      <button
        className={
          'w-full bg-[#0D4AE7] text-white rounded-full py-[20px] font-medium' +
          `${isAvailableRegister === false ? ' opacity-70' : ''}`
        }
        type="submit"
        disabled={!isAvailableRegister}
      >
        Register
      </button>
    </form>
  )
}

export default RegistrationForm

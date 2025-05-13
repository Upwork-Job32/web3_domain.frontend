import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import RegistrationForm from '../components/RegistrationForm'
import bgImage from '../assets/images/bg.jpg'
import LogoHeader from '../components/common/LogoHeader'

type FormData = {
  name: string
  phone: string
  email: string
  domainName: string
  custody: 'self' | 'hosted'
  walletAddress?: string
}

interface LocationState {
  domain: string
  custody?: 'self' | 'hosted'
}

const DomainRegistration: React.FC = () => {
  const location = useLocation()
  const state = location.state as LocationState | null

  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    domainName: state?.domain || '',
    custody: state?.custody ?? 'self'
  })
  console.log(state?.domain)
  useEffect(() => {
    if (state?.custody) {
      setFormData((prev) => ({
        ...prev,
        custody: state.custody ?? 'self'
      }))
    }
  }, [state])

  const handleFormSubmit = (data: FormData) => {
    const { name, email, phone, domainName, custody, walletAddress } = data

    const form = document.createElement('form')
    form.method = 'POST'
    form.action = 'https://pktpal.com/cart/add'
    form.style.display = 'none'

    const appendInput = (name: string, value: string) => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = name
      input.value = value
      form.appendChild(input)
    }

    appendInput('items[0][id]', '50393018106131')
    appendInput('items[0][quantity]', '1')
    appendInput('items[0][properties][name]', name)
    appendInput('items[0][properties][email]', email)
    appendInput('items[0][properties][number]', phone)
    appendInput('items[0][properties][domain]', domainName)
    appendInput('items[0][properties][custody]', custody)

    if (walletAddress) {
      appendInput('items[0][properties][walletAddress]', walletAddress)
    }

    if (custody === 'hosted') {
      appendInput('items[1][id]', '50421796274451')
      appendInput('items[1][quantity]', '1')
    }

    document.body.appendChild(form)
    form.submit()
  }

  return (
    <div className="fixed w-full inset-0 bg-[#000B1E] md:px-[180px] px-[20px] overflow-auto">
      <div
        className="absolute inset-0 bg-cover bg-left-top bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <LogoHeader />
      <div className="w-full h-[calc(100%-104px)] flex justify-center items-center">
        <div className="relative w-[600px] min-w-[400px] h-[640px]">
          <div className="bg-slate-400 p-[10px] rounded-[30px]">
            <div className="w-full bg-white rounded-[24px] p-[32px] shadow-xl">
              <div className="space-y-[24px]">
                <h2 className="text-[24px] font-bold text-[#111827] border-b border-[#E5E7EB] pb-[16px]">
                  Fill out the form
                </h2>
                <RegistrationForm
                  onSubmit={handleFormSubmit}
                  initialData={formData}
                  className="space-y-[16px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DomainRegistration

import React from 'react'
import { useLocation } from 'react-router-dom'
import bg from '../assets/images/complete.jpg'
const RegistrationComplete: React.FC = () => {
  const location = useLocation()
  const domainId = location.state?.domainId || '299'

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-90">
      <div
        className="bg-cover bg-center h-full w-full absolute z-[-1]"
        style={{ backgroundImage: `url(${bg})` }}
      />

      <div className="bg-white/10 px-[64px] py-[48px] rounded-[20px] bg-cover p-8 w-[90%] max-w-[780px] text-center relative z-10 gap-y-[48px] flex flex-col items-center justify-center  ">
        <h1 className="md:text-[64px] text-[48px] mb-4 text-white">
          Registration <span className="text-[#3B82F6]">complete</span>
        </h1>

        <p className="text-[#8F9BB7] mb-6 text-[20px]">
          Your Domain ID {domainId} is now available in your PKT dashboard
        </p>

        <a
          href="https://app.pkt.cash/pktdnspage"
          rel="noopener noreferrer"
          className="rounded-full text-sm sm:text-base transition-all duration-300 text-white sm:w-[200px] w-[100%] h-[45px] align-middle text-center p-[10px] bg-[#0D4AE7] shadow-[0_0_20px_rgba(45,128,255,0.15)]"
        >
          View Dashboard
        </a>
      </div>
    </div>
  )
}

export default RegistrationComplete

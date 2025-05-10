import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo.svg'

const LogoHeader: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="relative mt-[40px] group">
      <img
        src={logo}
        alt="PKT Logo"
        className="w-[51px] h-[48px] md:w-[67px] md:h-[64px] cursor-pointer"
        onClick={() => navigate('/')}
      />
    </div>
  )
}

export default LogoHeader

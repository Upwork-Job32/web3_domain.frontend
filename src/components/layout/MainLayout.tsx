import React from 'react'
import bgImage from '../../assets/images/bg.jpg'
import LogoHeader from '../common/LogoHeader'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full fixed inset-0 bg-[#000B1E] px-4 sm:px-6 md:px-8 lg:px-[180px]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      <LogoHeader />

      <div className="relative min-h-screen w-full">{children}</div>
    </div>
  )
}

export default MainLayout

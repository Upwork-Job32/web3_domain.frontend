import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-full transition-all duration-300 font-normal'

  const variantStyles = {
    primary: 'bg-[#0D4AE7] text-white shadow-[0_0_20px_rgba(45,128,255,0.15)]',
    secondary:
      'text-white bg-transparent hover:border-[rgba(255,255,255,0.25)] border-2 border-white backdrop-blur-[32px]',
    outline: 'border-2 border-white text-white hover:bg-white/10'
  }

  const sizeStyles = {
    sm: 'text-sm py-2 px-4',
    md: 'text-base py-[10px] px-[40px]',
    lg: 'text-lg py-3 px-6'
  }

  const widthStyle = fullWidth ? 'w-full' : 'w-auto'

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button

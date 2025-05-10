import React from 'react'
import Button from './Button'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
  placeholder?: string
  className?: string
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search...',
  className = ''
}) => {
  return (
    <div
      className={`relative w-full h-12 sm:h-14 md:h-16 lg:h-[64px] flex items-center bg-white rounded-full backdrop-blur-[20px] ${className}`}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-full bg-transparent text-black text-sm sm:text-base placeholder:text-white/40 pl-4 sm:pl-6 md:pl-[24px] focus:outline-none rounded-full"
      />
      <Button
        onClick={onSubmit}
        className="absolute right-1 sm:right-[4px]"
        size="lg"
      >
        Search
      </Button>
    </div>
  )
}

export default SearchInput

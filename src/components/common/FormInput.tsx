import React from 'react'

interface FormInputProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
  type?: string
}

const FormInput: React.FC<FormInputProps> = ({
  value,
  onChange,
  placeholder,
  type = 'text'
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-white rounded-full px-6 py-4 text-black placeholder:text-gray-400 mb-[10px]"
    />
  )
}

export default FormInput

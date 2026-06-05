import React from "react"

interface InputProps {
  label?: string
  type?: string
  placeholder?: string
  name?: string
  id?: string
  className?: string
  containerClassName?: string
  maxLength?: number
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  paddingClass?: string
  labelColor?: string
  disabled?: boolean
  style?: React.CSSProperties
}

const Input = ({
  label,
  type = "text",
  placeholder,
  name,
  id,
  className = "",
  containerClassName = "",
  maxLength,
  value,
  onChange,
  onPaste,
  onKeyDown,
  paddingClass = "",
  labelColor = "",
  disabled = false,
  style
}: InputProps) => {
  const defaultInputClass =
    "border-none outline-none font-normal text-[#989898] placeholder:text-[#989898] text-sm bg-transparent w-full"

  const defaultContainerClass =
    "border border-[#5FDA78] rounded-[147px] glass-card"

  return (
    <div
      className={`${containerClassName || defaultContainerClass}`}
    >
      <div className={`py-2 md:py-3 px-5 md:px-6 flex  flex-col gap-1 ${paddingClass}`}>
        {label && (
          <label htmlFor={id} className={ `${labelColor} text-white  text-[14px]`}>
            {label}
          </label>
        )}

        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          className={className || defaultInputClass}
          maxLength={maxLength}
          value={value}
          onChange={onChange}
          onPaste={onPaste}
          onKeyDown={onKeyDown}
          disabled={disabled}
          style={style}
        />
      </div>
    </div>
  )
}

export default Input


interface CheckboxProps {
  label: string
  checked?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Checkbox = ({ label, checked, onChange }: CheckboxProps) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer text-white text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="accent-[#5FDA78] w-4 h-4 cursor-pointer"
      />
      {label}
    </label>
  )
}

export default Checkbox
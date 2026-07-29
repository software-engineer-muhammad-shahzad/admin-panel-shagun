export const FULL_NAME_MAX_LENGTH = 50
export const EMAIL_MAX_LENGTH = 254
export const PHONE_MIN_LENGTH = 10
export const PHONE_MAX_LENGTH = 15
export const PASSWORD_MIN_LENGTH = 8

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const FULL_NAME_REGEX = /^[a-zA-Z\s]+$/

export const validateFullName = (value: string): string => {
  const trimmed = value.trim()
  if (!trimmed) return "Full name is required"
  if (trimmed.length < 2) return "Full name must be at least 2 characters"
  if (trimmed.length > FULL_NAME_MAX_LENGTH) return `Full name must not exceed ${FULL_NAME_MAX_LENGTH} characters`
  if (!FULL_NAME_REGEX.test(trimmed)) return "Full name can only contain letters and spaces"
  return ""
}

export const validateEmail = (value: string): string => {
  const trimmed = value.trim()
  if (!trimmed) return "Email is required"
  if (trimmed.length > EMAIL_MAX_LENGTH) return "Email is too long"
  if (!EMAIL_REGEX.test(trimmed)) return "Enter a valid email address"
  return ""
}

export const validateContactNumber = (value: string): string => {
  if (!value.trim()) return "Contact number is required"
  if (!/^\d+$/.test(value)) return "Contact number must contain digits only"
  if (value.length < PHONE_MIN_LENGTH) return "Contact number must be at least 10 digits"
  if (value.length > PHONE_MAX_LENGTH) return "Contact number must not exceed 15 digits"
  if (value.startsWith("0") && value.length !== 10 && value.length !== 11) {
    return "Enter a valid phone number (10–11 digits starting with 0)"
  }
  return ""
}

export const validatePassword = (value: string): string => {
  if (!value) return "Password is required"
  if (value.length < PASSWORD_MIN_LENGTH) return `Password must be at least ${PASSWORD_MIN_LENGTH} characters`
  if (!/[A-Z]/.test(value)) return "Password must include at least one uppercase letter"
  if (!/[a-z]/.test(value)) return "Password must include at least one lowercase letter"
  if (!/\d/.test(value)) return "Password must include at least one number"
  if (!/[^A-Za-z0-9]/.test(value)) return "Password must include at least one special character"
  return ""
}

export const getFieldBorderClass = (error?: string) =>
  error ? "border-red-400" : "border-[#5FDA78]"

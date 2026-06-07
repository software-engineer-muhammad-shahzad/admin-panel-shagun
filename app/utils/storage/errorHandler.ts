/**
 * Extract error message from various error types
 */
export const getErrorMessage = (error: any): string => {
  if (typeof error === "string") {
    return error
  }

  if (error?.response?.data?.message) {
    return error.response.data.message
  }

  if (error?.response?.data?.statusMessage) {
    return error.response.data.statusMessage
  }

  if (error?.message) {
    return error.message
  }

  return "An error occurred. Please try again."
}

/**
 * Error handler for async operations
 * Returns error object with extracted message
 */
export type ErrorResult = {
  success: false
  error: string
}

export const handleError = (error: any): ErrorResult => {
  const message = getErrorMessage(error)
  return {
    success: false,
    error: message,
  }
}

import { handleError } from "@/app/utils/storage/errorHandler"

/**
 * Wrapper for async operations with error handling
 * Eliminates repetitive try-catch blocks
 * 
 * Usage:
 * const result = await asyncHandler(() => someAsyncFn())
 * if (result.success) {
 *   console.log(result.data)
 * } else {
 *   console.log(result.error)
 * }
 */
export type AsyncResult<T> = 
  | { success: true; data: T }
  | { success: false; error: string }

export const asyncHandler = async <T>(
  asyncFn: () => Promise<T>
): Promise<AsyncResult<T>> => {
  try {
    const data = await asyncFn()
    return { success: true, data }
  } catch (error: any) {
    const result = handleError(error)
    return { success: false, error: result.error }
  }
}

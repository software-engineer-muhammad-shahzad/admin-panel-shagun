/**
 * Search utility functions for filtering data
 */

/**
 * Filters an array of objects based on a search term
 * @param data - Array of objects to filter
 * @param searchTerm - Search term to filter by
 * @returns Filtered array of objects
 */
export const filterData = <T extends Record<string, any>>(
  data: T[],
  searchTerm: string
): T[] => {
  if (!searchTerm.trim()) {
    return data;
  }

  const lowercasedSearchTerm = searchTerm.toLowerCase();

  return data.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(lowercasedSearchTerm)
    )
  );
};
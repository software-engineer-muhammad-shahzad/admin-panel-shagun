/** Parse BE UTC datetimes that may omit a Z / offset, then format in the user's local timezone. */
export const formatDateTime = (dateString?: string | null) => {
  if (!dateString) return "N/A"

  const date = parseUtcToLocalDate(dateString)
  if (!date || Number.isNaN(date.getTime())) return "N/A"

  const day = date.toLocaleDateString("en-GB", { day: "numeric" })
  const monthYear = date.toLocaleDateString("en-GB", { month: "long", year: "numeric" })
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })

  return `${day}, ${monthYear} ${time}`
}

/**
 * BE sends UTC. Strings without Z/+offset are treated as UTC so local formatting is correct.
 */
const parseUtcToLocalDate = (dateString: string): Date | null => {
  const trimmed = dateString.trim()
  if (!trimmed) return null

  // Already has timezone (Z or ±HH:MM)
  if (/[zZ]$|[+-]\d{2}:?\d{2}$/.test(trimmed)) {
    return new Date(trimmed)
  }

  // Space-separated "YYYY-MM-DD HH:mm:ss" → ISO + Z
  const normalized = trimmed.includes("T") ? trimmed : trimmed.replace(" ", "T")
  return new Date(`${normalized}Z`)
}

export const formatDateTime = (dateString?: string | null) => {
  if (!dateString) return "N/A"
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return "N/A"

  const day = date.toLocaleDateString("en-GB", { day: "numeric" })
  const monthYear = date.toLocaleDateString("en-GB", { month: "long", year: "numeric" })
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })

  return `${day}, ${monthYear} ${time}`
}

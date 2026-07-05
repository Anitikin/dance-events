export function getGoogleCalendarUrl(event) {
  const start = new Date(event.event_date)
  const end = new Date(start.getTime() + 60 * 60 * 1000) // +1 час по умолчанию

  const formatDate = (d) => d.toISOString().replace(/-|:|\.\d+/g, '')

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${formatDate(start)}/${formatDate(end)}`,
    details: event.description || '',
    location: event.location || '',
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}
function formatDate(date) {
  const newDate = new Date(date);

  const formatedDate = newDate.toLocaleDateString(
    'en-US',
    {
      weekday: 'short',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

  return (formatedDate);

}

export { formatDate };
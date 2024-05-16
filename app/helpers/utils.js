

/** Helper function to format date into readable date */
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

/** Helper function to filter dates by >= currDate */
function compareDates(dateArr) {

  const currDate = new Date();
  const filtered = dateArr.filter(d => {
    const startAt = new Date(d.start_at);
    return startAt >= currDate;

})

  return filtered;
}

/** Helper to group dates */
function groupObjectsByStartDate(data) {
  const result = [];

  data.forEach(obj => {
    let groupedData = {};
    const startDate = obj.start_at;

    if (groupedData[startDate]) {
      groupedData[startDate].push(obj);

    } else {
      groupedData[startDate] = [obj];
    }

    result.push(groupedData)
  });

  console.log('result', result)
  return result;
}

export { formatDate, compareDates, groupObjectsByStartDate };
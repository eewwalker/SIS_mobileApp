

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

  });

  return filtered;
}

/** Helper to group dates */
function groupObjectsByStartDate(data) {
  const groupedData = [];

  data.forEach(obj => {
    const startDate = obj.start_at;
    const existingGroup = groupedData.find(group => group.date === startDate);

    if (existingGroup) {
      existingGroup.elements.push(obj);

    } else {
      groupedData.push({ date: startDate, elements: [obj] });
    }

  });
  console.log('groupedData', groupedData)
  return groupedData;
}

function sortByDate(dataArr) {
  const sorted = dataArr.sort((a, b) => {
    const startA = new Date(a.start_at);
    const startB = new Date(b.start_at);
    return startA - startB;
  })
  return sorted;
}

export { formatDate, compareDates, groupObjectsByStartDate, sortByDate };
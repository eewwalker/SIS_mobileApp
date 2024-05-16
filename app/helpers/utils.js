

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

  // Iterate through the array of objects
  data.forEach(obj => {
    const startDate = obj.start_at; // Assuming start_at is in date format

    // Check if the start date already exists in groupedData
    const existingGroup = groupedData.find(group => group.date === startDate);

    if (existingGroup) {
      // If the date already exists, push the object to the existing array
      existingGroup.elements.push(obj);
    } else {
      // If the date doesn't exist, create a new object with the date and array
      groupedData.push({ date: startDate, elements: [obj] });
    }
  });
  console.log(groupedData);
  return groupedData;
}

export { formatDate, compareDates, groupObjectsByStartDate };
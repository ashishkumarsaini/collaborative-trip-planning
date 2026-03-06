export const formatDate = (date: string) => {
  const dateObject = new Date(date);

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


  const dayName = daysOfWeek[dateObject.getDay()];
  const monthName = months[dateObject.getMonth()];
  const dayOfMonth = dateObject.getUTCDate();
  const year = dateObject.getUTCFullYear();

  return `${dayName}, ${monthName} ${dayOfMonth}, ${year}`;
}

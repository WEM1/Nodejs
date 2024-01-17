export function getCurrentDate() {
  let newDate = new Date();
  let date = newDate.getDate();
  let hours = newDate.getHours();
  let minutes = newDate.getMinutes();

  return `${hours}${'.'}${minutes}`;
}

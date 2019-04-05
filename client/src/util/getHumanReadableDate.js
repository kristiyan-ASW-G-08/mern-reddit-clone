const getHumanReadableDate = date => {
    const dateObject = new Date(Date.parse(date));
  return dateObject.toDateString();
}
export default getHumanReadableDate
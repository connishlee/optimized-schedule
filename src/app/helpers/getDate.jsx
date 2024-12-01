export const getDayDate = (day) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date();
  const dayIndex = days.indexOf(day);
  const diff = dayIndex - today.getDay();
  const targetDate = new Date();
  targetDate.setDate(today.getDate() + diff);

  return targetDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

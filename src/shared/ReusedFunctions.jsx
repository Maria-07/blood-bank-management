export default function formatDate(dateString) {
  const date = new Date(dateString);

  // Get day, month, and year
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  // Add ordinal suffix to the day
  const dayWithSuffix =
    day +
    ["th", "st", "nd", "rd"][
      day % 10 > 3 || Math.floor((day % 100) / 10) === 1 ? 0 : day % 10
    ];

  return `${dayWithSuffix} ${month}, ${year}`;
}

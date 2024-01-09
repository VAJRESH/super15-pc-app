import { v4 } from "uuid";

export function generateRandomId() {
  return v4();
}

// YYYY-MM-DD
export function getFormatedDate(dateObj = new Date()) {
  const date = new Date(dateObj);

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  // Format the dates using the formatter
  // and splits into array [month, date, year]
  const formattedDate = dateFormatter.format(date).split("/");

  return `${formattedDate?.[2]}-${formattedDate?.[0]}-${formattedDate?.[1]}`;
}

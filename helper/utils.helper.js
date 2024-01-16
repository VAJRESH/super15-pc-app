import { v4 } from "uuid";
import { DEFAULTS, QUESTION_TIMES } from "./constants.helper";

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

export function getCurrentQuestionIndex() {
  const quizStartTime = new Date(
    `${getFormatedDate()}T${DEFAULTS.quizStartTime}`,
  );

  const currentTime = new Date();
  const timeElapsed = currentTime.getTime() - quizStartTime.getTime();

  let currentQuestionIndex = 0;
  let totalTimeElapsed = 0;

  for (const questionTime of QUESTION_TIMES) {
    totalTimeElapsed += questionTime.timeLimit;
    if (timeElapsed <= totalTimeElapsed) break;

    currentQuestionIndex++;
  }

  console.log("Current question:", currentQuestionIndex);

  return currentQuestionIndex;
}

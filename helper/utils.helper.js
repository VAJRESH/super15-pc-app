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
  if (timeElapsed < 0) return null;

  let currentQuestionIndex = 0;
  let totalTimeElapsed = 0;

  for (const questionTime of QUESTION_TIMES) {
    totalTimeElapsed += questionTime.timeLimit;
    if (timeElapsed <= totalTimeElapsed) break;

    currentQuestionIndex++;
  }

  return currentQuestionIndex;
}

export function formatTime(milliseconds, isLongFormat = false) {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

  if (isLongFormat) {
    let time = "";
    if (hours !== 0) time += `${hours} hours`;
    if (minutes !== 0) time += ` ${minutes} min`;
    if (seconds !== 0) time += ` ${seconds} sec`;

    return time;
  }
  if (hours === 0 && minutes === 0) return `${seconds}s`;
  if (hours === 0) return `${minutes}m ${seconds}s`;
  return `${hours}h ${minutes}m ${seconds}s`;
}

export function getNextQuestionTime(
  questionNumber = null,
  secondsToReduce = 5 * 60 * 1000, // 5 minutes before
) {
  if (!questionNumber) return null;

  const quizStartTime = new Date(
    `${getFormatedDate()}T${DEFAULTS?.quizStartTime}`,
  ).getTime();
  let totalTime = 0;

  for (const question of QUESTION_TIMES) {
    const timeToEnd = question.timeLimit - secondsToReduce;

    if (questionNumber === question.questionNumber)
      return new Date(quizStartTime + timeToEnd + totalTime);

    totalTime += question.timeLimit;
  }
}

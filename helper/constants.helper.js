export const ERROR_MSG = {
  wrongPassword: "Wrong Password",
};

export const COLLECTIONS = {
  quiz: "quiz",
  questions: "questions", // sub collection in quiz
  subscriptions: "subscriptions",
  userQuizAttempts: "userQuizAttempts",
  leaderboards: "leaderboards",
};

export const DEFAULTS = {
  appName: "Super 15",
  profilePic:
    "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
  quizStartTime: "10:00:00",
  totalQuestions: 15,
};

export const SUBSCRIBTIONS = {
  noOfDays: 30,
  amount: 299,
  currency: "INR",
  url: "http://localhost:3000/api/razorpay",
};

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const ADMIN_UIDS = ["dYuHjusZ5hXX9PuCtvna6ULezwu1"];

export const QUESTION_TIMES = [
  { questionNumber: 1, timeLimit: 2 * 60 * 60 * 1000 }, // 2 hours in milliseconds //12
  { questionNumber: 2, timeLimit: 60 * 1000 },
  { questionNumber: 3, timeLimit: 60 * 1000 },
  { questionNumber: 4, timeLimit: 60 * 1000 },
  { questionNumber: 5, timeLimit: 60 * 1000 },
  { questionNumber: 6, timeLimit: 60 * 1000 },
  { questionNumber: 7, timeLimit: 60 * 1000 },
  { questionNumber: 8, timeLimit: 22 * 60 * 1000 },
  { questionNumber: 9, timeLimit: 60 * 1000 },
  { questionNumber: 10, timeLimit: 60 * 1000 },
  { questionNumber: 11, timeLimit: 10 * 1000 },
  { questionNumber: 12, timeLimit: 10 * 1000 },
  { questionNumber: 13, timeLimit: 10 * 1000 },
  { questionNumber: 14, timeLimit: 10 * 1000 },
  { questionNumber: 15, timeLimit: 10 * 1000 },
];

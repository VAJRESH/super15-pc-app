export const ERROR_MSG = {
  wrongPassword: "Wrong Password",
};

export const COLLECTIONS = {
  quiz: "quiz",
  questions: "questions", // sub collection in quiz
  superRoundVotes: "superRoundVotes",
  userQuizAttempts: "userQuizAttempts",
  leaderboards: "leaderboards",
  userData: "userData",
  subscription: "subscription",
  vpa: "vpa",
  dailyPrizes: "dailyPrizes",
};

export const DEFAULTS = {
  appName: "Super 15",
  profilePic:
    "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
  quizStartTime: "12:00:00",
  totalQuestions: 15,
  demoQuizQuestionTime: 10 * 1000,
  gapTime: 2 * 60 * 1000, // 2 mins
};

export const RAZOR_PAY_BASE_URL = "https://api.razorpay.com/v1";

export const BASE_URL = "https://super15-pc-app-sage.vercel.app";
// export const BASE_URL = "https://super15-pc-app.vercel.app";
// export const BASE_URL = "http://localhost:3000";

export const SUBSCRIBTIONS = {
  orderUrl: `${BASE_URL}/api/subscriptions/create`,
  accountNumber: "7878780080316316",
  razorpayKey: "rzp_live_GEw6hg7mOTY3QN",
};
export const DELETED_PLAN_IDS = ["plan_NVIOcafNLoz3ID", "plan_NVINDUfpcw91Di"];

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

export const QUESTION_TIMES = [
  // { questionNumber: 1, timeLimit: 8 * 60 * 1000 }, // 4 hours in milliseconds //12
  // { questionNumber: 2, timeLimit: 30 * 1000 },
  // { questionNumber: 3, timeLimit: 10 * 1000 },
  // { questionNumber: 4, timeLimit: 10 * 1000 },
  // { questionNumber: 5, timeLimit: 30 * 1000 },
  // { questionNumber: 6, timeLimit: 30 * 1000 },
  // { questionNumber: 7, timeLimit: 10 * 1000 },
  // { questionNumber: 8, timeLimit: 3 * 60 * 1000 },
  // { questionNumber: 9, timeLimit: 20 * 60 * 1000 },
  // { questionNumber: 10, timeLimit: 30 * 60 * 1000 },
  // { questionNumber: 11, timeLimit: 30 * 1000, cuttOff: 100 },
  // { questionNumber: 12, timeLimit: 30 * 1000, cuttOff: 50 },
  // { questionNumber: 13, timeLimit: 30 * 1000, cuttOff: 20 },
  // { questionNumber: 14, timeLimit: 30 * 1000, cuttOff: 10 },
  // { questionNumber: 15, timeLimit: 30 * 1000, cuttOff: 1 },

  { questionNumber: 1, timeLimit: 4 * 60 * 60 * 1000 }, // 4 hours in milliseconds
  { questionNumber: 2, timeLimit: 2 * 60 * 60 * 1000 },
  { questionNumber: 3, timeLimit: 60 * 60 * 1000 },
  { questionNumber: 4, timeLimit: 30 * 60 * 1000 },
  { questionNumber: 5, timeLimit: 15 * 60 * 1000 },
  { questionNumber: 6, timeLimit: 8 * 60 * 1000 },
  { questionNumber: 7, timeLimit: 4 * 60 * 1000 },
  { questionNumber: 8, timeLimit: 2 * 60 * 1000 },
  { questionNumber: 9, timeLimit: 60 * 1000 },
  { questionNumber: 10, timeLimit: 30 * 1000 },
  { questionNumber: 11, timeLimit: 15 * 1000, cuttOff: 100 },
  { questionNumber: 12, timeLimit: 15 * 1000, cuttOff: 50 },
  { questionNumber: 13, timeLimit: 10 * 1000, cuttOff: 20 },
  { questionNumber: 14, timeLimit: 10 * 1000, cuttOff: 10 },
  { questionNumber: 15, timeLimit: 5 * 1000, cuttOff: 1 },
].map((q) => ({ ...q, timeLimit: q.timeLimit + DEFAULTS.gapTime }));

export const DEMO_QUIZ_DATA = [
  {
    qId: "2024-01-18-1",
    date: "2024-01-18",
    qSeq: 1,
    qText: "Which planet is known as the 'Red Planet'?",
    qOpt1: "Venus",
    qOpt2: "Mars",
    qOpt3: "Jupiter",
    qOpt4: "Saturn",
    qOptCorrect: "Mars",
  },
  {
    qId: "2024-01-18-2",
    date: "2024-01-18",
    qSeq: 2,
    qText: "What is the largest ocean in the world?",
    qOpt1: "Atlantic Ocean",
    qOpt2: "Pacific Ocean",
    qOpt3: "Indian Ocean",
    qOpt4: "Arctic Ocean",
    qOptCorrect: "Pacific Ocean",
  },
  {
    qId: "2024-01-18-3",
    date: "2024-01-18",
    qSeq: 3,
    qText: "Who painted the Mona Lisa?",
    qOpt1: "Michelangelo",
    qOpt2: "Leonardo da Vinci",
    qOpt3: "Raphael",
    qOpt4: "Vincent van Gogh",
    qOptCorrect: "Leonardo da Vinci",
  },
  {
    qId: "2024-01-18-4",
    date: "2024-01-18",
    qSeq: 4,
    qText: "What is the capital of Australia?",
    qOpt1: "Sydney",
    qOpt2: "Melbourne",
    qOpt3: "Canberra",
    qOpt4: "Perth",
    qOptCorrect: "Canberra",
  },
  {
    qId: "2024-01-18-5",
    date: "2024-01-18",
    qSeq: 5,
    qText: "What is the currency of Japan?",
    qOpt1: "Yen",
    qOpt2: "Euro",
    qOpt3: "Dollar",
    qOpt4: "Pound",
    qOptCorrect: "Yen",
  },
  {
    qId: "2024-01-18-6",
    date: "2024-01-18",
    qSeq: 6,
    qText: "Which country is home to the famous ancient monument Stonehenge?",
    qOpt1: "France",
    qOpt2: "England",
    qOpt3: "Scotland",
    qOpt4: "Ireland",
    qOptCorrect: "England",
  },
  {
    qId: "2024-01-18-7",
    date: "2024-01-18",
    qSeq: 7,
    qText: "Who is the author of the Harry Potter book series?",
    qOpt1: "J.R.R. Tolkien",
    qOpt2: "J.K. Rowling",
    qOpt3: "Stephen King",
    qOpt4: "C.S. Lewis",
    qOptCorrect: "J.K. Rowling",
  },
  {
    qId: "2024-01-18-8",
    date: "2024-01-18",
    qSeq: 8,
    qText: "Which country is known as the 'Land of the Rising Sun'?",
    qOpt1: "China",
    qOpt2: "Japan",
    qOpt3: "Korea",
    qOpt4: "Vietnam",
    qOptCorrect: "Japan",
  },
  {
    qId: "2024-01-18-9",
    date: "2024-01-18",
    qSeq: 9,
    qText: "What is the highest mountain in the world?",
    qOpt1: "K2",
    qOpt2: "Kangchenjunga",
    qOpt3: "Mount Everest",
    qOpt4: "Lhotse",
    qOptCorrect: "Mount Everest",
  },
  {
    qId: "2024-01-18-10",
    date: "2024-01-18",
    qSeq: 10,
    qText: "What is the chemical symbol for gold?",
    qOpt1: "Ag",
    qOpt2: "Au",
    qOpt3: "Fe",
    qOpt4: "Cu",
    qOptCorrect: "Au",
  },
  {
    qId: "2024-01-18-11",
    date: "2024-01-18",
    qSeq: 11,
    qText: "What is the largest living organism on Earth?",
    qOpt1: "Giant sequoia tree",
    qOpt2: "Blue whale",
    qOpt3: "Honey fungus",
    qOpt4: "African baobab",
    qOptCorrect: "Giant sequoia tree",
  },
  {
    qId: "2024-01-18-12",
    date: "2024-01-18",
    qSeq: 12,
    qText: "What is the chemical symbol for water?",
    qOpt1: "H₂O",
    qOpt2: "NaCl",
    qOpt3: "CO₂",
    qOpt4: "NH₃",
    qOptCorrect: "H₂O",
  },
  {
    qId: "2024-01-18-13",
    date: "2024-01-18",
    qSeq: 13,
    qText: "Which country has the most islands in the world?",
    qOpt1: "Indonesia",
    qOpt2: "Philippines",
    qOpt3: "Japan",
    qOpt4: "Greece",
    qOptCorrect: "Indonesia",
  },
  {
    qId: "2024-01-18-14",
    date: "2024-01-18",
    qSeq: 14,
    qText: "What is the capital city of Germany?",
    qOpt1: "Munich",
    qOpt2: "Hamburg",
    qOpt3: "Berlin",
    qOpt4: "Frankfurt",
    qOptCorrect: "Berlin",
  },
  {
    qId: "2024-01-18-15",
    date: "2024-01-18",
    qSeq: 15,
    qText: "Which element makes up the majority of Earth's atmosphere?",
    qOpt1: "Oxygen",
    qOpt2: "Nitrogen",
    qOpt3: "Carbon dioxide",
    qOpt4: "Argon",
    qOptCorrect: "Nitrogen",
  },
];

export const DB_TABLES = {
  subscriptions: "subscriptions",
  razorpayXData: "razorpayXData",
  payoutData: "payoutData",
};

export const SUBSCRIBTION_STATUS = {
  active: "active",
  initailized: "initailized",
  cancelled: "cancelled",
  inactive: "inactive",
};

export const FOOTER_LINKS = {
  tAndC: {
    title: "Terms and Conditions",
    link: "https://super15.in/terms-and-conditions/",
  },
  privacy: {
    title: "Privacy Policy",
    link: "https://super15.in/privacy-policy/",
  },
  refund: {
    title: "Refund Policy",
    link: "https://super15.in/refund-policy/",
  },
  withdrawal: {
    title: "Withdrawal Policy",
    link: "https://super15.in/withdrawal-policy/",
  },
};

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
    qText: "कौन सा ग्रह 'लाल ग्रह' के नाम से जाना जाता है?",
    qOpt1: "शुक्र",
    qOpt2: "मंगल",
    qOpt3: "बृहस्पति",
    qOpt4: "शनि",
    qOptCorrect: "मंगल",
  },
  {
    qId: "2024-01-18-2",
    date: "2024-01-18",
    qSeq: 2,
    qText: "दुनिया का सबसे बड़ा महासागर कौन सा है?",
    qOpt1: "अटलांटिक महासागर",
    qOpt2: "प्रशांत महासागर",
    qOpt3: "हिंद महासागर",
    qOpt4: "आर्कटिक महासागर",
    qOptCorrect: "प्रशांत महासागर",
  },
  {
    qId: "2024-01-18-3",
    date: "2024-01-18",
    qSeq: 3,
    qText: "मोनालिसा किसने बनाई थी?",
    qOpt1: "माइकलएंजेलो",
    qOpt2: "लियोनार्डो दा विंची",
    qOpt3: "राफेल",
    qOpt4: "विन्सेंट वैन गॉग",
    qOptCorrect: "लियोनार्डो दा विंची",
  },
  {
    qId: "2024-01-18-4",
    date: "2024-01-18",
    qSeq: 4,
    qText: "ऑस्ट्रेलिया की राजधानी क्या है?",
    qOpt1: "सिडनी",
    qOpt2: "मेलबर्न",
    qOpt3: "कैनबरा",
    qOpt4: "पर्थ",
    qOptCorrect: "कैनबरा",
  },
  {
    qId: "2024-01-18-5",
    date: "2024-01-18",
    qSeq: 5,
    qText: "जापान की मुद्रा क्या है?",
    qOpt1: "येन",
    qOpt2: "यूरो",
    qOpt3: "डॉलर",
    qOpt4: "पाउंड",
    qOptCorrect: "येन",
  },
  {
    qId: "2024-01-18-6",
    date: "2024-01-18",
    qSeq: 6,
    qText: "कौन सा देश प्रसिद्ध प्राचीन स्मारक स्टोनहेंज का घर है?",
    qOpt1: "फ्रांस",
    qOpt2: "इंग्लैंड",
    qOpt3: "स्कॉटलैंड",
    qOpt4: "आयरलैंड",
    qOptCorrect: "इंग्लैंड",
  },
  {
    qId: "2024-01-18-7",
    date: "2024-01-18",
    qSeq: 7,
    qText: "हैरी पॉटर पुस्तक श्रृंखला के लेखक कौन हैं?",
    qOpt1: "जे.आर.आर. टोल्किन",
    qOpt2: "जे.के. रोलिंग",
    qOpt3: "स्टीफन किंग",
    qOpt4: "सी.एस. लुईस",
    qOptCorrect: "जे.के. रोलिंग",
  },
  {
    qId: "2024-01-18-8",
    date: "2024-01-18",
    qSeq: 8,
    qText: "कौन सा देश 'उगते सूरज की भूमि' के नाम से जाना जाता है?",
    qOpt1: "चीन",
    qOpt2: "जापान",
    qOpt3: "कोरिया",
    qOpt4: "वियतनाम",
    qOptCorrect: "जापान",
  },
  {
    qId: "2024-01-18-9",
    date: "2024-01-18",
    qSeq: 9,
    qText: "दुनिया का सबसे ऊँचा पर्वत कौन सा है?",
    qOpt1: "K2",
    qOpt2: "कंचनजंगा",
    qOpt3: "माउंट एवरेस्ट",
    qOpt4: "ल्होत्से",
    qOptCorrect: "माउंट एवरेस्ट",
  },
  {
    qId: "2024-01-18-10",
    date: "2024-01-18",
    qSeq: 10,
    qText: "सोने का रासायनिक प्रतीक क्या है?",
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
    qText: "पृथ्वी पर सबसे बड़ा जीवित जीव कौन सा है?",
    qOpt1: "विशाल सेक्वोइया पेड़",
    qOpt2: "नीली व्हेल",
    qOpt3: "हनी फंगस",
    qOpt4: "अफ्रीकी बाओबाब",
    qOptCorrect: "विशाल सेक्वोइया पेड़",
  },
  {
    qId: "2024-01-18-12",
    date: "2024-01-18",
    qSeq: 12,
    qText: "पानी का रासायनिक प्रतीक क्या है?",
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
    qText: "किस देश में दुनिया में सबसे अधिक द्वीप हैं?",
    qOpt1: "इंडोनेशिया",
    qOpt2: "फिलीपींस",
    qOpt3: "जापान",
    qOpt4: "ग्रीस",
    qOptCorrect: "इंडोनेशिया",
  },
  {
    qId: "2024-01-18-14",
    date: "2024-01-18",
    qSeq: 14,
    qText: "जर्मनी की राजधानी कौन सी है?",
    qOpt1: "म्यूनिख",
    qOpt2: "हैम्बर्ग",
    qOpt3: "बर्लिन",
    qOpt4: "फ्रैंकफर्ट",
    qOptCorrect: "बर्लिन",
  },
  {
    qId: "2024-01-18-15",
    date: "2024-01-18",
    qSeq: 15,
    qText: "पृथ्वी के वायुमंडल का अधिकांश हिस्सा किस तत्व से बना है?",
    qOpt1: "ऑक्सीजन",
    qOpt2: "नाइट्रोजन",
    qOpt3: "कार्बन डाइऑक्साइड",
    qOpt4: "आर्गन",
    qOptCorrect: "नाइट्रोजन",
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

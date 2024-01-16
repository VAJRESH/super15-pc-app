import { atom } from "recoil";

export const QuizAtom = atom({
  key: "QuizAtom",
  default: getQuizDataObj(),
});

export function getQuizDataObj(data = {}) {
  return {
    quizId: data?.quizId || null,
    date: data?.date || null,
    totalQuestions: data?.totalQuestions || 0,
    questions: data?.questions || [],
    status: data?.status || "",

    createdAt: data?.createdAt || "",
    createdBy: data?.createdBy || "",
    updatedAt: data?.updatedAt || "",
    updatedBy: data?.updatedBy || "",
  };
}

export const QuestionAtom = atom({
  key: "questionAtom",
  default: getQuestionObj(),
});

export function getQuestionObj(data = {}) {
  let i = null;
  if (!!data?.qOptCorrect) {
    if (data?.qOptCorrect === data?.qOpt1) i = 1;
    if (data?.qOptCorrect === data?.qOpt2) i = 2;
    if (data?.qOptCorrect === data?.qOpt3) i = 3;
    if (data?.qOptCorrect === data?.qOpt4) i = 4;
  }

  return {
    qId: data?.qId || "",
    date: data?.date || "",
    qSeq: data?.qSeq || null,
    qText: data?.qText || "",
    qOpt1: data?.qOpt1 || "",
    qOpt2: data?.qOpt2 || "",
    qOpt3: data?.qOpt3 || "",
    qOpt4: data?.qOpt4 || "",
    qOptCorrect: data?.qOptCorrect || "",
    qOptCorrectIndex: data?.qOptCorrectIndex || i || null,
    createdAt: data?.createdAt || "",
    createdBy: data?.createdBy || "",
    updatedAt: data?.updatedAt || "",
    updatedBy: data?.updatedBy || "",
    status: data?.status || "",
  };
}

export const UserQuizMapAtom = atom({
  key: "UserQuizMapAtom",
  default: [],
});

export function getUserQuizMapDataObj(data = {}) {
  return {
    userId: data?.userId || null,
    quizId: data?.quizId || null,
    qId: data?.qId || null,
    answer: data?.answer || "",
    result: data?.result || 0, // 0 for fail, 1 for pass

    status: data?.status || "",
    createdAt: data?.createdAt || "",
    createdBy: data?.createdBy || "",
    updatedAt: data?.updatedAt || "",
    updatedBy: data?.updatedBy || "",
  };
}

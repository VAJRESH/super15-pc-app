import { atom } from "recoil";

export const questionAtom = atom({
  key: "questionAtom",
  default: {
    qId: null,
    date: null,
    qSeq: null,
    qText: null,
    qOpt1: null,
    qOpt2: null,
    qOpt3: null,
    qOpt4: null,
    qOptCorrect: null,
  },
});

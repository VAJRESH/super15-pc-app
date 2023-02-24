import { atom } from "recoil";

export const questionAtom = atom({
  key: "questionAtom",
  default: {
    qId: '',
    date: '',
    qSeq: '',
    qText: '',
    qOpt1: '',
    qOpt2: '',
    qOpt3: '',
    qOpt4: '',
    qOptCorrect: false,
    createdAt: '',
    createdBy: '',
    updatedAt: '',
    updatedBy: '',
    status: ''
  },
});

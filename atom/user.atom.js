import { atom } from "recoil";

export const currentUserAtom = atom({
  key: "currentUser",
  default: {
    email: null,
    uid: null,
  },
});

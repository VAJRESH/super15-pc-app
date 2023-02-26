import { atom } from "recoil";

export const currentUserAtom = atom({
  key: "currentUser",
  default: {
    uid: null,
    email: null,
    phoneNumber: null,
    photoURL: null,
    accessToken: null,
    expirationTime: null,
    refreshToken: null,
  },
});

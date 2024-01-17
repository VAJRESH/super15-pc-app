import { DEFAULTS } from "@/helper/constants.helper";
import { atom } from "recoil";

export const CurrentUserAtom = atom({
  key: "currentUser",
  default: getUserDataObj(),
});

export function getUserDataObj(data = {}) {
  return {
    uid: data?.uid || null,
    displayName: data?.displayName || null,
    email: data?.email || null,
    photoURL: data?.photoURL || DEFAULTS?.profilePic,
    accessToken: data?.accessToken || null,
    expirationTime: data?.expirationTime || null,
    refreshToken: data?.refreshToken || null,
  };
}

import { CurrentUserAtom, getUserDataObj } from "@/atom/user.atom";
import { COLLECTIONS, ERROR_MSG } from "@/helper/constants.helper";
import { addUpdateFirestoreData, auth } from "@/helper/firebase.helper";
import { useIonToast } from "@ionic/react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { useRecoilState } from "recoil";

export default function useHandleUserData() {
  const [user, setUser] = useRecoilState(CurrentUserAtom);
  const [userTemp, setUserTemp] = useState(getTempUserDataObj(user));

  const [present] = useIonToast();

  // utils
  function toaster(message) {
    present({
      message: message,
      duration: 1500,
      position: "bottom",
    });
  }

  function getTempUserDataObj(data = {}) {
    return {
      ...(getUserDataObj(data) || {}),
      password: data?.password || "",
      cnfPassword: data?.cnfPassword || "",
    };
  }

  function validateEmail(email) {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    );
  }

  // local
  function handleUpdateUser(obj = {}) {
    setUser((prev) => getUserDataObj({ ...(prev || {}), ...(obj || {}) }));
  }

  function handleUpdateUserTemp(obj = {}) {
    setUserTemp((prev) =>
      getTempUserDataObj({ ...(prev || {}), ...(obj || {}) }),
    );
  }

  async function handleRegister(e) {
    e.preventDefault();

    const { displayName, email, password, cnfPassword } = userTemp;

    if (!displayName) return toaster("Username is required!");
    // lenght limit applied for razorpay contact
    if (displayName?.length < 2)
      return toaster("Username should be at least 3 characters!");
    if (displayName?.length > 50)
      return toaster("Username should not be at more than 50 characters!");

    if (!email) return toaster("Email is required!");
    if (validateEmail(email?.trim()) === null) return toaster("Invalid Email");

    if (!password) return toaster("Password is required!");
    if (password?.length < 6)
      return toaster("Enter strong password with at least 6 characters!");
    if (password?.trim() !== cnfPassword?.trim())
      return toaster("Passwords did not match!");

    try {
      await createUserWithEmailAndPassword(
        auth,
        email?.trim(),
        password?.trim(),
      ).catch((err) => console.log(err));

      await updateProfile(auth.currentUser, { displayName }).catch((err) =>
        console.log(err),
      );

      await addUpdateFirestoreData(
        COLLECTIONS.userData,
        { isAdmin: false },
        auth?.currentUser?.uid,
        {},
        { createNew: true },
      ).catch((err) =>
        console.log("Create User Data Error", err, err?.message),
      );

      handleUpdateUser({ displayName });
      toaster("Registration Successful.");
    } catch (err) {
      console.log(err);
      toaster("Registration Failed.");
    }
  }

  async function handleLogin(e) {
    e.preventDefault();

    const { email, password } = userTemp;
    if (validateEmail(email) === null) return toaster("Invalid Email");

    try {
      const signInResponse = await signInWithEmailAndPassword(
        auth,
        email?.trim(),
        password?.trim(),
      );
      toaster("Login Successful.");
      handleUpdateUser(signInResponse?.user);
    } catch (error) {
      console.log(error, error?.message);
      if (error?.message?.includes("wrong-password"))
        return toaster(ERROR_MSG?.wrongPassword);

      toaster("Login Failed.");
    }
  }

  return {
    userTemp,
    handleUpdateUserTemp,
    handleRegister,
    handleLogin,
  };
}

import { CurrentUserAtom, getUserDataObj } from "@/atom/user.atom";
import { auth } from "@/helper/firebase.helper";
import { loadVpaData } from "@/services/queries.services";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export function useAuth() {
  const [currentUser, setCurrentUser] = useRecoilState(CurrentUserAtom);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) return router.push("/login");

      setCurrentUser(getUserDataObj(user));
    });

    return unsub;
  }, []);

  // load vpa
  useEffect(() => {
    if (!currentUser?.uid) return;

    loadVpaData(currentUser?.uid)
      .then((res) =>
        setCurrentUser((prev) => ({ ...(prev || {}), vpa: res?.vpa?.address })),
      )
      .catch((err) => console.log(err));
  }, [currentUser?.uid]);

  return currentUser;
}

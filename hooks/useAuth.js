import { CurrentUserAtom, getUserDataObj } from "@/atom/user.atom";
import { auth } from "@/helper/firebase.helper";
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

  return currentUser;
}

import { CurrentUserAtom, getUserDataObj } from "@/atom/user.atom";
import { COLLECTIONS } from "@/helper/constants.helper";
import { auth, getDataWithId } from "@/helper/firebase.helper";
import { requestPermissions } from "@/helper/localNotification.helper";
import { loadVpaData } from "@/services/queries.services";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export function useAuth() {
  const [user, setUser] = useRecoilState(CurrentUserAtom);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      const isLoginRegisterPage = ["/login", "/register"].includes(
        router.pathname,
      );
      if (!user && !isLoginRegisterPage) return router.push("/login");
      if (!!user && isLoginRegisterPage) router.push("/dashboard");

      handleUpdateUser(user);
    });

    return unsub;
  }, []);

  // load user data
  useEffect(() => {
    if (!user?.uid) return;

    loadUserData();

    requestPermissions();
  }, [user?.uid]);

  async function loadUserData() {
    const userId = user?.uid;

    if (!userId) return;
    const userData = {};

    if (!user?.vpa) {
      const vpaData = await loadVpaData(userId).catch((err) =>
        console.log(err),
      );
      userData.vpa = vpaData?.vpa?.address;
    }

    const _userData = await getDataWithId(COLLECTIONS?.userData, userId).catch(
      (err) => console.log(err),
    );

    handleUpdateUser({ ...(userData || {}), ...(_userData || {}) });
  }

  function handleUpdateUser(obj = {}) {
    setUser((prev) => getUserDataObj({ ...(prev || {}), ...(obj || {}) }));
  }

  return user;
}

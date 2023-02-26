import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentUserAtom } from "../../atom/user.atom";
import { auth, useAuth } from "../../helper/firebase.helper";

export default function AuthChecker({ children }) {
  const [user, setUser] = useRecoilState(currentUserAtom);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        });
      } else {
        setUser({ email: null, uid: null });
      }
    });
    setLoading(false);
    return () => unsubscribe();
  }, []);

  return <>{loading ? null : children}</>;
}

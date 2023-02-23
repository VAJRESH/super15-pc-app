import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentUserAtom } from "../../atom/user.atom";
import { auth } from "../../helper/firebase.helper";

export default function AuthChecker({ children }) {
  const [user, setUser] = useRecoilState(currentUserAtom);
  const [loading, setLoading] = useState(true);
  console.log("Authchecker", user);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid,
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

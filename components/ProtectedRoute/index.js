import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { currentUserAtom } from "../../atom/user.atom";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const user = useRecoilValue(currentUserAtom);

  useEffect(() => {
    if (!user.uid) {
      router.push("/login");
    }
  }, [router, user]);

  return <div>{user ? children : null}</div>;
}

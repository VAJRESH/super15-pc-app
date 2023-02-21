import { useState } from "react";

export default function AuthChecker({ children }) {
  const [user, setUser] = useState({ email: null, uid: null });
  const [loading, setLoading] = useState(false);
  return (
    <>
      {loading ? null : children}
    </>
  );
}

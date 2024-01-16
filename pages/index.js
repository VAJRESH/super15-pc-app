import { useAuth } from "@/hooks/useAuth";
import { IonApp } from "@ionic/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const user = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user?.uid) return;

    const timer = setTimeout(() => router.push("/dashboard"), 2000);

    return () => clearTimeout(timer);
  }, [user?.uid]);

  return (
    <>
      <IonApp>
        <img
          src="/splash.png"
          alt=""
          style={{ objectFit: "contain", height: "100%" }}
        />
      </IonApp>
    </>
  );
}

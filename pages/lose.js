import { IonApp, IonButton, IonContent, IonText } from "@ionic/react";
import { useRouter } from "next/router";

export default function Lose() {
  const router = useRouter();
  const message = router.query.message || null;

  return (
    <>
      <IonApp>
        <IonContent style={{ textAlign: "center", fontWeight: "bold" }}>
          <IonText color="secondary">
            <h1>You Lost</h1>
          </IonText>

          <img
            alt=""
            src="/images/game-over.png"
            style={{ maxHeight: "350px" }}
          />

          <IonText color="primary">
            <h2>Better Luck Next time!</h2>

            <p>{message || "Come back again"}</p>
          </IonText>

          <IonButton onClick={() => router.push("/dashboard")}>
            Dashboard
          </IonButton>
        </IonContent>
      </IonApp>
    </>
  );
}

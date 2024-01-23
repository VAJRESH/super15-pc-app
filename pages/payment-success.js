import VpaInput from "@/components/VpaInput/index";
import { IonApp, IonButton, IonContent, IonText } from "@ionic/react";
import { useRouter } from "next/router";

export default function PaymentSuccess() {
  const router = useRouter();

  return (
    <>
      <IonApp>
        <IonContent style={{ textAlign: "center", fontWeight: "bold" }}>
          <img
            alt=""
            src="/images/payment-success.png"
            style={{ maxHeight: "350px" }}
          />

          <IonText color="primary">
            <h2>Subscription Done</h2>

            <p>You can now enjoy playing quiz</p>
          </IonText>

          <div className="ion-padding">
            <VpaInput />
          </div>

          <IonButton onClick={() => router.push("/dashboard")}>
            Dashboard
          </IonButton>
        </IonContent>
      </IonApp>
    </>
  );
}

import {
  IonContent,
  IonHeader,
  IonModal,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Card from "./Card";
import useHandleSubscription from "@/hooks/useHandleSubscription";

export default function Subscription() {
  const { payWithRazorpay, expiryDate, isUnsubscribed } =
    useHandleSubscription();

  return (
    <>
      <IonContent className="ion-padding">
        <IonModal
          trigger="open-modal"
          isOpen={isUnsubscribed}
          style={{ display: "flex" }}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle style={{ textAlign: "center" }}>Subscriptions</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent>
            <IonText style={{ textAlign: "center" }}>
              <h5>You don't have active subscription</h5>
            </IonText>

            <Card expiryDate={expiryDate} handleClick={payWithRazorpay} />
          </IonContent>
        </IonModal>
      </IonContent>
    </>
  );
}

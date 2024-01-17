import { IsLoadingAtom, SubscriptionAtom } from "@/atom/global.atom";
import { CurrentUserAtom } from "@/atom/user.atom";
import useHandleSubscription from "@/hooks/useHandleSubscription";
import {
  IonContent,
  IonHeader,
  IonModal,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useRecoilValue } from "recoil";
import Card from "./Card";
import RazorpayForm from "./RazorpayForm";
import Loader from "../Loader/index";

export default function Subscription() {
  const isLoading = useRecoilValue(IsLoadingAtom);
  const user = useRecoilValue(CurrentUserAtom);
  const subscription = useRecoilValue(SubscriptionAtom);
  const { payWithRazorpay, expiryDate, options, btnRef } =
    useHandleSubscription();

  return (
    <>
      <IonContent className="ion-padding">
        <IonModal
          isOpen={!!user?.uid && subscription?.isSubscribed === false}
          style={{ display: "flex" }}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle style={{ textAlign: "center" }}>Subscriptions</IonTitle>
            </IonToolbar>
          </IonHeader>

          {isLoading && <Loader isFullPage={true} />}

          <IonContent>
            <IonText style={{ textAlign: "center" }}>
              <h5>You don't have active subscription</h5>
            </IonText>

            <Card expiryDate={expiryDate} handleClick={payWithRazorpay} />

            <RazorpayForm btnRef={btnRef} options={options} />
          </IonContent>
        </IonModal>
      </IonContent>
    </>
  );
}

import { IsLoadingAtom, SubscriptionAtom } from "@/atom/global.atom";
import useHandleSubscription from "@/hooks/useHandleSubscription";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useRecoilValue } from "recoil";
import Loader from "../Loader/index";
import Card from "./Card";
import RazorpayForm from "./RazorpayForm";

export default function Subscription() {
  const isLoading = useRecoilValue(IsLoadingAtom);
  const subscription = useRecoilValue(SubscriptionAtom);
  const { hanldeSubscription, payWithRazorpay, expiryDate, options, btnRef } =
    useHandleSubscription();

  return (
    <>
      <IonContent className="ion-padding">
        <IonModal
          isOpen={subscription?.isPopUpOpen}
          style={{ display: "flex" }}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>Subscriptions</IonTitle>

              <IonButtons slot="end">
                <IonButton
                  strong={true}
                  onClick={() =>
                    hanldeSubscription({
                      isPopUpOpen: !subscription?.isPopUpOpen,
                    })
                  }
                >
                  Close
                </IonButton>
              </IonButtons>
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

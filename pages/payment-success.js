import {
  IsLoadingAtom,
  SubscriptionAtom,
  getSubscriptionDataObj,
} from "@/atom/global.atom";
import { CurrentUserAtom } from "@/atom/user.atom";
import { COLLECTIONS, SUBSCRIBTIONS } from "@/helper/constants.helper";
import { addUpdateFirestoreData } from "@/helper/firebase.helper";
import { getFormatedDate } from "@/helper/utils.helper";
import { IonApp, IonButton, IonContent, IonText } from "@ionic/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export default function PaymentSuccess() {
  const router = useRouter();
  const user = useRecoilValue(CurrentUserAtom);
  const [subscription, setSubscription] = useRecoilState(SubscriptionAtom);
  const [isLoading, setIsLoading] = useRecoilState(IsLoadingAtom);

  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + SUBSCRIBTIONS?.noOfDays);

  useEffect(() => {
    if (!user?.uid) return;
    if (!!subscription?.razorpayPaymentId) return;

    setIsLoading(true);
    const razorpayData = JSON.parse(router?.query?.data);
    const subscriptionData = {
      userId: user?.uid,
      expiryDate: getFormatedDate(expiryDate),
      razorpayPaymentId: razorpayData?.razorpay_payment_id,
      orderId: razorpayData?.razorpay_order_id,
      signature: razorpayData?.razorpay_signature,
    };

    addUpdateFirestoreData(COLLECTIONS.subscriptions, subscriptionData)
      .then(() => {
        setSubscription(
          getSubscriptionDataObj({
            ...(subscriptionData || {}),
            isSubscribed: true,
          }),
        );
      })
      .finally(() => setIsLoading(false));
  }, [user?.uid]);

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

          <IonButton onClick={() => router.push("/dashboard")}>
            Dashboard
          </IonButton>
        </IonContent>
      </IonApp>
    </>
  );
}

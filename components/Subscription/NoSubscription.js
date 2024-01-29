import useHandleSubscription from "@/hooks/useHandleSubscription";
import { IonText } from "@ionic/react";
import Card from "./Card";
import RazorpayForm from "./RazorpayForm";

export default function NoSubscription() {
  const { payWithRazorpay, expiryDate, options, btnRef } =
    useHandleSubscription();

  return (
    <>
      <IonText style={{ textAlign: "center" }}>
        <h5>You don't have active subscription</h5>
      </IonText>

      <Card expiryDate={expiryDate} handleClick={payWithRazorpay} />

      <RazorpayForm btnRef={btnRef} options={options} />
    </>
  );
}

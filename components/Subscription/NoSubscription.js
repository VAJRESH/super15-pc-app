import { IsLoadingAtom, PlansAtom } from "@/atom/global.atom";
import { IonText } from "@ionic/react";
import { useRecoilValue, useRecoilState } from "recoil";
import Loader from "../Loader/index";
import Card from "./Card";
import useHandleSubscription from "@/hooks/useHandleSubscription";
import { useEffect } from "react";
import { loadPlans } from "@/services/queries.services";
import { DELETED_PLAN_IDS } from "@/helper/constants.helper";

export default function NoSubscription() {
  const isLoading = useRecoilValue(IsLoadingAtom);
  // const plans = useRecoilValue(PlansAtom);
  const [plans, setPlans] = useRecoilState(PlansAtom);

  const { payWithRazorpay } = useHandleSubscription();

  useEffect(() => {
    if (plans != null) return;

    loadPlans().then((res) =>
      setPlans(
        res
          ?.filter((plan) => !DELETED_PLAN_IDS?.includes(plan?.id))
          ?.sort((p1, p2) => (p1?.item?.amount > p2?.item?.amount ? 1 : -1)) ||
          [],
      ),
    );
  }, []);

  // // setup razorpay checkout
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    document.body.appendChild(script);

    return () => document.body.removeChild(script);
  }, []);

  // // setup razorpay checkout
  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://checkout.razorpay.com/v1/checkout.js";

  //   document.body.appendChild(script);

  //   return () => document.body.removeChild(script);
  // }, []);

  const cardColors = ["secondary", "primary", "tertiary"];

  return (
    <>
      <IonText style={{ textAlign: "center" }}>
        <h5>You don't have active subscription</h5>
      </IonText>

      {plans == null && !isLoading && <Loader />}
      {plans?.map((plan, i) => (
        <Card
          key={plan?.id}
          name={plan?.item?.name}
          description={plan?.item?.description}
          amount={+plan?.item?.amount / 100}
          type={plan?.notes?.[0] || cardColors?.[i]}
          handleClick={() => payWithRazorpay(plan)}
        />
      ))}
    </>
  );
}

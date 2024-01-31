import useHandleSubscription from "@/hooks/useHandleSubscription";
import { loadPlans } from "@/services/queries.services";
import { IonText } from "@ionic/react";
import { useEffect, useState } from "react";
import Loader from "../Loader/index";
import Card from "./Card";
import { useRecoilValue } from "recoil";
import { IsLoadingAtom } from "@/atom/global.atom";

export default function NoSubscription() {
  const isLoading = useRecoilValue(IsLoadingAtom);
  const [plans, setPlans] = useState(null);

  const { payWithRazorpay } = useHandleSubscription();

  useEffect(() => {
    loadPlans().then((res) => setPlans(res || []));
  }, []);

  return (
    <>
      <IonText style={{ textAlign: "center" }}>
        <h5>You don't have active subscription</h5>
      </IonText>

      {plans == null && !isLoading && <Loader />}
      {plans?.map((plan) => (
        <Card
          key={plan?.id}
          name={plan?.item?.name}
          description={plan?.item?.description}
          amount={+plan?.item?.amount / 100}
          type={plan?.period === "yearly" ? "secondary" : "medium"}
          handleClick={() => payWithRazorpay(plan)}
        />
      ))}
    </>
  );
}

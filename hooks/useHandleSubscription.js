import {
  IsLoadingAtom,
  SubscriptionAtom,
  getSubscriptionDataObj,
} from "@/atom/global.atom";
import { CurrentUserAtom } from "@/atom/user.atom";
import { DEFAULTS, SUBSCRIBTIONS } from "@/helper/constants.helper";
import { useRouter } from "next/router";
import { loadSubscriptionData } from "@/services/queries.services";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export default function useHandleSubscription() {
  const user = useRecoilValue(CurrentUserAtom);
  const [subscription, setSubscription] = useRecoilState(SubscriptionAtom);
  const [isLoading, setIsLoading] = useRecoilState(IsLoadingAtom);
  const router = useRouter();

  useEffect(() => {
    if (!user?.uid) return;

    loadUserSubscription();
  }, [user?.uid]);

  function hanldeSubscription(obj = {}) {
    setSubscription((prev) =>
      getSubscriptionDataObj({ ...(prev || {}), ...(obj || {}) }),
    );
  }

  async function loadUserSubscription() {
    if (subscription?.userId === user?.uid) return;

    if (subscription?.isPopUpOpen == null) setIsLoading(true);

    return await loadSubscriptionData(user?.uid)
      .then((res) => {
        const subData = getSubscriptionDataObj(res);

        subData.isPopUpOpen = !subData?.razorpayPaymentId;
        if (router.pathname.includes("subscription"))
          subData.isPopUpOpen = null;

        setSubscription(subData);
        return subData;
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  async function payWithRazorpay(planData) {
    setIsLoading(true);

    fetch(SUBSCRIBTIONS.orderUrl, {
      method: "POST",
      body: JSON.stringify({
        userId: user?.uid,
        planId: planData?.id,
      }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        const options = {
          key: SUBSCRIBTIONS?.razorpayKey,
          subscription_id: res?.id,
          name: DEFAULTS?.appName,
          description: planData?.description,
          image: "/images/Super15 Logo.png",
          callback_url: SUBSCRIBTIONS?.successUrl,
          prefill: {
            name: user?.displayName,
            email: user.email,
            contact: user?.phoneNumber,
          },
          theme: {
            color: "#F37254",
          },
        };

        const rzp1 = new Razorpay(options);
        rzp1.open();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  return {
    hanldeSubscription,
    loadUserSubscription,
    payWithRazorpay,
  };
}

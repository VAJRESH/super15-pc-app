import {
  IsLoadingAtom,
  SubscriptionAtom,
  getSubscriptionDataObj,
} from "@/atom/global.atom";
import { CurrentUserAtom } from "@/atom/user.atom";
import { DEFAULTS, SUBSCRIBTIONS } from "@/helper/constants.helper";
import { loadSubscriptionData } from "@/services/queries.services";
import { saveSubscription } from "@/services/razorpayX.services";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export default function useHandleSubscription() {
  const user = useRecoilValue(CurrentUserAtom);
  const [subscription, setSubscription] = useRecoilState(SubscriptionAtom);
  const [isLoading, setIsLoading] = useRecoilState(IsLoadingAtom);
  const router = useRouter();

  useEffect(() => {
    if (!user?.uid) return;
    if (subscription?.isPopUpOpen === false) return;
    if (subscription?.isDataLoaded) return;

    loadUserSubscription();
  }, [user?.uid, subscription?.isPopUpOpen, subscription?.isDataLoaded]);

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

        subData.isDataLoaded = true;
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
        planId: planData?.item.name,
        amount: planData?.item?.amount,
        noOfDays: planData?.item?.noOfDays,
      }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        if (!res.id) return alert(res?.error || "Something went wrong");

        const options = {
          key: SUBSCRIBTIONS.razorpayKey, // Enter the Key ID generated from the Dashboard
          amount: planData?.item?.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "Super15",
          image: "/images/Super15 Logo.png",
          order_id: res.id,
          handler: async function (response) {
            await saveSubscription({
              razorpay_signature: response.razorpay_signature,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_subscription_id: response.razorpay_order_id,
            })
              .then(async () => {
                setSubscription((prev) =>
                  getSubscriptionDataObj({
                    ...(prev || {}),
                    isPopUpOpen: false,
                    planId: planData?.item.name,
                    signature: response?.razorpay_signature,
                    razorpayPaymentId: response?.razorpay_payment_id,
                    id: response?.razorpay_subscription_id,
                  }),
                );
              })
              .catch(() => {
                alert("Something went wrong");
              });

            router.push("/payment-success");
            setSubscription((prev) =>
              getSubscriptionDataObj({
                ...(prev || {}),
                isPopUpOpen: false,
                signature: response?.razorpay_signature,
                razorpayPaymentId: response?.razorpay_payment_id,
                id: response?.razorpay_subscription_id,
              }),
            );
          },
          prefill: {
            name: user?.displayName,
            email: user.email,
            contact: user?.phoneNumber,
          },
          theme: {
            color: "#F37254",
          },
        };

        // const options = {
        //   key: SUBSCRIBTIONS?.razorpayKey,
        //   subscription_id: res?.id,
        //   name: DEFAULTS?.appName,
        //   description: planData?.description,
        //   image: "/images/Super15 Logo.png",
        //   // callback_url: SUBSCRIBTIONS?.successUrl,
        //   handler: async function (response) {
        //     // await saveSubscription(response)
        //     //   .then(async () => {
        //     //     setSubscription((prev) =>
        //     //       getSubscriptionDataObj({
        //     //         ...(prev || {}),
        //     //         isPopUpOpen: false,
        //     //         signature: response?.razorpay_signature,
        //     //         razorpayPaymentId: response?.razorpay_payment_id,
        //     //         id: response?.razorpay_subscription_id,
        //     //       }),
        //     //     );

        //     //   })
        //     //   .catch(() => {
        //     //     alert("Something went wrong");
        //     //   });

        //     router.push("/payment-success");
        //     setSubscription((prev) =>
        //       getSubscriptionDataObj({
        //         ...(prev || {}),
        //         isPopUpOpen: false,
        //         signature: response?.razorpay_signature,
        //         razorpayPaymentId: response?.razorpay_payment_id,
        //         id: response?.razorpay_subscription_id,
        //       }),
        //     );
        //   },
        //   prefill: {
        //     name: user?.displayName,
        //     email: user.email,
        //     contact: user?.phoneNumber,
        //   },
        //   theme: {
        //     color: "#F37254",
        //   },
        // };

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

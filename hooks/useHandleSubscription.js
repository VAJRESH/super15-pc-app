import {
  IsLoadingAtom,
  SubscriptionAtom,
  getSubscriptionDataObj,
} from "@/atom/global.atom";
import { CurrentUserAtom } from "@/atom/user.atom";
import {
  COLLECTIONS,
  DEFAULTS,
  SUBSCRIBTIONS,
} from "@/helper/constants.helper";
import { addUpdateFirestoreData } from "@/helper/firebase.helper";
import { getFormatedDate } from "@/helper/utils.helper";
import { loadSubscriptionData } from "@/services/queries.services";
import { useIonToast } from "@ionic/react";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export default function useHandleSubscription() {
  const user = useRecoilValue(CurrentUserAtom);
  const [subscription, setSubscription] = useRecoilState(SubscriptionAtom);
  const [isLoading, setIsLoading] = useRecoilState(IsLoadingAtom);
  const [isUnsubscribed, setIsUnsubscribed] = useState(false);

  const [present] = useIonToast();

  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + SUBSCRIBTIONS?.noOfDays);

  useEffect(() => {
    loadUserSubscription();
  }, []);

  function toaster(message) {
    present({
      message: message,
      duration: 1500,
      position: "bottom",
    });
  }

  async function loadUserSubscription() {
    if (!!subscription?.userId) return;

    setIsLoading(true);

    return await loadSubscriptionData()
      .then((res) => {
        console.log("res", res);
        setIsUnsubscribed(!res?.length);

        const subData = getSubscriptionDataObj(res?.[0]);
        setSubscription(subData);

        return subData;
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function payWithRazorpay() {
    // toaster("Feature not implemented yet");

    const options = {
      key: "rzp_test_8SCsJGRxwB9Dnp",
      amount: SUBSCRIBTIONS.amount,
      description: `Monthly subscription till ${expiryDate?.toDateString()}`,
      image: "https://i.imgur.com/3g7nmJC.jpg",
      order_id: null,
      currency: SUBSCRIBTIONS?.currency,
      name: DEFAULTS.appName,
      prefill: {
        email: user.email,
        contact: user.phoneNumber,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const subscriptionData = {
      userId: user?.uid,
      expiryDate: getFormatedDate(expiryDate),
      amount: options?.amount,
    };
    setIsLoading(true);
    addUpdateFirestoreData(COLLECTIONS.subscriptions, subscriptionData)
      .then(() => {
        setIsUnsubscribed(false);
        setSubscription(getSubscriptionDataObj(subscriptionData));
      })
      .finally(() => setIsLoading(false));

    // fetch(SUBSCRIBTIONS.url)
    //   .then((res) => res.json())
    //   .then(async (res) => {
    //     console.log(res);

    //     options.order_id = res?.id;

    //     try {
    //       let data = await Checkout.open(options);
    //       console.log(data.response + "AcmeCorp");
    //       console.log(JSON.stringify(data));
    //     } catch (error) {
    //       //it's paramount that you parse the data into a JSONObject
    //       let errorObj = JSON.parse(error["code"]);

    //       console.log(errorObj);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  return {
    loadUserSubscription,
    isUnsubscribed,
    payWithRazorpay,
    expiryDate,
  };
}

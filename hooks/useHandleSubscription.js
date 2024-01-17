import {
  IsLoadingAtom,
  SubscriptionAtom,
  getSubscriptionDataObj,
} from "@/atom/global.atom";
import { CurrentUserAtom } from "@/atom/user.atom";
import { DEFAULTS, SUBSCRIBTIONS } from "@/helper/constants.helper";
import { loadSubscriptionData } from "@/services/queries.services";
import { useIonToast } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export default function useHandleSubscription() {
  const user = useRecoilValue(CurrentUserAtom);
  const [subscription, setSubscription] = useRecoilState(SubscriptionAtom);
  const [isLoading, setIsLoading] = useRecoilState(IsLoadingAtom);

  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + SUBSCRIBTIONS?.noOfDays);

  const [options, setOptions] = useState({
    key: "rzp_test_8SCsJGRxwB9Dnp",
    amount: SUBSCRIBTIONS.amount,
    description: `Monthly subscription till ${expiryDate?.toDateString()}`,
    image: "https://cdn.razorpay.com/logos/BUVwvgaqVByGp2_large.jpg",
    orderId: null,
    currency: SUBSCRIBTIONS?.currency,
    name: DEFAULTS.appName,
    prefillName: user?.displayName,
    prefillEmail: user.email,
  });

  const btnRef = useRef(null);

  const [present] = useIonToast();

  useEffect(() => {
    if (!user?.uid) return;

    loadUserSubscription();
  }, [user?.uid]);

  // update user details
  useEffect(() => {
    setOptions((prev) => ({
      ...(prev || {}),
      prefillName: user?.displayName,
      prefillEmail: user.email,
    }));
  }, [user?.displayName, user?.email]);

  // submit razorpay form
  useEffect(() => {
    if (!options?.orderId) return;

    btnRef?.current?.click();
  }, [options?.orderId]);

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

    return await loadSubscriptionData(user?.uid)
      .then((res) => {
        const subData = getSubscriptionDataObj(res?.[0]);
        subData.isSubscribed = !!res?.length && !!subData?.razorpayPaymentId;

        setSubscription(subData);
        return subData;
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  async function payWithRazorpay() {
    setIsLoading(true);

    fetch(SUBSCRIBTIONS.orderUrl, {
      method: "POST",
      contentType: "application/json",
      body: JSON.stringify({
        userId: user?.uid,
        expiryDate,
        amount: options?.amount,
      }),
    })
      .then((res) => res.json())
      .then(async (res) =>
        setOptions((prev) => ({ ...(prev || {}), orderId: res?.id })),
      )
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  return {
    loadUserSubscription,
    payWithRazorpay,
    expiryDate,
    options,
    btnRef,
  };
}

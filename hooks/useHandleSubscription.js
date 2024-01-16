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
    prefillPhoneNumber: user.phoneNumber,
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
      prefillPhoneNumber: user.phoneNumber,
    }));
  }, [user?.displayName, user?.email, user?.phoneNumber]);

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

    return await loadSubscriptionData()
      .then((res) => {
        console.log("res", res);
        const subData = getSubscriptionDataObj(res?.[0]);
        subData.isSubscribed = !!res?.length;

        setSubscription(subData);
        return subData;
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  async function payWithRazorpay() {
    // toaster("Feature not implemented yet");
    setIsLoading(true);

    fetch(SUBSCRIBTIONS.orderUrl)
      .then((res) => res.json())
      .then(async (res) => {
        console.log(res);

        setOptions((prev) => ({ ...(prev || {}), orderId: res?.id }));

        try {
          function successCallback(success) {
            console.log("payment_id: " + success.razorpay_payment_id);
            var orderId = success.razorpay_order_id;
            var signature = success.razorpay_signature;

            const subscriptionData = {
              userId: user?.uid,
              expiryDate: getFormatedDate(expiryDate),
              amount: options?.amount,
              orderId,
              signature,
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
          }

          function cancelCallback(error) {
            console.log(error);
          }
        } catch (error) {
          console.log(error);
        }
      })
      .catch((err) => {
        console.log(err);
      })
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

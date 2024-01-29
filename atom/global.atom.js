import { atom } from "recoil";

export const IsLoadingAtom = atom({
  key: "IsLoadingAtom",
  default: null,
});

export const SubscriptionAtom = atom({
  key: "SubscriptionAtom",
  default: getSubscriptionDataObj(),
});

export function getSubscriptionDataObj(data = {}) {
  return {
    userId: data?.userId || null,
    expiryDate: data?.expiryDate || null,
    razorpayPaymentId: data?.razorpayPaymentId || null,
    orderId: data?.orderId || null,
    signature: data?.signature || null,
    amount: data?.amount || null,
    isPopUpOpen: data?.isPopUpOpen || null,
  };
}

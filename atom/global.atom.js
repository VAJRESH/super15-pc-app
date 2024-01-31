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
    id: data?.id || null,
    userId: data?.userId || null,
    expiryDate: data?.expiryDate || null,
    razorpayPaymentId: data?.razorpayPaymentId || null,
    orderId: data?.orderId || null,
    signature: data?.signature || null,
    amount: data?.amount || null,
    createdAt: data?.createdAt || null,
    updatedAt: data?.updatedAt || null,
    isPopUpOpen:
      typeof data?.isPopUpOpen === "boolean" ? data?.isPopUpOpen : null,
  };
}

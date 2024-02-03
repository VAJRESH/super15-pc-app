import { atom } from "recoil";

export const IsLoadingAtom = atom({
  key: "IsLoadingAtom",
  default: null,
});

export const PlansAtom = atom({
  key: "PlansAtom",
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
    planId: data?.planId || null,
    razorpayPaymentId: data?.razorpayPaymentId || null,
    signature: data?.signature || null,

    // razorpay plan data
    amount: data?.amount || null,
    currency: data?.currency || null,
    description: data?.description || null,
    name: data?.name || null,

    // razorpay subscription data
    razorpayStatus: data?.razorpayStatus || null,
    remainingCount: data?.remainingCount || null,
    totalCount: data?.totalCount || null,
    currentStart: data?.currentStart || null,
    currentEnd: data?.currentEnd || null,
    startAt: data?.startAt || null,
    endAt: data?.endAt || null,

    createdAt: data?.createdAt || null,
    status: data?.status || null,
    updatedAt: data?.updatedAt || null,
    isPopUpOpen:
      typeof data?.isPopUpOpen === "boolean" ? data?.isPopUpOpen : null,
  };
}

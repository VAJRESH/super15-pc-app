import { BASE_URL } from "@/helper/constants.helper";

export async function createContactAccount({
  userId = null,
  name = null,
  email = null,
  vpa = null,
}) {
  return await fetch(`${BASE_URL}/api/contacts/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, vpa, userId }),
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => {
      console.log("create vpa error", err, err?.message);
      return null;
    });
}

export function updateContact({ userId = null, name = null }) {
  fetch(`${BASE_URL}/api/contacts/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ name }),
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

export async function saveSubscription({
  razorpay_signature = null,
  razorpay_payment_id = null,
  razorpay_subscription_id = null,
}) {
  await fetch(`${BASE_URL}/api/subscriptions/payment-success`, {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      razorpay_payment_id,
      razorpay_signature,
      razorpay_subscription_id,
    }),
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

export async function cancelSubscription(id) {
  if (!id) return;

  await fetch(`${BASE_URL}/api/subscriptions/${id}`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

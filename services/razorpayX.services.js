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
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ name, email, vpa, userId }),
  })
    .then((res) => {
      console.log(res, res.status, res.body);

      return res;
    })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => {
      console.log("create vpa error", err, err?.message);
      return err;
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

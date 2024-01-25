import { BASE_URL } from "@/helper/constants.helper";

export function createContactAccount({
  userId = null,
  name = null,
  email = null,
  vpa = null,
}) {
  fetch(`${BASE_URL}/api/contacts/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, vpa, userId }),
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

export function updateContact({ userId = null, name = null }) {
  fetch(`${BASE_URL}/api/contacts/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

import excuteQuery, { razorpayX } from "@/helper/backend.helper";
import { DB_TABLES } from "@/helper/constants.helper";

export default async function createContactAndVPA(req, res) {
  const { vpa, userId, name, email } = req.body;

  const contactData = await razorpayX?.Contact.create({
    name: name,
    email: email,
    reference_id: userId,
    type: "customer",
  });
  if (!contactData?.id)
    return res.status(400).json({ error: "Contact Create Error" });

  const fundData = await razorpayX?.FundAccount.create({
    account_type: "vpa",
    contact_id: contactData?.id,
    vpa: { address: vpa },
  });
  if (!fundData?.id)
    return res.status(400).json({ error: "Contact Create Error" });

  const result = await excuteQuery({
    query: `INSERT INTO ${DB_TABLES?.razorpayXData} (userId, contactId, fundId) VALUES (?, ?, ?)`,
    values: [userId, contactData?.id, fundData?.id],
  });

  if (result?.error)
    return res.status(400).json({ error: "Something went wrong" });

  res.status(200).json({ success: true });
}

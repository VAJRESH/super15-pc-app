import excuteQuery, { razorpayX } from "@/helper/backend.helper";
import { DB_TABLES } from "@/helper/constants.helper";

export default async function handle(req, res) {
  const { userId } = req.query;
  const isGet = req.method === "GET";

  const result = await excuteQuery({
    query: `SELECT * from ${DB_TABLES?.razorpayXData} WHERE userId=?`,
    values: [userId],
  });

  if (isGet) {
    const fundData = await razorpayX.FundAccount.get(result?.[0]?.fundId);

    return res.status(200).json(fundData);
  }

  // udpate contact
  const data = await razorpayX.Contact.update(result?.[0]?.contactId, {
    name: req.body.name,
  });
  if (!data?.id) return res.status(400).json({ error: "Contact Update Error" });

  return res.status(200).json({ success: true });
}

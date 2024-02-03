import excuteQuery, { razorpay } from "@/helper/backend.helper";
import { DB_TABLES, SUBSCRIBTION_STATUS } from "@/helper/constants.helper";

export default function cancelSubscription(req, res) {
  const { id } = req?.query;

  if (req.method === "OPTIONS") return res.status(200).json({});

  return new Promise(async (resolve, reject) => {
    const response = await razorpay.subscriptions.cancel(id, true);
    console.log(response);

    if (!response?.id) {
      res.status(400).json({ error: "Something went wrong" });

      return reject();
    }

    const result = await excuteQuery({
      query: `UPDATE ${DB_TABLES?.subscriptions} SET status=? WHERE subscriptionId=?`,
      values: [SUBSCRIBTION_STATUS?.cancelled, id],
    });

    if (result?.error) {
      res.status(400).json({ error: result?.error || "Something went wrong" });

      return reject();
    }

    res.status(200).json({ success: true });
    resolve();
  });
}

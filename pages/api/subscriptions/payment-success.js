import excuteQuery from "@/helper/backend.helper";
import { DB_TABLES, SUBSCRIBTION_STATUS } from "@/helper/constants.helper";

export default function paymentSuccess(req, res) {
  const subscriptionData = req?.body?.payload?.subscription?.entity;
  const paymentData = req?.body?.payload?.payment?.entity;

  if (req.method === "OPTIONS") return res.status(200).json({});

  return new Promise(async (resolve, reject) => {
    const result = await excuteQuery({
      query: `UPDATE ${DB_TABLES?.subscriptions} SET razorpayPaymentId=?, status=?, endDate=? WHERE subscriptionId=?`,
      values: [
        paymentData?.id,
        SUBSCRIBTION_STATUS?.active,
        subscriptionData?.current_end,
        subscriptionData?.id,
      ],
    });

    if (result?.error) {
      res.status(400).json({ error: result?.error || "Something went wrong" });

      return reject();
    }

    res.status(200).json({ success: true });
    resolve();
  });
}

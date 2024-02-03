import excuteQuery from "@/helper/backend.helper";
import { DB_TABLES, SUBSCRIBTION_STATUS } from "@/helper/constants.helper";

export default function paymentSuccess(req, res) {
  const razorpayData = req?.body;

  if (req.method === "OPTIONS") return res.status(200).json({});

  return new Promise(async (resolve, reject) => {
    const result = await excuteQuery({
      query: `UPDATE ${DB_TABLES?.subscriptions} SET signature=?, razorpayPaymentId=?, status=? WHERE subscriptionId=?`,
      values: [
        razorpayData?.razorpay_signature,
        razorpayData?.razorpay_payment_id,
        SUBSCRIBTION_STATUS?.active,
        razorpayData?.razorpay_subscription_id,
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

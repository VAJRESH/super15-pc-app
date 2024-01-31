import excuteQuery from "@/helper/backend.helper";
import { DB_TABLES } from "@/helper/constants.helper";

export default function PaymentSuccess(req, res) {
  const razorpayData = req?.body;

  return new Promise(async (resolve, reject) => {
    const result = await excuteQuery({
      query: `UPDATE ${DB_TABLES?.subscriptions} SET signature=?, razorpayPaymentId=? WHERE subscriptionId=?`,
      values: [
        razorpayData?.razorpay_signature,
        razorpayData?.razorpay_payment_id,
        razorpayData?.razorpay_subscription_id,
      ],
    });

    if (result?.error) {
      res.status(400).redirect(`http://localhost/dashboard`);

      return reject();
    }

    res.status(200).redirect(`http://localhost/payment-success`);
    resolve();
  });
}

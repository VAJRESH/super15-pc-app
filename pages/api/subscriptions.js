import excuteQuery, { con } from "@/helper/backend.helper";
import { DB_TABLES } from "@/helper/constants.helper";
import { getFormatedDate } from "@/helper/utils.helper";

export default function subscriptions(req, res) {
  const userId = req?.query?.userId;

  return new Promise(async (resolve, reject) => {
    const result = await excuteQuery({
      query: `SELECT * FROM ${DB_TABLES?.subscriptions} WHERE  userId=? && expiryDate>=? && razorpayPaymentId IS NOT NULL`,
      values: [userId, getFormatedDate()],
    });

    res.status(200).json(result);
    resolve();
  });
}

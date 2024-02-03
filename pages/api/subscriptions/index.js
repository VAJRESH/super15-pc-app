import excuteQuery, { razorpay } from "@/helper/backend.helper";
import { DB_TABLES, SUBSCRIBTION_STATUS } from "@/helper/constants.helper";

export default function subscriptions(req, res) {
  const userId = req?.query?.userId;

  return new Promise(async (resolve, reject) => {
    const result = await excuteQuery({
      query: `
        SELECT * FROM ${DB_TABLES?.subscriptions} 
        WHERE  userId=? && status IN (?, ?) && razorpayPaymentId IS NOT NULL
        ORDER BY coalesce(updatedAt, createdAt) DESC`,
      values: [
        userId,
        SUBSCRIBTION_STATUS?.active,
        SUBSCRIBTION_STATUS?.cancelled,
      ],
    });
    if (!result?.[0]?.id) {
      res.status(200).json({});
      return resolve();
    }
    const subData = await razorpay.subscriptions.fetch(
      result?.[0]?.subscriptionId,
    );

    if (subData?.status !== "active") {
      await excuteQuery({
        query: `UPDATE ${DB_TABLES?.subscriptions} SET status=? WHERE subscriptionId=?`,
        values: [SUBSCRIBTION_STATUS?.inactive, id],
      });

      res.status(200).json({});

      return resolve();
    }

    const planData = await razorpay.plans.fetch(result?.[0]?.planId);

    if (!!result?.error) {
      res.status(400).json({ error: result?.error || "Something went wrong" });
      return reject();
    }

    res.status(200).json({
      id: subData?.id || null,
      userId: result?.[0]?.userId || null,
      planId: result?.[0]?.planId || null,
      razorpayPaymentId: result?.[0]?.razorpayPaymentId || null,
      signature: result?.[0]?.signature || null,
      status: result?.[0]?.status || null,

      razorpayStatus: subData?.status || null,
      remainingCount: subData?.remaining_count || null,
      totalCount: subData?.total_count || null,
      currentStart: subData?.current_start || null,
      currentEnd: subData?.current_end || null,
      startAt: subData?.start_at || null,
      endAt: subData?.end_at || null,

      amount: planData?.item?.amount / 100 || null,
      currency: planData?.item?.currency || null,
      description: planData?.item?.description || null,
      name: planData?.item?.name || null,
    });
    resolve();
  });
}

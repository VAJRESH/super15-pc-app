import excuteQuery, { razorpay } from "@/helper/backend.helper";
import { DB_TABLES } from "@/helper/constants.helper";

export default function subscriptions(req, res) {
  const userId = req?.query?.userId;

  return new Promise(async (resolve, reject) => {
    const result = await excuteQuery({
      query: `
        SELECT * FROM ${DB_TABLES?.subscriptions} 
        WHERE  userId=? && razorpayPaymentId IS NOT NULL
        ORDER BY coalesce(updatedAt, createdAt) DESC`,
      values: [userId],
    });
    const subData = await razorpay.subscriptions.fetch(
      result?.[0]?.subscriptionId,
    );
    const planData = await razorpay.plans.fetch(result?.[0]?.planId);

    if (!!result?.error) {
      res.status(400).json({ error: result?.error || "Something went wrong" });
      return reject();
    }

    if (subData?.status !== "active") {
      res.status(400).json({ error: "Subscription Not Active" });
      return resolve();
    }

    res.status(200).json({
      id: subData?.id || null,
      userId: result?.[0]?.userId || null,
      planId: result?.[0]?.planId || null,
      razorpayPaymentId: result?.[0]?.razorpayPaymentId || null,
      signature: result?.[0]?.signature || null,

      status: subData?.status || null,
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

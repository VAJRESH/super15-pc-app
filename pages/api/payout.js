import excuteQuery, { adminApp, razorpayX } from "@/helper/backend.helper";
import {
  COLLECTIONS,
  DB_TABLES,
  SUBSCRIBTIONS,
} from "@/helper/constants.helper";

export default async function payout(req, res) {
  const quizId = getFormatedDate();
  //   const quizId = "2024-01-18";

  const db = adminApp;
  const leaderboardData = (
    await db.collection(COLLECTIONS.leaderboards).doc(quizId).get()
  )?.data();

  const lastQuizRoundIndex = leaderboardData?.[15] == null ? 10 : 15;
  const prizePool =
    leaderboardData?.[1]?.length *
    (SUBSCRIBTIONS?.amount / SUBSCRIBTIONS?.noOfDays);
  const payoutAmount =
    prizePool / leaderboardData?.[lastQuizRoundIndex]?.length;

  const result = await excuteQuery({
    query: `SELECT * from ${DB_TABLES?.razorpayXData} WHERE userId IN (?)`,
    values: [
      leaderboardData?.[lastQuizRoundIndex]?.map((user) => user?.userId),
    ],
  });
  for (let i = 0; i < result?.length; i++) {
    const data = result?.[i];
    const payoutData = await razorpayX?.Payout?.create({
      account_number: SUBSCRIBTIONS?.accountNumber,
      fund_account_id: data?.fundId,
      amount: +payoutAmount * 100,
      currency: "INR",
      mode: "UPI",
      purpose: "cashback",
      queue_if_low_balance: true,
    });

    await excuteQuery({
      query: `
        INSERT INTO ${DB_TABLES?.payoutData} 
        (userId, quizId, amount, accountNumber, fundId, transactionId, status, reason, description)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      values: [
        userId,
        quizId,
        payoutAmount,
        SUBSCRIBTIONS?.accountNumber,
        data?.fundId,
        payoutData?.id,
        payoutData?.status,
        payoutData?.status_details?.reason || payoutData?.data?.error?.reason,
        payoutData?.status_details?.description ||
          payoutData?.data?.error?.description,
      ],
    });
  }

  return res.status(200).json({ success: true });
}

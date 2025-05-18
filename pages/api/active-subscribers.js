import excuteQuery from "@/helper/backend.helper";
import { DB_TABLES, SUBSCRIBTION_STATUS } from "@/helper/constants.helper";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const result = await excuteQuery({
      query: `
        SELECT COUNT(*) as activeSubscribers 
        FROM ${DB_TABLES?.subscriptions}
        WHERE status = ? 
        AND razorpayPaymentId IS NOT NULL
        `,
      values: [SUBSCRIBTION_STATUS?.active],
    });

    return res.status(200).json({
      activeSubscribers: result[0]?.activeSubscribers || 0,
    });
  } catch (error) {
    console.error("Error fetching active subscribers:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

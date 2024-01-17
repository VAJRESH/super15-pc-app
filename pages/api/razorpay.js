import excuteQuery, { parseJson } from "@/helper/backend.helper";
import { DB_TABLES, SUBSCRIBTIONS } from "@/helper/constants.helper";
import { generateRandomId } from "@/helper/utils.helper";
import Razorpay from "razorpay";

// https://www.freecodecamp.org/news/integrate-a-payment-gateway-in-next-js-and-react-with-razorpay-and-tailwindcss/

export default async function handler(req, res) {
  // Initialize razorpay object
  const razorpay = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY_ID,
    key_secret: process.env.RAZOR_PAY_SECRET_KEY,
  });

  const subscriptionData = parseJson(req.body);

  // Create an order -> generate the OrderID -> Send it to the Front-end
  const paymentCapture = 1;
  const amount = SUBSCRIBTIONS?.amount;
  const currency = SUBSCRIBTIONS?.currency;
  const options = {
    amount: (amount * 100).toString(),
    currency,
    receipt: generateRandomId(),
    payment_capture: paymentCapture,
  };

  try {
    const response = await razorpay.orders.create(options);

    const result = await excuteQuery({
      query: `INSERT INTO ${DB_TABLES?.subscriptions} (orderId, userId, expiryDate, amount) VALUES (?, ?, ?, ?)`,
      values: [
        response?.id,
        subscriptionData?.userId,
        subscriptionData?.expiryDate,
        subscriptionData?.amount,
      ],
    });
    if (result?.error)
      return res.status(400).json({ error: "Something went wrong" });

    res.status(200).json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
}

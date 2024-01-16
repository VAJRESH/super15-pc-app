export default function PaymentSuccess(req, res) {
  console.log(req.body);

  return res.status(200).json({ Success: true });
}

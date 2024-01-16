export default function PaymentFailure(req, res) {
  console.log(req.query);

  return res.status(200).json({ Success: true });
}

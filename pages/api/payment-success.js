export default function PaymentSuccess(req, res) {
  // redirecting to pages as node api does not have user id
  res.status(200).redirect(`/payment-success?data=${JSON.stringify(req.body)}`);
}

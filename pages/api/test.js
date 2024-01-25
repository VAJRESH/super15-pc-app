export default function test(req, res) {
  res.status(201).json({
    r: process.env.RAZOR_PAY_SECRET_KEY,
    env: process.env,
  });
}

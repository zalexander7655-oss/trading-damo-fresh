export default async function handler(req, res) {
  // NOWPayments will call this after real payment
  const payment = req.body;
  console.log("IPN Received:", payment);
  // Payment will come to your NOWPayments dashboard
  res.status(200).json({ status: "ok" });
}

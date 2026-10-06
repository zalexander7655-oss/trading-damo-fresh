// NOWPayments - Unlimited Mails Auto Approve - Final
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, price_amount, demo_amount } = req.body;
  if (!email) return res.status(400).json({ error: 'Email zaroori hai' });

  const orderId = `DEMO_${email}_${Date.now()}_${demo_amount || 2000}`;

  try {
    const response = await fetch('https://api.nowpayments.io/v1/invoice', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.NOWPAYMENTS_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        price_amount: price_amount || 10,
        price_currency: 'usd',
        pay_currency: 'usdttrc20',
        order_id: orderId,
        order_description: `Demo for ${email}`,
        ipn_callback_url: 'https://trading-damo-fresh.vercel.app/api/nowpayments-ipn'
      })
    });

    const data = await response.json();
    return res.status(200).json(data);
    
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}

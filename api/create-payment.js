// FINAL CODE - Unlimited Auto Approval - Any Demo Amount
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, price_amount, demo_amount } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    if (!demo_amount) {
      return res.status(400).json({ error: 'demo_amount is required' });
    }

    // This creates Unlimited Unique Order ID with Email + Demo Amount
    // Example: DEMO_test@gmail.com_1700000000000_5000
    const orderId = `DEMO_${email}_${Date.now()}_${demo_amount}`;

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
        order_description: `Demo ${demo_amount} for ${email}`,
        ipn_callback_url: 'https://trading-damo-fresh.vercel.app/api/nowpayments-ipn'
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(400).json({ error: data.message || 'Failed to create invoice', details: data });
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error('Create Payment Error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}

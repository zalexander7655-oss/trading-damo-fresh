// FINAL CODE - Fixed Email Parsing
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Vercel kabhi body ko string bhejta hai, is liye ye fix
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch(e) {}
    }

    let { email, price_amount, demo_amount } = body || {};

    // Email ko saaf karo
    if (email) email = email.toString().trim().toLowerCase();

    console.log("Final Body Received:", body);

    // FIX: Agar email phir bhi nahi hai to guest email banao - error khatam
    if (!email || !email.includes('@')) {
      email = `guest_${Date.now()}@tradingmaster.pro`;
    }

    if (!demo_amount) demo_amount = 1000;
    if (!price_amount) price_amount = 10;

    const orderId = 'DEMO_' + email + '_' + Date.now() + '_' + demo_amount;

    const response = await fetch('https://api.nowpayments.io/v1/invoice', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.NOWPAYMENTS_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        price_amount: Number(price_amount),
        price_currency: 'usd',
        pay_currency: 'usdttrc20',
        order_id: orderId,
        order_description: 'Demo ' + demo_amount + ' for ' + email,
        ipn_callback_url: 'https://trading-damo-fresh.vercel.app/api/nowpayments-ipn',
        success_url: 'https://trading-damo-fresh.vercel.app/main.html?payment=success',
        cancel_url: 'https://trading-damo-fresh.vercel.app/purchase.html?payment=cancel'
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

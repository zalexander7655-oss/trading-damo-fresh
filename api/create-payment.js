// FINAL CODE - With Admin Approval Flow - No Auto Credit
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Fix for Vercel string body
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch(e) {}
    }

    let { email, price_amount, demo_amount, order_id } = body || {};

    // Clean email
    if (email) email = email.toString().trim().toLowerCase();

    console.log("Final Body Received:", body);

    // If email missing, create guest email - prevent error
    if (!email || !email.includes('@')) {
      email = `guest_${Date.now()}@tradingmaster.pro`;
    }

    if (!demo_amount) demo_amount = 1000;
    if (!price_amount) price_amount = 10;

    const finalOrderId = order_id || 'DEMO_' + email + '_' + Date.now() + '_' + demo_amount;

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
        order_id: finalOrderId,
        order_description: 'Demo ' + demo_amount + ' for ' + email,
        ipn_callback_url: 'https://trading-damo-fresh.vercel.app/api/nowpayments-ipn',
        // IMPORTANT: After payment, user returns to purchase page to upload Email + Screenshot
        success_url: 'https://trading-damo-fresh.vercel.app/purchase.html?show_confirm=1&order_id=' + finalOrderId,
        cancel_url: 'https://trading-damo-fresh.vercel.app/purchase.html?payment=cancel'
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(400).json({ error: data.message || 'Failed to create invoice', details: data });
    }

    // NOTE: NO AUTO CREDIT HERE
    // This API only returns invoice_url with QR.
    // Balance will be added ONLY after Admin approves in admin.html
    // Customer must upload: Email (top) + Screenshot box below Email

    return res.status(200).json(data);

  } catch (error) {
    console.error('Create Payment Error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}

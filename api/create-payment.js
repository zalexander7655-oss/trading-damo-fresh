// NOWPayments - Direct Binance Payment - Final with your key
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { price_amount, demo_amount } = req.body;

  // Your NOWPayments API Key - Added
  const NOWPAYMENTS_API_KEY = "FRQGZTK-47QMXKB-K2Z9WFR-7BWHGJH";
  const IPN_SECRET = "58Zpq5QI/BeytylKsU0tAsCSvx5atyn8";

  try {
    const response = await fetch('https://api.nowpayments.io/v1/invoice', {
      method: 'POST',
      headers: {
        'x-api-key': NOWPAYMENTS_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        price_amount: price_amount,
        price_currency: "usd",
        pay_currency: "usdtbsc",
        ipn_callback_url: `https://${req.headers.host}/api/ipn`,
        order_id: `DEMO_${Date.now()}_${demo_amount}`,
        order_description: `Buy $${demo_amount} Demo for $${price_amount}`,
        success_url: `https://${req.headers.host}/main.html?payment=success&demo=${demo_amount}`,
        cancel_url: `https://${req.headers.host}/purchase.html?payment=cancel`
      })
    });

    const data = await response.json();
    
    if(data.id){
      console.log("Invoice Created:", data.id);
    }
    
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

import crypto from 'crypto';
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const sig = req.headers['x-nowpayments-sig'];
  const secret = process.env.NOWPAYMENTS_IPN_SECRET;
  const hmac = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');

  if (hmac!== sig) return res.status(400).send('Invalid sig');

  const { payment_status, order_id, order_description } = req.body;

  if (payment_status === 'finished' || payment_status === 'confirmed') {
    // order_id = DEMO_email_timestamp_amount
    const email = order_id.split('_')[1] || order_description.replace('Demo for ','');

    // Approved list me daal do
    await kv.sadd('approved_users', email);
    await kv.set(`user:${email}`, { plan: '2000', paid_at: new Date() });
    console.log('Approved:', email);
  }

  return res.status(200).send('OK');
}

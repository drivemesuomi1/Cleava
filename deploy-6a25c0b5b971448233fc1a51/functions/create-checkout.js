// create-checkout.js
// Creates a Stripe Checkout session for gift card purchases
// POST { package, amount, buyer_name, buyer_email, buyer_phone,
//        recipient_name, message, delivery, recipient_email, voucher_code, expiry }

const https = require('https');

function stripeRequest(path, body) {
  return new Promise((resolve, reject) => {
    const postData = new URLSearchParams(body).toString();
    const req = https.request({
      hostname: 'api.stripe.com',
      path,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
      },
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: JSON.parse(data) }));
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };

  let data;
  try { data = JSON.parse(event.body); }
  catch { return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON' }) }; }

  const { package: pkg, amount, buyer_name, buyer_email, buyer_phone,
          recipient_name, message, delivery, recipient_email,
          voucher_code, expiry } = data;

  if (!amount || amount < 1) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid amount' }) };
  }

  const baseUrl = process.env.SITE_URL || 'https://cleava.fi';

  // Build metadata for the webhook
  const metadata = {
    type: 'lahjakortti',
    voucher_code: voucher_code || '',
    package: pkg || '',
    buyer_name: buyer_name || '',
    buyer_email: buyer_email || '',
    buyer_phone: buyer_phone || '',
    recipient_name: recipient_name || '',
    message: (message || '').substring(0, 500),
    delivery: delivery || 'buyer',
    recipient_email: recipient_email || '',
    expiry: expiry || '',
    send_to_email: (delivery === 'recipient' && recipient_email) ? recipient_email : buyer_email,
  };

  // Create Stripe Checkout session
  const sessionBody = {
    'payment_method_types[0]': 'card',
    'payment_method_types[1]': 'mobilepay',
    'line_items[0][price_data][currency]': 'eur',
    'line_items[0][price_data][product_data][name]': `Cleava Lahjakortti – ${pkg || amount + '€'}`,
    'line_items[0][price_data][product_data][description]': `Voimassa 12 kuukautta. Koodi: ${voucher_code}`,
    'line_items[0][price_data][product_data][images][0]': 'https://cleava.fi/assets/logo.png',
    'line_items[0][price_data][unit_amount]': String(Math.round(amount * 100)), // cents
    'line_items[0][quantity]': '1',
    'mode': 'payment',
    'customer_email': buyer_email || '',
    'success_url': `${baseUrl}/kiitos?session_id={CHECKOUT_SESSION_ID}`,
    'cancel_url': `${baseUrl}/lahjakortti`,
    'locale': 'fi',
    'submit_type': 'pay',
    // Pass all metadata for webhook processing
    ...Object.fromEntries(
      Object.entries(metadata).map(([k, v]) => [`metadata[${k}]`, v])
    ),
  };

  try {
    const result = await stripeRequest('/v1/checkout/sessions', sessionBody);

    if (result.status !== 200) {
      console.error('Stripe error:', result.body);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: result.body.error?.message || 'Stripe error' }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ url: result.body.url }),
    };
  } catch (err) {
    console.error('Error:', err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Server error' }) };
  }
};

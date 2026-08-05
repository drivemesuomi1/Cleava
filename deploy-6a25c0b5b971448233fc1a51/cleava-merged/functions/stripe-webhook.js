// stripe-webhook.js
// Listens for Stripe payment confirmation and auto-sends gift card via Zapier

const https = require('https');
const crypto = require('crypto');

function postToZapier(url, data) {
  return new Promise((resolve, reject) => {
    if (!url) return resolve({});
    const body = JSON.stringify(data);
    const u = new URL(url);
    const req = https.request({
      hostname: u.hostname,
      path: u.pathname + u.search,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
    }, res => { let d = ''; res.on('data', c => d += c); res.on('end', () => resolve({ status: res.statusCode })); });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function ts() {
  return new Date().toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' });
}

function wrap(headerBg, badge, badgeColor, icon, title, subtitle, body) {
  return `<!DOCTYPE html><html lang="fi"><head><meta charset="UTF-8">
<style>*{margin:0;padding:0;box-sizing:border-box;}body{background:#f0f4f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;}
.wrap{padding:32px 16px;}.card{max-width:580px;margin:0 auto;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.10);}
.hdr{background:${headerBg};padding:28px 32px;}.hdr-top{display:flex;align-items:center;gap:14px;margin-bottom:16px;}
.hdr-logo{font-size:13px;font-weight:800;color:#fff;letter-spacing:.12em;opacity:.9;}
.hdr-badge{background:${badgeColor};color:#fff;font-size:10px;font-weight:800;padding:3px 10px;border-radius:999px;letter-spacing:.08em;margin-left:auto;}
.hdr-title{font-size:22px;font-weight:700;color:#fff;line-height:1.2;}.hdr-sub{font-size:13px;color:rgba(255,255,255,.6);margin-top:4px;}
.body{background:#fff;padding:28px 32px;}
.row{display:flex;margin-bottom:1px;}.row-label{font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.07em;width:140px;flex-shrink:0;padding:12px 0;}
.row-val{font-size:14px;font-weight:600;color:#0f172a;padding:12px 0 12px 16px;flex:1;}.row-val a{color:#1d4ed8;}
.divider{height:1px;background:#f1f5f9;margin:0;}
.price-box{background:#0a1628;border-radius:12px;padding:28px;text-align:center;margin:0 0 20px;}
.voucher-box{background:#fff;border-radius:10px;padding:20px;text-align:center;margin:20px 0;}
.voucher-code{font-size:28px;font-weight:800;color:#0a1628;font-family:monospace;letter-spacing:.15em;}
.alert-blue{background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:16px 18px;margin-top:20px;}
.alert-green{background:#f0fdf4;border:1px solid #86efac;border-radius:10px;padding:16px 18px;margin-top:20px;}
.ftr{background:#f8fafc;border-top:1px solid #e2e8f0;padding:16px 32px;display:flex;justify-content:space-between;}
.ftr-text{font-size:11px;color:#94a3b8;}
</style></head><body><div class="wrap"><div class="card">
<div class="hdr"><div class="hdr-top"><div class="hdr-logo">CLEAVA</div><div class="hdr-badge" style="background:${badgeColor};">${badge}</div></div>
<div style="font-size:28px;margin-bottom:10px;">${icon}</div>
<div class="hdr-title">${title}</div><div class="hdr-sub">${subtitle}</div></div>
<div class="body">${body}</div>
<div class="ftr"><div class="ftr-text">cleava.fi &middot; 045 187 8083 &middot; info@cleava.fi</div><div class="ftr-text">${ts()}</div></div>
</div></div></body></html>`;
}

function row(label, value, blue) {
  return `<div class="row"><div class="row-label">${label}</div><div class="row-val"${blue ? ' style="color:#1d4ed8;"' : ''}>${value || '—'}</div></div><div class="divider"></div>`;
}

// Internal notification to Cleava team
function internalEmail(m, amount) {
  return wrap('#0a1628', 'MAKSETTU ✓', 'rgba(52,211,153,.5)', '💰',
    `Lahjakortti maksettu — ${amount}€`,
    `${m.buyer_name} · ${m.voucher_code}`,
    `<div class="alert-green"><strong style="color:#15803d;">✅ Maksu vahvistunut Stripessä!</strong><br><span style="color:#166534;font-size:13px;">Lahjakortti on lähetetty automaattisesti sähköpostiin.</span></div>` +
    `<div style="margin-top:16px;">` +
    row('Ostaja', m.buyer_name) +
    row('Sähköposti', `<a href="mailto:${m.buyer_email}">${m.buyer_email}</a>`, true) +
    row('Paketti', m.package) +
    row('Arvo', `<strong>${amount}€</strong>`) +
    row('Voucher-koodi', `<span style="font-family:monospace;font-size:15px;color:#1d4ed8;">${m.voucher_code}</span>`, true) +
    row('Toimitettu', m.send_to_email, true) +
    row('Voimassa', m.expiry) +
    (m.recipient_name ? row('Saaja', m.recipient_name) : '') +
    (m.message ? row('Viesti', `<em>${m.message}</em>`) : '') +
    `</div>`
  );
}

// Gift card voucher to customer
function voucherEmail(m, amount) {
  return wrap('#0a1628', 'LAHJAKORTTI', 'rgba(251,191,36,.5)', '🎁',
    'Cleava Lahjakortti',
    `${m.package} · ${amount}€`,
    `<div class="price-box">
      <div style="font-size:11px;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px;">Lahjakortin arvo</div>
      <div style="font-size:52px;font-weight:800;color:#60a5fa;line-height:1;">${amount}€</div>
      <div style="font-size:14px;color:rgba(255,255,255,.6);margin-top:6px;">${m.package}</div>
    </div>
    <div class="voucher-box" style="background:#f8fafc;border-radius:12px;padding:24px;text-align:center;margin-bottom:20px;">
      <div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px;">Voucher-koodi</div>
      <div class="voucher-code">${m.voucher_code}</div>
      <div style="font-size:12px;color:#94a3b8;margin-top:10px;">Voimassa: ${m.expiry}</div>
    </div>` +
    (m.recipient_name ? `<p style="font-size:16px;font-weight:600;color:#0f172a;margin-bottom:12px;">Hei ${m.recipient_name}! 👋</p>` : '') +
    (m.message ? `<div style="background:#f8fafc;border-left:3px solid #1d4ed8;border-radius:0 8px 8px 0;padding:14px 16px;margin-bottom:16px;font-style:italic;color:#475569;">"${m.message}"</div>` : '') +
    `<div class="alert-blue">
      <p style="font-size:13px;color:#1e40af;line-height:1.7;margin:0;">
        Käytä lahjakorttia mainitsemalla koodi <strong>${m.voucher_code}</strong> varatessasi siivouksen:<br>
        📞 <a href="tel:+358451878083" style="color:#1d4ed8;">045 187 8083</a> &nbsp;·&nbsp;
        ✉️ <a href="mailto:info@cleava.fi" style="color:#1d4ed8;">info@cleava.fi</a><br>
        🌐 <a href="https://cleava.fi" style="color:#1d4ed8;">cleava.fi</a><br>
        <span style="font-size:11px;color:#3b82f6;">Käy kaikkiin Cleava-palveluihin. Ei voi vaihtaa rahaksi.</span>
      </p>
    </div>`
  );
}


// ─── BUYER ORDER CONFIRMATION (always sent to buyer) ─────────────────────────
function buyerConfirmEmail(m, amount) {
  return wrap('#1d4ed8', 'TILAUSVAHVISTUS', 'rgba(255,255,255,.25)', '✅',
    'Tilauksesi on vastaanotettu!',
    `Hei ${m.buyer_name}! Maksusi on vahvistunut.`,
    `<div style="background:#f8fafc;border-radius:10px;padding:20px;margin-bottom:16px;">` +
    row('Paketti', m.package) +
    row('Arvo', `<strong>${amount}€</strong>`) +
    row('Voucher-koodi', `<span style="font-family:monospace;font-size:15px;color:#1d4ed8;">${m.voucher_code}</span>`, true) +
    row('Toimitettu', m.send_to_email, true) +
    row('Voimassa', m.expiry) +
    `</div>` +
    `<div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:14px 16px;font-size:13px;color:#1e40af;line-height:1.7;">
      Lahjakortti on lähetetty osoitteeseen <strong>${m.send_to_email}</strong>.<br>
      Kysymyksiä? <a href="tel:+358451878083" style="color:#1d4ed8;">045 187 8083</a> · <a href="mailto:info@cleava.fi" style="color:#1d4ed8;">info@cleava.fi</a>
    </div>`
  );
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  const sig = event.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  // Handle base64-encoded body from Netlify
  const rawBody = event.isBase64Encoded 
    ? Buffer.from(event.body, 'base64').toString('utf8')
    : event.body;

  // Verify Stripe signature
  if (webhookSecret && sig) {
    try {
      const elements = sig.split(',');
      const tElement = elements.find(e => e.startsWith('t='));
      const v1Element = elements.find(e => e.startsWith('v1='));
      if (!tElement || !v1Element) throw new Error('Missing signature elements');
      const timestamp = tElement.slice(2);
      const signedPayload = `${timestamp}.${rawBody}`;
      const expected = crypto.createHmac('sha256', webhookSecret).update(signedPayload, 'utf8').digest('hex');
      const received = v1Element.slice(3);
      if (expected !== received) {
        console.error('Stripe sig mismatch. Expected:', expected, 'Got:', received);
        return { statusCode: 400, body: JSON.stringify({ error: 'Invalid signature' }) };
      }
    } catch (err) {
      console.error('Sig verification error:', err.message);
      return { statusCode: 400, body: JSON.stringify({ error: 'Signature verification failed: ' + err.message }) };
    }
  } else {
    console.warn('No webhook secret or signature — skipping verification');
  }

  let stripeEvent;
  try { stripeEvent = JSON.parse(rawBody); }
  catch { return { statusCode: 400, body: 'Invalid JSON' }; }

  if (stripeEvent.type !== 'checkout.session.completed') {
    return { statusCode: 200, body: 'Ignored' };
  }

  const session = stripeEvent.data.object;
  const m = session.metadata || {};
  const amount = Math.round(session.amount_total / 100); // convert from cents

  const ZAPIER_GIFTCARD = process.env.ZAPIER_GIFTCARD_WEBHOOK || 'https://hooks.zapier.com/hooks/catch/27371819/uvs4oy7/';

  // Send to Zapier — both internal notification and voucher
  // Voucher email for recipient (or buyer if same)
  const voucher = voucherEmail(m, amount);
  
  // Buyer confirmation email (always sent to buyer)
  const buyerConfirmation = buyerConfirmEmail(m, amount);

  await postToZapier(ZAPIER_GIFTCARD, {
    ...m,
    amount,
    payment_status: 'paid',
    stripe_session_id: session.id,
    timestamp: ts(),
    html_internal: internalEmail(m, amount),
    html_invoice: voucher,
    // Extra field: buyer always gets a confirmation
    html_buyer_confirmation: buyerConfirmation,
    buyer_gets_separate_confirm: (m.delivery === 'recipient' && m.recipient_email) ? 'yes' : 'no',
  });

  console.log(`✓ Gift card processed: ${m.voucher_code} for ${m.buyer_email}`);
  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};

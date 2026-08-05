const https = require('https');

const ZAPIER_LEAD     = process.env.ZAPIER_LEAD_WEBHOOK     || 'https://hooks.zapier.com/hooks/catch/27371819/uvs268b/';
const ZAPIER_BOOKING  = process.env.ZAPIER_BOOKING_WEBHOOK  || 'https://hooks.zapier.com/hooks/catch/27371819/uvsuor7/';
const ZAPIER_GIFTCARD = process.env.ZAPIER_GIFTCARD_WEBHOOK || 'https://hooks.zapier.com/hooks/catch/27371819/uvs4oy7/';

const SVC = {
  kotisiivous:'Kotisiivous',muuttosiivous:'Muuttosiivous',toimistosiivous:'Toimistosiivous',
  ikkunanpesu:'Ikkunanpesu',suursiivous:'Suursiivous',erikoissiivous:'Erikoissiivous',porrassiivous:'Porrassiivous'
};

function post(url, data) {
  return new Promise((res,rej) => {
    if (!url) return res({});
    const body = JSON.stringify(data);
    const u = new URL(url);
    const req = https.request({hostname:u.hostname,path:u.pathname+u.search,method:'POST',
      headers:{'Content-Type':'application/json','Content-Length':Buffer.byteLength(body)}
    }, r => { let d=''; r.on('data',c=>d+=c); r.on('end',()=>res({status:r.statusCode})); });
    req.on('error',rej); req.write(body); req.end();
  });
}

function ts() {
  return new Date().toLocaleString('fi-FI',{timeZone:'Europe/Helsinki'});
}

const CSS = `
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{background:#eef2f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;}
.w{padding:28px 16px;}
.c{max-width:560px;margin:0 auto;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.13);}
.hdr{padding:26px 28px;}
.ht{display:flex;align-items:center;margin-bottom:18px;}
.logo{font-size:11px;font-weight:800;color:rgba(255,255,255,.75);letter-spacing:.14em;}
.badge{font-size:9px;font-weight:800;padding:3px 9px;border-radius:999px;margin-left:auto;letter-spacing:.06em;}
.hi{font-size:24px;margin-bottom:10px;}
.htitle{font-size:20px;font-weight:700;color:#ffffff;line-height:1.25;}
.hsub{font-size:12.5px;color:rgba(255,255,255,.55);margin-top:5px;}
.body{background:#ffffff;padding:24px 28px;}
.row{display:flex;align-items:baseline;padding:11px 0;border-bottom:1px solid #f0f4f8;}
.rl{font-size:10.5px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.07em;width:130px;flex-shrink:0;}
.rv{font-size:14px;font-weight:600;color:#1e293b;padding-left:14px;flex:1;line-height:1.4;}
.rv a{color:#1d4ed8;text-decoration:none;}
.rv-blue{color:#1d4ed8;}
.rv-red{color:#dc2626;font-weight:700;}
.pbox{background:#0a1628;border-radius:12px;padding:24px 20px;text-align:center;margin-bottom:18px;}
.pl{font-size:10px;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px;}
.pa{font-size:46px;font-weight:800;color:#60a5fa;line-height:1;}
.ps{font-size:13px;color:rgba(255,255,255,.55);margin-top:7px;}
.vbox{background:rgba(255,255,255,.09);border-radius:8px;padding:13px;margin-top:14px;}
.vl{font-size:9px;color:rgba(255,255,255,.35);text-transform:uppercase;letter-spacing:.09em;margin-bottom:5px;}
.vc{font-size:19px;font-weight:800;color:#ffffff;font-family:'Courier New',monospace;letter-spacing:.1em;}
.ay{background:#fefce8;border:1px solid #fde68a;border-radius:8px;padding:13px 15px;margin-top:16px;font-size:13px;color:#854d0e;line-height:1.7;}
.ab{background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:13px 15px;margin-top:16px;font-size:13px;color:#1e40af;line-height:1.7;}
.ftr{background:#f8fafc;border-top:1px solid #e8edf2;padding:13px 28px;display:flex;justify-content:space-between;align-items:center;}
.ft{font-size:10.5px;color:#94a3b8;}
</style>`;

function wrap(bg, badge, badgeColor, icon, title, subtitle, body) {
  return `<!DOCTYPE html><html lang="fi"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">${CSS}</head>
<body><div class="w"><div class="c">
<div class="hdr" style="background:${bg}">
  <div class="ht"><span class="logo">CLEAVA</span><span class="badge" style="background:${badgeColor};color:#fff;">${badge}</span></div>
  <div class="hi">${icon}</div>
  <div class="htitle">${title}</div>
  <div class="hsub">${subtitle}</div>
</div>
<div class="body">${body}</div>
<div class="ftr"><span class="ft">cleava.fi &middot; 045&thinsp;187&thinsp;8083 &middot; info@cleava.fi</span><span class="ft">${ts()}</span></div>
</div></div></body></html>`;
}

function row(l, v, cls) {
  return `<div class="row"><div class="rl">${l}</div><div class="rv ${cls||''}">${v||'—'}</div></div>`;
}

// ── LEAD ─────────────────────────────────────────────────────────────────────
function leadHtml(d) {
  const svc = SVC[d.service]||d.service||'—';
  return wrap('#0a1628','LEAD','rgba(96,165,250,.5)','🔔',
    'Uusi tarjouspyyntö',`${svc} &middot; ${d.zip||''}`,
    row('Palvelu', svc) +
    row('Postinumero', d.zip) +
    row('Puhelin', d.phone?`<a href="tel:${d.phone}">${d.phone}</a>`:'—','rv-blue') +
    row('Lähde', d.source||'—') +
    `<div class="ay"><strong>⚡ Soita saman päivän aikana!</strong><br>Nopea vastaus = enemmän tilauksia.</div>`
  );
}

// ── BOOKING INTERNAL ──────────────────────────────────────────────────────────
function bookingInternalHtml(d) {
  const svc = SVC[d.service]||d.service||'—';
  const extras = ['extra_oven','extra_fridge','extra_balcony','extra_cabinets']
    .filter(k=>d[k]==='yes')
    .map(k=>({extra_oven:'Uuni',extra_fridge:'Jääkaappi',extra_balcony:'Parveke',extra_cabinets:'Kaapit'}[k]))
    .join(' · ')||'—';
  return wrap('#0a1628','TILAUS','rgba(52,211,153,.45)','📋',
    `Uusi tilaus — ${svc}`,`${d.name||''} &middot; ${d.city||''}`,
    row('Nimi', d.name) +
    row('Sähköposti', d.email?`<a href="mailto:${d.email}">${d.email}</a>`:'—') +
    row('Puhelin', d.phone?`<a href="tel:${d.phone}">${d.phone}</a>`:'—','rv-blue') +
    row('Palvelu', svc) +
    row('Tyyppi', d.cleaning_type==='recurring'?'Säännöllinen':'Kertaluonteinen') +
    row('Osoite', `${d.address||'—'}, ${d.city||'—'}`) +
    row('Koko', d.size?`${d.size} m²`:'—') +
    row('Toivottu aika', (d.date&&d.time)?`${d.date} klo ${d.time}`:'—','rv-blue') +
    row('Lisäpalvelut', extras) +
    (d.notes?row('Lisätiedot', d.notes):'')
  );
}

// ── BOOKING CUSTOMER ──────────────────────────────────────────────────────────
function bookingCustomerHtml(d) {
  const svc = SVC[d.service]||d.service||'—';
  return wrap('#1d4ed8','VAHVISTUS','rgba(255,255,255,.25)','✅',
    'Tilauksesi on vastaanotettu!',`Hei ${d.name||''}! Otamme yhteyttä pian.`,
    row('Palvelu', svc) +
    row('Osoite', `${d.address||'—'}, ${d.city||'—'}`) +
    row('Toivottu aika', (d.date&&d.time)?`${d.date} klo ${d.time}`:'—','rv-blue') +
    `<div class="ab">Kysymyksiä? <strong><a href="tel:+358451878083" style="color:#1d4ed8;">045 187 8083</a></strong> tai <strong><a href="mailto:info@cleava.fi" style="color:#1d4ed8;">info@cleava.fi</a></strong><br><span style="font-size:11.5px;color:#3b82f6;">Asiakaspalvelu: Ma–Pe 8–18, La–Su 12–16</span></div>`
  );
}

// ── GIFTCARD INTERNAL ─────────────────────────────────────────────────────────
function giftcardInternalHtml(d) {
  const amt = String(d.amount||'?');
  const pkg = d.package||'—';
  return wrap('#0a1628','LAHJAKORTTI','rgba(251,191,36,.5)','🎁',
    'Uusi lahjakorttitilaus',`${d.buyer_name||''} &middot; ${pkg} &middot; ${amt}€`,
    `<div class="pbox">
      <div class="pl">Tilauksen arvo</div>
      <div class="pa">${amt}€</div>
      <div class="ps">${pkg}</div>
      <div class="vbox"><div class="vl">Voucher-koodi</div><div class="vc">${d.voucher_code||'—'}</div></div>
    </div>` +
    row('Ostaja', d.buyer_name) +
    row('Sähköposti', `<a href="mailto:${d.buyer_email}">${d.buyer_email}</a>`,'rv-blue') +
    row('Puhelin', d.buyer_phone||'—') +
    row('Saaja', d.recipient_name||'—') +
    row('Toimitus', d.send_to_email||d.buyer_email||'—','rv-blue') +
    row('Voimassa', d.expiry||'—') +
    (d.message?row('Viesti',`<em>${d.message}</em>`):'') +
    `<div class="ay"><strong>Toimenpiteet:</strong><br>
     1. Lasku lähetetty automaattisesti → <strong>${d.buyer_email||'—'}</strong><br>
     2. Kun maksu vahvistunut → lähetä lahjakortti → <strong>${d.send_to_email||d.buyer_email||'—'}</strong><br>
     3. Koodi: <strong style="font-family:monospace;">${d.voucher_code||'—'}</strong></div>`
  );
}

// ── GIFTCARD INVOICE (to buyer) ───────────────────────────────────────────────
function giftcardInvoiceHtml(d) {
  const amt = String(d.amount||'?');
  const pkg = d.package||'—';
  const due = new Date(); due.setDate(due.getDate()+7);
  const dueStr = due.toLocaleDateString('fi-FI');
  return wrap('#0a1628','LASKU','rgba(251,191,36,.5)','🧾',
    `Lahjakorttitilaus — ${amt}€`,`Hei ${d.buyer_name||''}! Alla ovat maksutiedot.`,
    `<div class="pbox">
      <div class="pl">Maksettava summa</div>
      <div class="pa">${amt}€</div>
      <div class="ps">${pkg}</div>
      <div class="vbox"><div class="vl">Käytä tätä maksuviitteenä</div><div class="vc">${d.voucher_code||'—'}</div></div>
    </div>` +
    row('Saaja', 'Bloomhive Oy') +
    row('Eräpäivä', `<span class="rv-red">${dueStr}</span>`) +
    row('Viite', `<span style="font-family:monospace;font-size:15px;color:#1d4ed8;">${d.voucher_code||'—'}</span>`) +
    `<div class="ab">Lähetä maksu viitteellä <strong>${d.voucher_code||'—'}</strong>.<br>
     IBAN-tiedot: <a href="mailto:info@cleava.fi" style="color:#1d4ed8;">info@cleava.fi</a> &nbsp;·&nbsp; <a href="tel:+358451878083" style="color:#1d4ed8;">045 187 8083</a><br>
     <span style="font-size:11.5px;color:#3b82f6;">Lahjakortti lähetetään heti maksun vahvistuttua.</span></div>`
  );
}

// ── PDF VOUCHER (base64 encoded HTML → Zapier can email as attachment or inline) ──
function giftcardVoucherHtml(d) {
  const amt = String(d.amount||'?');
  const pkg = d.package||'—';
  return `<!DOCTYPE html><html lang="fi">
<head><meta charset="UTF-8"><style>
body{margin:0;padding:0;font-family:Georgia,serif;background:#fff;}
.page{width:600px;margin:0 auto;padding:48px 40px;}
.hdr{background:#0a1628;border-radius:12px;padding:36px;text-align:center;margin-bottom:32px;}
.hdr-logo{font-size:11px;font-weight:700;color:rgba(255,255,255,.55);letter-spacing:.2em;margin-bottom:16px;}
.hdr-title{font-size:28px;font-weight:400;color:#fff;letter-spacing:.05em;margin-bottom:4px;}
.hdr-sub{font-size:13px;color:rgba(255,255,255,.5);}
.amount{font-size:64px;font-weight:700;color:#60a5fa;line-height:1;text-align:center;margin:24px 0 8px;}
.pkg{font-size:16px;color:rgba(255,255,255,.65);text-align:center;margin-bottom:24px;}
.code-box{background:rgba(255,255,255,.1);border-radius:10px;padding:20px;text-align:center;}
.code-label{font-size:10px;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:.12em;margin-bottom:8px;}
.code{font-size:26px;font-weight:700;color:#fff;font-family:'Courier New',monospace;letter-spacing:.15em;}
.expiry{font-size:11px;color:rgba(255,255,255,.35);margin-top:10px;}
.msg-box{background:#f8fafc;border-radius:10px;padding:20px 24px;margin-bottom:24px;font-style:italic;color:#475569;border-left:3px solid #1d4ed8;font-size:14px;line-height:1.7;}
.services{margin-bottom:24px;}
.services h3{font-size:13px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px;}
.services ul{list-style:none;padding:0;}
.services li{font-size:14px;color:#334155;padding:5px 0;border-bottom:1px solid #f1f5f9;}
.services li::before{content:"✓  ";color:#1d4ed8;font-weight:700;}
.footer{text-align:center;padding-top:20px;border-top:1px solid #e2e8f0;}
.footer p{font-size:12px;color:#94a3b8;line-height:1.8;}
.footer a{color:#1d4ed8;text-decoration:none;}
</style></head>
<body><div class="page">
  <div class="hdr">
    <div class="hdr-logo">CLEAVA SIIVOUSPALVELUT</div>
    <div class="hdr-title">Lahjakortti</div>
    <div class="hdr-sub">Puhdas koti lahjaksi</div>
    <div class="amount">${amt}€</div>
    <div class="pkg">${pkg}</div>
    <div class="code-box">
      <div class="code-label">Voucher-koodi</div>
      <div class="code">${d.voucher_code||'—'}</div>
      <div class="expiry">Voimassa: ${d.expiry||'—'}</div>
    </div>
  </div>
  ${d.recipient_name?`<p style="font-size:16px;color:#0f172a;margin-bottom:16px;">Hei <strong>${d.recipient_name}</strong>! 👋</p>`:''}
  ${d.message?`<div class="msg-box">"${d.message}"</div>`:''}
  <div class="services">
    <h3>Käy kaikkiin palveluihin</h3>
    <ul>
      <li>Kotisiivous</li><li>Muuttosiivous</li>
      <li>Ikkunanpesu</li><li>Suursiivous</li>
    </ul>
  </div>
  <div class="footer">
    <p>
      Varaa siivous koodillasi <strong>${d.voucher_code||'—'}</strong><br>
      📞 <a href="tel:+358451878083">045 187 8083</a> &nbsp;·&nbsp;
      ✉️ <a href="mailto:info@cleava.fi">info@cleava.fi</a> &nbsp;·&nbsp;
      🌐 <a href="https://cleava.fi">cleava.fi</a><br>
      <span style="font-size:11px;color:#cbd5e1;">Lahjakorttia ei voi vaihtaa rahaksi. Voimassa ${d.expiry||'—'} asti.</span>
    </p>
  </div>
</div></body></html>`;
}

// ── MAIN ─────────────────────────────────────────────────────────────────────
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return {statusCode:405,body:'Method Not Allowed'};
  let data;
  try { data = JSON.parse(event.body); } catch { return {statusCode:400,body:'Invalid JSON'}; }

  // GIFTCARD
  if (data.type === 'lahjakortti') {
    // Ensure amount is always a clean number
    const amount = Number(data.amount) || 100;
    data.amount = amount;
    data.send_to_email = (data.delivery==='recipient' && data.recipient_email)
      ? data.recipient_email : data.buyer_email;

    await post(ZAPIER_GIFTCARD, {
      ...data,
      amount,
      html_internal: giftcardInternalHtml(data),
      html_invoice:  giftcardInvoiceHtml(data),
      html_voucher:  giftcardVoucherHtml(data),
    });
    return {statusCode:200,body:JSON.stringify({ok:true,type:'lahjakortti'})};
  }

  // BOOKING
  if (data.name && data.address) {
    await post(ZAPIER_BOOKING, {
      ...data,
      html_internal: bookingInternalHtml(data),
      html_customer: bookingCustomerHtml(data),
      service_label: SVC[data.service]||data.service||'',
    });
    return {statusCode:200,body:JSON.stringify({ok:true,type:'booking'})};
  }

  // LEAD
  await post(ZAPIER_LEAD, {
    ...data,
    html_email: leadHtml(data),
    service_label: SVC[data.service]||data.service||'',
  });
  return {statusCode:200,body:JSON.stringify({ok:true,type:'lead'})};
};

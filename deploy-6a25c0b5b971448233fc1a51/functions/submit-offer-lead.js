const nodemailer = require('nodemailer');

const EMAIL_TO = process.env.LEADS_EMAIL_TO || process.env.EMAIL_TO_CLEAVA || leadCopyAddress(process.env.SMTP_USER);
const DIRECT_EMAIL_TO = process.env.LEADS_DIRECT_EMAIL_TO || leadCopyAddress(process.env.SMTP_USER);
const EMAIL_FROM = process.env.EMAIL_FROM_CLEAVA || 'info@cleava.fi';

const SVC = {
  kotisiivous:'Kotisiivous',muuttosiivous:'Muuttosiivous',toimistosiivous:'Toimistosiivous',
  ikkunanpesu:'Ikkunanpesu',suursiivous:'Suursiivous',erikoissiivous:'Erikoissiivous',porrassiivous:'Porrassiivous',
  booking_form:'Book cleaning form'
};

const SERVICE_LABELS = {
  fi: {
    kotisiivous:'Kotisiivous', muuttosiivous:'Muuttosiivous', toimistosiivous:'Toimistosiivous',
    ikkunanpesu:'Ikkunanpesu', suursiivous:'Suursiivous', erikoissiivous:'Erikoissiivous',
    porrassiivous:'Porrassiivous', booking_form:'Varauslomake'
  },
  en: {
    kotisiivous:'Home cleaning', muuttosiivous:'Moving cleaning', toimistosiivous:'Office cleaning',
    ikkunanpesu:'Window cleaning', suursiivous:'Deep cleaning', erikoissiivous:'Specialist cleaning',
    porrassiivous:'Stairwell cleaning', booking_form:'Booking form'
  }
};

const CUSTOMER_TEXT = {
  fi: {
    subjectLead:'Kiitos yhteydenotostasi - Cleava',
    subjectBooking:'Varauspyynt\u00f6si on vastaanotettu - Cleava',
    titleLead:'Kiitos yhteydenotostasi',
    titleBooking:'Varauspyynt\u00f6si on vastaanotettu',
    intro:'Olemme vastaanottaneet tietosi ja otamme sinuun yhteytt\u00e4 pian. T\u00e4ss\u00e4 ovat l\u00e4hett\u00e4m\u00e4si tiedot:',
    name:'Nimi',
    email:'S\u00e4hk\u00f6posti',
    phone:'Puhelin',
    service:'Palvelu',
    postal:'Postinumero',
    address:'Osoite',
    size:'Kodin koko',
    cleaningType:'Siivouksen tyyppi',
    time:'Toivottu aika',
    extras:'Lis\u00e4palvelut',
    message:'Lis\u00e4tiedot',
    source:'L\u00e4hde',
    oneTime:'Kertaluonteinen',
    recurring:'S\u00e4\u00e4nn\u00f6llinen',
    signature:'Yst\u00e4v\u00e4llisin terveisin'
  },
  en: {
    subjectLead:'We received your request - Cleava',
    subjectBooking:'We received your booking request - Cleava',
    titleLead:'Thank you for contacting Cleava',
    titleBooking:'Your booking request has been received',
    intro:'We have received your information and will get back to you shortly. Here is what you submitted:',
    name:'Name',
    email:'Email',
    phone:'Phone',
    service:'Service',
    postal:'Postal code',
    address:'Address',
    size:'Home size',
    cleaningType:'Cleaning type',
    time:'Preferred time',
    extras:'Extra services',
    message:'Message',
    source:'Source',
    oneTime:'One-time',
    recurring:'Recurring',
    signature:'Best regards'
  }
};

function leadCopyAddress(address) {
  if (!address) return '';
  const [local, domain] = address.split('@');
  if (!local || !domain) return address;
  const lowerDomain = domain.toLowerCase();
  if (lowerDomain === 'gmail.com' || lowerDomain === 'googlemail.com') {
    return `${local}+leads@${domain}`;
  }
  return address;
}

function smtpReady() {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS && EMAIL_FROM);
}

function success(type, results) {
  return JSON.stringify({
    ok: true,
    type,
    emailConfigured: smtpReady(),
    emailTo: EMAIL_TO,
    directEmailTo: DIRECT_EMAIL_TO,
    emailFrom: EMAIL_FROM,
    results,
  });
}

function mailer() {
  if (!smtpReady()) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function textSummary(type, d) {
  return [
    `Type: ${type}`,
    `Service: ${SVC[d.service] || d.service || '-'}`,
    `Name: ${d.name || d.buyer_name || '-'}`,
    `Email: ${d.email || d.buyer_email || '-'}`,
    `Phone: ${d.phone || d.buyer_phone || '-'}`,
    `Zip: ${d.zip || '-'}`,
    `Address: ${d.address || '-'}`,
    `City: ${d.city || '-'}`,
    `Date: ${d.date || '-'}`,
    `Time: ${d.time || '-'}`,
    `Source: ${d.source || '-'}`,
    `Message: ${d.message || d.notes || '-'}`,
    `Submitted: ${ts()}`,
  ].join('\n');
}

async function sendNotification(type, data, html) {
  const transport = mailer();
  if (!transport) return {skipped:true};
  const recipients = Array.from(new Set([
    ...String(EMAIL_TO).split(',').map(v => v.trim()),
    DIRECT_EMAIL_TO,
  ].filter(Boolean)));

  const service = SVC[data.service] || data.service || 'Quote';
  const marker = [data.zip, data.phone].filter(Boolean).join(' / ');
  const subject = type === 'booking'
    ? `Cleava: New booking - ${service}${marker ? ` (${marker})` : ''}`
    : type === 'lahjakortti'
      ? `Cleava: New gift card order${marker ? ` (${marker})` : ''}`
      : `Cleava: New quote request - ${service}${marker ? ` (${marker})` : ''}`;

  const info = await transport.sendMail({
    from: `"Cleava Website" <${EMAIL_FROM}>`,
    to: recipients,
    replyTo: data.email || data.buyer_email || undefined,
    subject,
    text: textSummary(type, data),
    html,
  });
  return {
    accepted: info.accepted,
    rejected: info.rejected,
    messageId: info.messageId,
    recipients,
    subject,
  };
}

function plain(value) {
  return String(value || '').trim();
}

function esc(value) {
  return plain(value).replace(/[&<>"']/g, (ch) => ({
    '&':'&amp;',
    '<':'&lt;',
    '>':'&gt;',
    '"':'&quot;',
    "'":'&#39;',
  }[ch]));
}

function langOf(data) {
  const raw = plain(data.lang || data.language).toLowerCase();
  if (raw.startsWith('en')) return 'en';
  const page = plain(data.page || data.path || data.referrer || data.source).toLowerCase();
  if (page.includes('/en/') || page.endsWith('/en') || page.includes('/blog/')) return 'en';
  return 'fi';
}

function labelForService(service, lang) {
  return SERVICE_LABELS[lang]?.[service] || SERVICE_LABELS.fi[service] || SVC[service] || service || '';
}

function customerAddress(data) {
  return plain(data.email || data.buyer_email);
}

function extrasText(data, lang) {
  const labels = lang === 'en'
    ? {extra_oven:'Oven', extra_fridge:'Fridge', extra_balcony:'Balcony', extra_cabinets:'Cabinets'}
    : {extra_oven:'Uuni', extra_fridge:'Jaakaappi', extra_balcony:'Parveke', extra_cabinets:'Kaapit'};
  return ['extra_oven','extra_fridge','extra_balcony','extra_cabinets']
    .filter((key) => data[key] === 'yes')
    .map((key) => labels[key])
    .join(', ');
}

function customerRows(type, data, lang) {
  const t = CUSTOMER_TEXT[lang];
  const rows = type === 'booking'
    ? [
        [t.name, data.name],
        [t.email, data.email],
        [t.phone, data.phone],
        [t.service, labelForService(data.service, lang)],
        [t.cleaningType, data.cleaning_type === 'recurring' ? t.recurring : data.cleaning_type ? t.oneTime : ''],
        [t.address, [data.address, data.city].filter(Boolean).join(', ')],
        [t.size, data.size ? `${data.size} m2` : ''],
        [t.time, [data.date, data.time].filter(Boolean).join(' ')],
        [t.extras, extrasText(data, lang)],
        [t.message, data.notes || data.message],
      ]
    : [
        [t.service, labelForService(data.service, lang)],
        [t.postal, data.zip],
        [t.email, data.email],
        [t.phone, data.phone],
      ];
  return rows.filter(([, value]) => plain(value));
}

function customerSubject(type, data, lang) {
  const t = CUSTOMER_TEXT[lang];
  return type === 'booking' ? t.subjectBooking : t.subjectLead;
}

function customerSignatureHtml(lang) {
  if (lang === 'en') {
    return `<span style="color:#334155!important;">Best regards,</span><br><br><span style="color:#334155!important;">--</span><br><strong style="color:#334155!important;">Laura K</strong><span style="color:#334155!important;"> | Service Manager</span><br><span style="color:#334155!important;">Cleava Cleaning Services</span><br><a style="color:#0284c7!important;" href="mailto:info@cleava.fi">info@cleava.fi</a><span style="color:#334155!important;"> | +358 45 187 8083 | </span><a style="color:#0284c7!important;" href="https://cleava.fi">cleava.fi</a><br><span style="color:#334155!important;">Business ID 3631044-9</span>`;
  }
  return `<span style="color:#334155!important;">Yst&auml;v&auml;llisin terveisin,</span><br><br><span style="color:#334155!important;">--</span><br><strong style="color:#334155!important;">Laura K</strong><span style="color:#334155!important;"> | Palveluvastaava</span><br><span style="color:#334155!important;">Cleava Siivouspalvelut</span><br><a style="color:#0284c7!important;" href="mailto:info@cleava.fi">info@cleava.fi</a><span style="color:#334155!important;"> | +358 45 187 8083 | </span><a style="color:#0284c7!important;" href="https://cleava.fi">cleava.fi</a><br><span style="color:#334155!important;">Y-tunnus 3631044-9</span>`;
}

function customerSignatureText(lang) {
  if (lang === 'en') {
    return `Best regards,\n\n--\nLaura K | Service Manager\nCleava Cleaning Services\ninfo@cleava.fi | +358 45 187 8083 | cleava.fi\nBusiness ID 3631044-9`;
  }
  return `Yst\u00e4v\u00e4llisin terveisin,\n\n--\nLaura K | Palveluvastaava\nCleava Siivouspalvelut\ninfo@cleava.fi | +358 45 187 8083 | cleava.fi\nY-tunnus 3631044-9`;
}

function customerText(type, data, lang) {
  const t = CUSTOMER_TEXT[lang];
  const title = type === 'booking' ? t.titleBooking : t.titleLead;
  const rows = customerRows(type, data, lang)
    .map(([label, value]) => `${label}: ${plain(value)}`)
    .join('\n');
  return `${title}\n\n${t.intro}\n\n${rows}\n\n${customerSignatureText(lang)}`;
}

function customerHtml(type, data) {
  const lang = langOf(data);
  const t = CUSTOMER_TEXT[lang];
  const title = type === 'booking' ? t.titleBooking : t.titleLead;
  const rows = customerRows(type, data, lang).map(([label, value]) => `
    <tr>
      <th style="background:#e0f2fe;color:#0f3f5c;text-align:left;padding:12px 14px;border-bottom:1px solid #dbeafe;font-size:13px;">${esc(label)}</th>
      <td style="padding:12px 14px;border-bottom:1px solid #e5edf7;color:#1e293b;font-size:14px;">${esc(value)}</td>
    </tr>`).join('');

  return `<!DOCTYPE html><html lang="${lang}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;background:#f0f9ff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:#142033;">
  <div style="padding:28px 14px;">
    <div style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 18px 50px rgba(14,116,144,.16);">
      <div style="background:linear-gradient(135deg,#0284c7,#0e7490);padding:30px 32px;color:#ffffff;">
        <div style="font-size:12px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;opacity:.82;">Cleava Siivouspalvelut</div>
        <h1 style="margin:18px 0 8px;font-size:26px;line-height:1.2;">${esc(title)}</h1>
        <p style="margin:0;color:rgba(255,255,255,.86);font-size:15px;line-height:1.6;">${esc(t.intro)}</p>
      </div>
      <div style="padding:26px 32px;">
        <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;border:1px solid #dbeafe;border-radius:12px;overflow:hidden;">${rows}</table>
        <div style="margin:28px 0 0;color:#334155!important;font-size:14px;line-height:1.75;">${customerSignatureHtml(lang)}</div>
      </div>
    </div>
  </div>
</body></html>`;
}

async function sendCustomerConfirmation(type, data) {
  const to = customerAddress(data);
  if (!to) return {skipped:true, reason:'no-customer-email'};
  const transport = mailer();
  if (!transport) return {skipped:true, reason:'smtp-not-configured'};
  const lang = langOf(data);
  const subject = customerSubject(type, data, lang);
  const info = await transport.sendMail({
    from: `"Cleava Siivouspalvelut" <${EMAIL_FROM}>`,
    to,
    subject,
    text: customerText(type, data, lang),
    html: customerHtml(type, data),
  });
  return {
    accepted: info.accepted,
    rejected: info.rejected,
    messageId: info.messageId,
    to,
    subject,
  };
}

async function settle(label, promise) {
  try {
    const result = await promise;
    return {[label]: !(result && result.skipped), [`${label}Details`]: result || null};
  } catch (err) {
    console.error(`${label} failed`, err);
    return {[label]: false};
  }
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
.rv a{color:#0284c7;text-decoration:none;}
.rv-blue{color:#0284c7;}
.rv-red{color:#dc2626;font-weight:700;}
.pbox{background:#155e75;border-radius:12px;padding:24px 20px;text-align:center;margin-bottom:18px;}
.pl{font-size:10px;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px;}
.pa{font-size:46px;font-weight:800;color:#7dd3fc;line-height:1;}
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
  return wrap('#155e75','LEAD','rgba(125,211,252,.5)','🔔',
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
  const email = plain(d.email);
  const phone = plain(d.phone);
  const message = plain(d.notes || d.message);
  return wrap('#155e75','TILAUS','rgba(52,211,153,.45)','📋',
    `Uusi tilaus — ${svc}`,`${d.name||''} &middot; ${d.city||''}`,
    row('Nimi', d.name ? esc(d.name) : '—') +
    row('Sähköposti', email ? `<a href="mailto:${esc(email)}">${esc(email)}</a>` : '—') +
    row('Puhelin', phone ? `<a href="tel:${esc(phone)}">${esc(phone)}</a>` : '—','rv-blue') +
    row('Message', message ? esc(message) : '—')
  );
}

// ── BOOKING CUSTOMER ──────────────────────────────────────────────────────────
function bookingCustomerHtml(d) {
  const svc = SVC[d.service]||d.service||'—';
  return wrap('#0284c7','VAHVISTUS','rgba(255,255,255,.25)','✅',
    'Tilauksesi on vastaanotettu!',`Hei ${d.name||''}! Otamme yhteyttä pian.`,
    row('Palvelu', svc) +
    row('Osoite', `${d.address||'—'}, ${d.city||'—'}`) +
    row('Toivottu aika', (d.date&&d.time)?`${d.date} klo ${d.time}`:'—','rv-blue') +
    `<div class="ab">Kysymyksiä? <strong><a href="tel:+358451878083" style="color:#0284c7;">045 187 8083</a></strong> tai <strong><a href="mailto:info@cleava.fi" style="color:#0284c7;">info@cleava.fi</a></strong><br><span style="font-size:11.5px;color:#38bdf8;">Asiakaspalvelu: Ma–Pe 8–18, La–Su 12–16</span></div>`
  );
}

// ── GIFTCARD INTERNAL ─────────────────────────────────────────────────────────
function giftcardInternalHtml(d) {
  const amt = String(d.amount||'?');
  const pkg = d.package||'—';
  return wrap('#155e75','LAHJAKORTTI','rgba(251,191,36,.5)','🎁',
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
  return wrap('#155e75','LASKU','rgba(251,191,36,.5)','🧾',
    `Lahjakorttitilaus — ${amt}€`,`Hei ${d.buyer_name||''}! Alla ovat maksutiedot.`,
    `<div class="pbox">
      <div class="pl">Maksettava summa</div>
      <div class="pa">${amt}€</div>
      <div class="ps">${pkg}</div>
      <div class="vbox"><div class="vl">Käytä tätä maksuviitteenä</div><div class="vc">${d.voucher_code||'—'}</div></div>
    </div>` +
    row('Saaja', 'Mansio Group Oy') +
    row('Eräpäivä', `<span class="rv-red">${dueStr}</span>`) +
    row('Viite', `<span style="font-family:monospace;font-size:15px;color:#0284c7;">${d.voucher_code||'—'}</span>`) +
    `<div class="ab">Lähetä maksu viitteellä <strong>${d.voucher_code||'—'}</strong>.<br>
     IBAN-tiedot: <a href="mailto:info@cleava.fi" style="color:#0284c7;">info@cleava.fi</a> &nbsp;·&nbsp; <a href="tel:+358451878083" style="color:#0284c7;">045 187 8083</a><br>
     <span style="font-size:11.5px;color:#38bdf8;">Lahjakortti lähetetään heti maksun vahvistuttua.</span></div>`
  );
}

// ── PDF VOUCHER HTML ──
function giftcardVoucherHtml(d) {
  const amt = String(d.amount||'?');
  const pkg = d.package||'—';
  return `<!DOCTYPE html><html lang="fi">
<head><meta charset="UTF-8"><style>
body{margin:0;padding:0;font-family:Georgia,serif;background:#fff;}
.page{width:600px;margin:0 auto;padding:48px 40px;}
.hdr{background:#155e75;border-radius:12px;padding:36px;text-align:center;margin-bottom:32px;}
.hdr-logo{font-size:11px;font-weight:700;color:rgba(255,255,255,.55);letter-spacing:.2em;margin-bottom:16px;}
.hdr-title{font-size:28px;font-weight:400;color:#fff;letter-spacing:.05em;margin-bottom:4px;}
.hdr-sub{font-size:13px;color:rgba(255,255,255,.5);}
.amount{font-size:64px;font-weight:700;color:#7dd3fc;line-height:1;text-align:center;margin:24px 0 8px;}
.pkg{font-size:16px;color:rgba(255,255,255,.65);text-align:center;margin-bottom:24px;}
.code-box{background:rgba(255,255,255,.1);border-radius:10px;padding:20px;text-align:center;}
.code-label{font-size:10px;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:.12em;margin-bottom:8px;}
.code{font-size:26px;font-weight:700;color:#fff;font-family:'Courier New',monospace;letter-spacing:.15em;}
.expiry{font-size:11px;color:rgba(255,255,255,.35);margin-top:10px;}
.msg-box{background:#f8fafc;border-radius:10px;padding:20px 24px;margin-bottom:24px;font-style:italic;color:#475569;border-left:3px solid #0284c7;font-size:14px;line-height:1.7;}
.services{margin-bottom:24px;}
.services h3{font-size:13px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px;}
.services ul{list-style:none;padding:0;}
.services li{font-size:14px;color:#334155;padding:5px 0;border-bottom:1px solid #f1f5f9;}
.services li::before{content:"✓  ";color:#0284c7;font-weight:700;}
.footer{text-align:center;padding-top:20px;border-top:1px solid #e2e8f0;}
.footer p{font-size:12px;color:#94a3b8;line-height:1.8;}
.footer a{color:#0284c7;text-decoration:none;}
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

    const payload = {
      ...data,
      amount,
      html_internal: giftcardInternalHtml(data),
      html_invoice:  giftcardInvoiceHtml(data),
      html_voucher:  giftcardVoucherHtml(data),
    };
    const results = [await settle('email', sendNotification('lahjakortti', data, payload.html_internal))];
    return {statusCode:200,body:success('lahjakortti', results)};
  }

  // BOOKING
  if (data.type === 'booking' || data['form-name'] === 'booking' || (data.name && data.address)) {
    data.service = data.service || 'booking_form';
    data.source = data.source || 'booking-modal';
    data.notes = data.notes || data.message || '';
    const payload = {
      ...data,
      html_internal: bookingInternalHtml(data),
      html_customer: customerHtml('booking', data),
      service_label: SVC[data.service]||data.service||'',
    };
    const results = [
      await settle('email', sendNotification('booking', data, payload.html_internal)),
      await settle('customerEmail', sendCustomerConfirmation('booking', data)),
    ];
    return {statusCode:200,body:success('booking', results)};
  }

  // LEAD
  const payload = {
    ...data,
    html_email: leadHtml(data),
    service_label: SVC[data.service]||data.service||'',
  };
  const results = [
    await settle('email', sendNotification('lead', data, payload.html_email)),
    await settle('customerEmail', sendCustomerConfirmation('lead', data)),
  ];
  return {statusCode:200,body:success('lead', results)};
};

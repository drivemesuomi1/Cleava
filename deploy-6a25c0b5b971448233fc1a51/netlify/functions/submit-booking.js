const nodemailer = require("nodemailer");

// ─── Email Config (set these in Netlify Environment Variables) ───
// SMTP_HOST          = SMTP server (e.g. smtp.resend.com)
// SMTP_PORT          = 587
// SMTP_USER          = SMTP username (e.g. "resend" for Resend)
// SMTP_PASS          = SMTP password / API key
// EMAIL_TO_CLEAVA    = info@cleava.fi (cleaning company inbox)
// EMAIL_TO_ENVAIRE   = info@envaire.com (your inbox)
// EMAIL_FROM_CLEAVA  = info@cleava.fi (FROM address for customer emails)
// EMAIL_FROM_ENVAIRE = info@envaire.com (FROM address for notifications)

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch (e) {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  const {
    service_type,
    frequency,
    name,
    email,
    phone,
    address,
    zip,
    city,
    area,
    kotitalousvahennys,
    preferred_date_1,
    preferred_time_1,
    preferred_date_2,
    preferred_time_2,
    preferred_date_3,
    preferred_time_3,
    notes,
  } = data;

  // Build date+time display pairs
  const dateEntries = [];
  if(preferred_date_1) dateEntries.push({ date: preferred_date_1, time: preferred_time_1 || '' });
  if(preferred_date_2) dateEntries.push({ date: preferred_date_2, time: preferred_time_2 || '' });
  if(preferred_date_3) dateEntries.push({ date: preferred_date_3, time: preferred_time_3 || '' });

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: true,
      minVersion: "TLSv1.2",
    },
  });

  const fromCleava = `"Cleava" <${process.env.EMAIL_FROM_CLEAVA}>`;
  const fromEnvaire = `"Envaire" <${process.env.EMAIL_FROM_ENVAIRE}>`;

  // Build date+time HTML for emails
  const datePillsHTML = dateEntries.map((e, i) => 
    `<span style="display:inline-block;background:#002350;color:#fff;padding:8px 16px;border-radius:20px;font-size:13px;font-weight:600;margin:0 4px 6px 0;">${i+1}. toive: ${e.date} klo ${e.time}</span>`
  ).join('');

  const dateTableRows = dateEntries.map((e, i) =>
    `<tr><td style="padding:6px 0;color:#64748b;font-size:13px;">${i+1}. toive</td><td style="padding:6px 0;color:#1e293b;font-size:14px;font-weight:600;">${e.date} klo ${e.time}</td></tr>`
  ).join('');

  // ═══════════════════════════════════════════════════
  // 1) EMAIL TO CUSTOMER — Order Confirmation
  // ═══════════════════════════════════════════════════
  const customerHTML = `
<!DOCTYPE html>
<html lang="fi">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;margin-top:32px;margin-bottom:32px;box-shadow:0 4px 24px rgba(0,35,80,0.08);">
    <div style="background:#002350;padding:40px 32px;text-align:center;">
      <h1 style="color:#ffffff;font-size:28px;margin:0 0 8px;font-family:Georgia,serif;font-style:italic;">Kiitos tilauksestasi!</h1>
      <p style="color:#ffffff;font-size:14px;margin:0;">Olemme vastaanottaneet varauspyyntösi</p>
    </div>
    <div style="padding:32px;">
      <p style="font-size:16px;color:#334155;margin:0 0 24px;">Hei <strong>${name}</strong>,</p>
      <p style="font-size:15px;color:#334155;margin:0 0 24px;line-height:1.6;">
        Kiitos yhteydenotostasi! Olemme vastaanottaneet siivousvarauksesi ja otamme sinuun yhteyttä pian vahvistaaksemme lopullisen ajankohdan.
      </p>
      <div style="background:#f8fafc;border-radius:12px;padding:24px;margin-bottom:24px;border:1px solid #e2e8f0;">
        <h2 style="font-size:16px;color:#002350;margin:0 0 16px;border-bottom:2px solid #62cdd4;padding-bottom:8px;">Tilauksen tiedot</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#64748b;font-size:13px;width:140px;">Palvelu</td><td style="padding:8px 0;color:#1e293b;font-size:14px;font-weight:600;">${service_type}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;font-size:13px;">Tyyppi</td><td style="padding:8px 0;color:#1e293b;font-size:14px;font-weight:600;">${frequency}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;font-size:13px;">Osoite</td><td style="padding:8px 0;color:#1e293b;font-size:14px;font-weight:600;">${address}, ${zip} ${city}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;font-size:13px;">Pinta-ala</td><td style="padding:8px 0;color:#1e293b;font-size:14px;font-weight:600;">${area} m²</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;font-size:13px;">Kotitalousvähennys</td><td style="padding:8px 0;color:#1e293b;font-size:14px;font-weight:600;">${kotitalousvahennys ? "Kyllä" : "Ei"}</td></tr>
        </table>
      </div>
      <div style="background:#f0fdf9;border-radius:12px;padding:24px;margin-bottom:24px;border:1px solid #d1fae5;">
        <h2 style="font-size:16px;color:#002350;margin:0 0 16px;">📅 Toivotut päivämäärät ja ajat</h2>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">${datePillsHTML}</div>
      </div>
      ${notes ? `<div style="background:#fefce8;border-radius:12px;padding:20px;margin-bottom:24px;border:1px solid #fef08a;"><p style="margin:0 0 4px;font-size:13px;color:#92400e;font-weight:600;">Lisätiedot</p><p style="margin:0;font-size:14px;color:#78350f;">${notes}</p></div>` : ""}
      <p style="font-size:14px;color:#1e293b;line-height:1.6;margin:0 0 8px;">
        Otamme sinuun yhteyttä <strong>24 tunnin</strong> kuluessa sopivan ajankohdan vahvistamiseksi.
      </p>
    </div>
    <div style="background:#f8fafc;padding:24px 32px;text-align:center;border-top:1px solid #e2e8f0;">
      <p style="margin:0 0 4px;font-size:13px;color:#64748b;">Cleava</p>
      <p style="margin:0;font-size:12px;color:#94a3b8;">Tämä on automaattinen viesti. Älä vastaa tähän sähköpostiin.</p>
    </div>
  </div>
</body>
</html>`;

  // ═══════════════════════════════════════════════════
  // 2) EMAIL TO CLEAVA — New Order Notification
  // ═══════════════════════════════════════════════════
  const cleavaHTML = `
<!DOCTYPE html>
<html lang="fi">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;margin-top:32px;margin-bottom:32px;box-shadow:0 4px 24px rgba(0,35,80,0.08);">
    <div style="background:#002350;padding:40px 32px;text-align:center;">
      <h1 style="color:#ffffff;font-size:24px;margin:0 0 8px;font-family:Georgia,serif;font-style:italic;">Uusi siivousvaraus!</h1>
      <p style="color:#ffffff;font-size:14px;margin:0;">Envaire-varausjärjestelmän kautta</p>
    </div>
    <div style="padding:32px;">
      <div style="background:#dbeafe;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
        <p style="margin:0;font-size:14px;color:#1e40af;font-weight:600;">🔔 Sinulle on tullut uusi varaus verkkosivujen kautta!</p>
      </div>
      <h3 style="font-size:15px;color:#002350;margin:0 0 12px;">Asiakkaan tiedot</h3>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr><td style="padding:6px 0;color:#64748b;font-size:13px;width:130px;">Nimi</td><td style="padding:6px 0;color:#1e293b;font-size:14px;font-weight:600;">${name}</td></tr>
        <tr><td style="padding:6px 0;color:#64748b;font-size:13px;">Sähköposti</td><td style="padding:6px 0;color:#1e293b;font-size:14px;font-weight:600;">${email}</td></tr>
        <tr><td style="padding:6px 0;color:#64748b;font-size:13px;">Puhelin</td><td style="padding:6px 0;color:#1e293b;font-size:14px;font-weight:600;">${phone}</td></tr>
      </table>
      <h3 style="font-size:15px;color:#002350;margin:0 0 12px;">Palvelun tiedot</h3>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr><td style="padding:6px 0;color:#64748b;font-size:13px;width:130px;">Palvelu</td><td style="padding:6px 0;color:#1e293b;font-size:14px;font-weight:600;">${service_type}</td></tr>
        <tr><td style="padding:6px 0;color:#64748b;font-size:13px;">Tyyppi</td><td style="padding:6px 0;color:#1e293b;font-size:14px;font-weight:600;">${frequency}</td></tr>
        <tr><td style="padding:6px 0;color:#64748b;font-size:13px;">Osoite</td><td style="padding:6px 0;color:#1e293b;font-size:14px;font-weight:600;">${address}, ${zip} ${city}</td></tr>
        <tr><td style="padding:6px 0;color:#64748b;font-size:13px;">Pinta-ala</td><td style="padding:6px 0;color:#1e293b;font-size:14px;font-weight:600;">${area} m²</td></tr>
        <tr><td style="padding:6px 0;color:#64748b;font-size:13px;">Kotitalousvähennys</td><td style="padding:6px 0;color:#1e293b;font-size:14px;font-weight:600;">${kotitalousvahennys ? "Kyllä" : "Ei"}</td></tr>
      </table>
      <h3 style="font-size:15px;color:#002350;margin:0 0 12px;">Toivotut päivämäärät ja ajat</h3>
      <div style="margin-bottom:24px;">${datePillsHTML}</div>
      ${notes ? `<div style="background:#fef3c7;border-radius:10px;padding:16px;margin-bottom:24px;"><p style="margin:0 0 4px;font-size:12px;color:#92400e;font-weight:600;">Lisätiedot</p><p style="margin:0;font-size:14px;color:#78350f;">${notes}</p></div>` : ""}
    </div>
    <div style="background:#f8fafc;padding:20px 32px;text-align:center;border-top:1px solid #e2e8f0;">
      <p style="margin:0;font-size:12px;color:#94a3b8;">Powered by Envaire</p>
    </div>
  </div>
</body>
</html>`;

  // ═══════════════════════════════════════════════════
  // 3) EMAIL TO ENVAIRE (us) — Lead Notification
  // ═══════════════════════════════════════════════════
  const envaireHTML = `
<!DOCTYPE html>
<html lang="fi">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;margin-top:32px;margin-bottom:32px;box-shadow:0 4px 24px rgba(0,35,80,0.08);">
    <div style="background:#002350;padding:40px 32px;text-align:center;">
      <h1 style="color:#ffffff;font-size:24px;margin:0 0 8px;font-family:Georgia,serif;font-style:italic;">Cleava sai uuden liidin! 🎉</h1>
      <p style="color:#ffffff;font-size:14px;margin:0;">Envaire Lead Notification</p>
    </div>
    <div style="padding:32px;">
      <div style="background:#dcfce7;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
        <p style="margin:0;font-size:14px;color:#166534;font-weight:600;">✅ Cleava sai juuri uuden varauksen verkkosivujen kautta!</p>
      </div>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:6px 0;color:#64748b;font-size:13px;width:130px;">Asiakas</td><td style="padding:6px 0;color:#1e293b;font-size:14px;font-weight:600;">${name}</td></tr>
        <tr><td style="padding:6px 0;color:#64748b;font-size:13px;">Sähköposti</td><td style="padding:6px 0;color:#1e293b;font-size:14px;font-weight:600;">${email}</td></tr>
        <tr><td style="padding:6px 0;color:#64748b;font-size:13px;">Puhelin</td><td style="padding:6px 0;color:#1e293b;font-size:14px;font-weight:600;">${phone}</td></tr>
        <tr><td style="padding:6px 0;color:#64748b;font-size:13px;">Palvelu</td><td style="padding:6px 0;color:#1e293b;font-size:14px;font-weight:600;">${service_type} – ${frequency}</td></tr>
        <tr><td style="padding:6px 0;color:#64748b;font-size:13px;">Osoite</td><td style="padding:6px 0;color:#1e293b;font-size:14px;font-weight:600;">${address}, ${zip} ${city}</td></tr>
        <tr><td style="padding:6px 0;color:#64748b;font-size:13px;">Pinta-ala</td><td style="padding:6px 0;color:#1e293b;font-size:14px;font-weight:600;">${area} m²</td></tr>
        ${dateTableRows}
      </table>
    </div>
    <div style="background:#f8fafc;padding:20px 32px;text-align:center;border-top:1px solid #e2e8f0;">
      <p style="margin:0;font-size:12px;color:#94a3b8;">Envaire Internal CRM</p>
    </div>
  </div>
</body>
</html>`;

  // Validate SMTP config before attempting to send
  if (!process.env.SMTP_HOST || !process.env.SMTP_PASS) {
    console.error("SMTP not configured. SMTP_HOST:", !!process.env.SMTP_HOST, "SMTP_PASS:", !!process.env.SMTP_PASS);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: false, error: "Email service not configured" }),
    };
  }

  try {
    // Verify SMTP connection first
    await transporter.verify();
    console.log("SMTP connection verified");

    // Send all 3 emails in parallel
    const results = await Promise.all([
      // 1) Customer confirmation — FROM: info@cleava.fi
      transporter.sendMail({
        from: fromCleava,
        to: email,
        subject: "Tilausvahvistus – Cleava Siivouspalvelut",
        html: customerHTML,
      }),
      // 2) Cleava notification — FROM: info@envaire.com
      transporter.sendMail({
        from: fromEnvaire,
        to: process.env.EMAIL_TO_CLEAVA,
        subject: "Uusi tilaus Envairen kautta!",
        html: cleavaHTML,
      }),
      // 3) Envaire lead notification — FROM: info@envaire.com
      transporter.sendMail({
        from: fromEnvaire,
        to: process.env.EMAIL_TO_ENVAIRE,
        subject: "Cleava sai uuden liidin!",
        html: envaireHTML,
      }),
    ]);

    console.log("All 3 emails sent successfully. Customer:", email, "MessageIDs:", results.map(r => r.messageId));

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error("Email send error:", err.message, "Code:", err.code, "Response:", err.response);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: false, error: "Email delivery failed" }),
    };
  }
};

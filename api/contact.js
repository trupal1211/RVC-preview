export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ status: 'error', message: 'Method not allowed' });

  const { name, email, phone, message, source_url, recaptcha_token } = req.body || {};

  if (!name || !email || !phone) {
    return res.status(400).json({ status: 'error', message: 'Name, email, and phone are required.' });
  }

  // 1. Verify reCAPTCHA token
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (secretKey && recaptcha_token) {
    try {
      const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${secretKey}&response=${recaptcha_token}`,
      });
      const verifyData = await verifyRes.json();
      
      if (!verifyData.success || verifyData.score < 0.5) {
        return res.status(400).json({ status: 'error', message: 'reCAPTCHA verification failed. Please try again.' });
      }
    } catch (error) {
      console.error("reCAPTCHA verification error:", error);
      // We continue if the verification API is down, but log it
    }
  }

  // Email templates for future use
  const logoUrl = 'https://www.relationshipvista.com/logo.webp';

  const salesHTML = `<!DOCTYPE html><html><head><title>Inquiry</title></head><body>
    <table width="650" align="center" cellpadding="0" cellspacing="0" style="border:1px solid #e2e2e2;font-family:Arial,sans-serif;font-size:12px;color:#333;">
      <tr><td align="center" bgcolor="#f4f9fb" style="padding:10px 0;border-bottom:1px solid #e2e2e2;">
        <img src="${logoUrl}" width="200" style="display:block;" />
      </td></tr>
      <tr><td align="center" style="padding:20px 10px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td align="left" style="padding-bottom:10px;"><strong style="font-size:18px;">Following message received via contact us form</strong></td></tr>
          <tr><td>
            <table width="100%" cellpadding="0" cellspacing="0" border="1" style="border-collapse:collapse;border:1px solid #ccc;">
              <tr><td style="padding:10px;width:34%;"><strong>Name:</strong></td><td style="padding:10px;">${name}</td></tr>
              <tr><td style="padding:10px;"><strong>Email:</strong></td><td style="padding:10px;">${email}</td></tr>
              <tr><td style="padding:10px;"><strong>Contact Number:</strong></td><td style="padding:10px;">${phone}</td></tr>
              <tr><td style="padding:10px;"><strong>Message:</strong></td><td style="padding:10px;">${(message || '').replace(/\n/g, '<br/>')}</td></tr>
              <tr><td style="padding:10px;"><strong>Form Submitted From:</strong></td><td style="padding:10px;">${source_url || 'Direct'}</td></tr>
            </table>
          </td></tr>
        </table>
      </td></tr>
      <tr><td bgcolor="#f4f9fb" style="padding:10px;border-top:1px solid #e2e2e2;">
        <strong>Thanks &amp; Regards</strong><br/> RelationshipVista Team<br/>
        <strong>Address: </strong>2040 Martin Ave Santa Clara, CA 95050 United States<br/>
        <strong>Phone: </strong> 1.669.777.6838
      </td></tr>
    </table></body></html>`;

  const prospectHTML = `<!DOCTYPE html><html><head><title>Thank You</title></head><body>
    <table width="650" align="center" cellpadding="0" cellspacing="0" style="border:1px solid #e2e2e2;font-family:Arial,sans-serif;font-size:12px;color:#333;">
      <tr><td align="center" bgcolor="#f4f9fb" style="padding:10px 0;border-bottom:1px solid #e2e2e2;">
        <img src="${logoUrl}" width="200" style="display:block;" />
      </td></tr>
      <tr><td align="center" style="padding:20px 10px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td align="left" style="padding-bottom:10px;"><strong style="font-size:18px;">We have received your details, one of our representatives will get in touch with you shortly.</strong></td></tr>
          <tr><td>
            <table width="100%" cellpadding="0" cellspacing="0" border="1" style="border-collapse:collapse;border:1px solid #ccc;">
              <tr><td style="padding:10px;width:34%;"><strong>Name:</strong></td><td style="padding:10px;">${name}</td></tr>
              <tr><td style="padding:10px;"><strong>Email:</strong></td><td style="padding:10px;">${email}</td></tr>
              <tr><td style="padding:10px;"><strong>Contact Number:</strong></td><td style="padding:10px;">${phone}</td></tr>
              <tr><td style="padding:10px;"><strong>Message:</strong></td><td style="padding:10px;">${(message || '').replace(/\n/g, '<br/>')}</td></tr>
            </table>
          </td></tr>
        </table>
      </td></tr>
      <tr><td bgcolor="#f4f9fb" style="padding:10px;border-top:1px solid #e2e2e2;">
        <strong>Thanks &amp; Regards</strong><br/> RelationshipVista Team<br/>
        <strong>Address: </strong>2040 Martin Ave Santa Clara, CA 95050 United States<br/>
        <strong>Phone: </strong> 1.669.777.6838
      </td></tr>
    </table></body></html>`;

  // Log form details to console
  const timestamp = new Date().toISOString();
  console.log('📝 NEW CONTACT FORM SUBMISSION');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Timestamp: ${timestamp}`);
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Phone: ${phone}`);
  console.log(`Message: ${message || '(No message provided)'}`);
  console.log(`Source URL: ${source_url || 'Direct'}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  return res.status(200).json({ 
    status: 'success', 
    message: 'Thank you! We have received your message and will get back to you soon.' 
  });
}

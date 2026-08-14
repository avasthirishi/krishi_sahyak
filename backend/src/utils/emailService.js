import nodemailer from 'nodemailer';

// Checked at call-time so a restart always picks up .env changes
const hasEmailConfig = () => Boolean(
  process.env.SMTP_HOST &&
  process.env.SMTP_PORT &&
  process.env.SMTP_USER &&
  process.env.SMTP_PASS &&
  process.env.SMTP_FROM
);

export const isEmailServiceConfigured = () => hasEmailConfig();

let transporter;

const getTransporter = () => {
  if (!hasEmailConfig()) {
    return null;
  }

  // Rebuild transporter if credentials changed since last call
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: String(process.env.SMTP_SECURE).toLowerCase() === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS.replace(/\s+/g, '') // strip accidental spaces from app password
      }
    });
  }

  return transporter;
};

// Builds a rich HTML email for OTP delivery
const buildOtpHtml = (otp, purpose = 'verification') => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Krishi Sahayak OTP</title>
</head>
<body style="margin:0;padding:0;background-color:#f0fdf4;font-family:'Segoe UI',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
         style="background:#f0fdf4;padding:40px 16px;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
               style="max-width:520px;background:#ffffff;border-radius:20px;
                      box-shadow:0 8px 32px rgba(22,101,52,0.12);overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#14532d 0%,#166534 50%,#15803d 100%);
                        padding:36px 40px 28px;text-align:center;">
              <!-- Leaf icon -->
              <div style="display:inline-block;background:rgba(255,255,255,0.15);
                           border-radius:50%;width:64px;height:64px;line-height:64px;
                           font-size:32px;margin-bottom:16px;">🌿</div>
              <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:800;
                          letter-spacing:-0.5px;">Krishi Sahayak</h1>
              <p style="margin:6px 0 0;color:#bbf7d0;font-size:14px;font-weight:500;">
                India's First Farmer Community Network
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px 28px;">
              <h2 style="margin:0 0 10px;color:#14532d;font-size:20px;font-weight:700;">
                Your Verification Code
              </h2>
              <p style="margin:0 0 28px;color:#4b5563;font-size:15px;line-height:1.6;">
                Use the OTP below to complete your <strong>${purpose}</strong>.
                This code is valid for <strong>10 minutes</strong>.
              </p>

              <!-- OTP Box -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td align="center"
                      style="background:linear-gradient(135deg,#f0fdf4,#dcfce7);
                             border:2px solid #86efac;border-radius:16px;
                             padding:24px 16px;">
                    <p style="margin:0 0 8px;color:#166534;font-size:12px;
                               font-weight:700;letter-spacing:2px;text-transform:uppercase;">
                      One-Time Password
                    </p>
                    <p style="margin:0;color:#14532d;font-size:42px;font-weight:800;
                               letter-spacing:14px;font-family:'Courier New',monospace;">
                      ${otp}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Warning -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                     style="margin-top:24px;">
                <tr>
                  <td style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;
                              padding:14px 18px;">
                    <p style="margin:0;color:#92400e;font-size:13px;line-height:1.5;">
                      ⚠️ <strong>Never share this OTP</strong> with anyone.
                      Krishi Sahayak will never ask for your OTP over call or chat.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Expiry note -->
              <p style="margin:24px 0 0;color:#9ca3af;font-size:13px;text-align:center;">
                If you did not request this OTP, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;border-top:1px solid #e5e7eb;
                        padding:20px 40px;text-align:center;">
              <p style="margin:0;color:#6b7280;font-size:12px;line-height:1.6;">
                © ${new Date().getFullYear()} Krishi Sahayak &nbsp;·&nbsp;
                Greater Noida, Uttar Pradesh, India<br/>
                <a href="mailto:info@krishisahayak.com"
                   style="color:#16a34a;text-decoration:none;">info@krishisahayak.com</a>
              </p>
            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>

</body>
</html>`;

export const sendOtpEmail = async (email, otp, purpose = 'email verification') => {
  const emailTransporter = getTransporter();

  if (!emailTransporter) {
    return {
      delivered: false,
      reason: 'SMTP not configured'
    };
  }

  try {
    await emailTransporter.sendMail({
      from: process.env.SMTP_FROM.trim(),
      to: email,
      subject: `${otp} is your Krishi Sahayak OTP`,
      text: `Your Krishi Sahayak OTP is ${otp}. It is valid for 10 minutes. Never share it with anyone.`,
      html: buildOtpHtml(otp, purpose)
    });

    return { delivered: true };
  } catch (error) {
    console.error('SMTP delivery failed:', error.message);
    return {
      delivered: false,
      reason: error.message
    };
  }
};


import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

// Email doğrulama maili gönder
export async function sendVerificationEmail(email: string, token: string) {
  const confirmLink = `${domain}/auth/verify-email?token=${token}`;

  try {
    await resend.emails.send({
      from: "KTÜ Mezun Platformu <noreply@mezun.ktu.edu.tr>",
      to: email,
      subject: "E-posta Adresinizi Doğrulayın",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; margin: 0; padding: 40px 20px;">
          <div style="max-width: 480px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
            <div style="background: linear-gradient(135deg, #1b71ac, #0033b4); padding: 32px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">KTÜ Mezun Platformu</h1>
            </div>
            <div style="padding: 32px;">
              <h2 style="color: #1e293b; margin: 0 0 16px; font-size: 20px;">E-posta Doğrulama</h2>
              <p style="color: #64748b; line-height: 1.6; margin: 0 0 24px;">
                Merhaba,<br><br>
                KTÜ Mezun Platformu'na hoş geldiniz! Hesabınızı aktifleştirmek için aşağıdaki butona tıklayın.
              </p>
              <a href="${confirmLink}" style="display: inline-block; background: #1b71ac; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; margin-bottom: 24px;">
                E-postamı Doğrula
              </a>
              <p style="color: #94a3b8; font-size: 14px; margin: 24px 0 0;">
                Bu bağlantı 24 saat içinde geçerliliğini yitirecektir.<br><br>
                Eğer bu işlemi siz yapmadıysanız, bu e-postayı görmezden gelebilirsiniz.
              </p>
            </div>
            <div style="background: #f1f5f9; padding: 16px 32px; text-align: center;">
              <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} KTÜ Mezun Platformu
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Email gönderim hatası:", error);
    return { success: false, error };
  }
}

// Şifre sıfırlama maili gönder
export async function sendPasswordResetEmail(email: string, token: string) {
  const resetLink = `${domain}/auth/reset-password?token=${token}`;

  try {
    await resend.emails.send({
      from: "KTÜ Mezun Platformu <noreply@mezun.ktu.edu.tr>",
      to: email,
      subject: "Şifre Sıfırlama Talebi",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; margin: 0; padding: 40px 20px;">
          <div style="max-width: 480px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
            <div style="background: linear-gradient(135deg, #1b71ac, #0033b4); padding: 32px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">KTÜ Mezun Platformu</h1>
            </div>
            <div style="padding: 32px;">
              <h2 style="color: #1e293b; margin: 0 0 16px; font-size: 20px;">Şifre Sıfırlama</h2>
              <p style="color: #64748b; line-height: 1.6; margin: 0 0 24px;">
                Merhaba,<br><br>
                Şifre sıfırlama talebinde bulundunuz. Yeni şifrenizi belirlemek için aşağıdaki butona tıklayın.
              </p>
              <a href="${resetLink}" style="display: inline-block; background: #1b71ac; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; margin-bottom: 24px;">
                Şifremi Sıfırla
              </a>
              <p style="color: #94a3b8; font-size: 14px; margin: 24px 0 0;">
                Bu bağlantı 1 saat içinde geçerliliğini yitirecektir.<br><br>
                Eğer bu işlemi siz yapmadıysanız, bu e-postayı görmezden gelebilirsiniz. Şifreniz değiştirilmeyecektir.
              </p>
            </div>
            <div style="background: #f1f5f9; padding: 16px 32px; text-align: center;">
              <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} KTÜ Mezun Platformu
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Email gönderim hatası:", error);
    return { success: false, error };
  }
}


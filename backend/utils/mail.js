import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

export const sendOtpMail = async (to, otp) => {
    await transporter.sendMail({
        from: `"Vitta - Suporte" <${process.env.EMAIL}>`,
        to,
        subject: "Redefinição de senha - Vitta",
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
        <h2 style="color:#ff4d2d; text-align: center;">Vitta</h2>
        <p style="font-size: 16px; color: #333;">
          Olá,
        </p>
        <p style="font-size: 16px; color: #333;">
          Você solicitou a redefinição da sua senha. Para continuar, utilize o código abaixo:
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="display: inline-block; font-size: 24px; font-weight: bold; letter-spacing: 3px; color: #ff4d2d; background: #f4f6f7; padding: 12px 24px; border-radius: 6px;">
            ${otp}
          </span>
        </div>
        <p style="font-size: 14px; color: #555;">
          Este código expira em <b>5 minutos</b>. Caso você não tenha solicitado a redefinição de senha, ignore este email.
        </p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
        <p style="font-size: 12px; color: #999; text-align: center;">
          © ${new Date().getFullYear()} Vitta - Todos os direitos reservados.
        </p>
      </div>
    `,
    });
};

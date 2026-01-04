import nodemailer from 'nodemailer';
import fs from 'fs';

export function makeTransport() {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 587),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  return transporter;
}

export async function sendBirthdayEmail({ to, subject, text, flyerPath }) {
  const transporter = makeTransport();
  const attachments = flyerPath && fs.existsSync(flyerPath) ? [{
    filename: 'birthday-flyer.png',
    path: flyerPath
  }] : [];
  await transporter.sendMail({
    from: `${process.env.FROM_NAME || 'Birthday Bot'} <${process.env.FROM_EMAIL || process.env.EMAIL_USER}>`,
    to,
    subject: subject || '🎉 Happy Birthday!',
    text: text || 'Have a wonderful day!',
    attachments
  });
}

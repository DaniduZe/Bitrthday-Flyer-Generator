import cron from 'node-cron';
import dayjs from 'dayjs';
import User from '../models/User.js';
import { generateFlyer } from './flyerGenerator.js';
import { sendBirthdayEmail } from './emailService.js';

export function startBirthdayJob() {
  const tz = process.env.TIMEZONE || 'Asia/Colombo';
  // Runs at 00:00 every day
  cron.schedule('*/1 * * * *', async () => {
    const now = dayjs().tz ? dayjs().tz(tz) : dayjs();
    const m = now.month();
    const d = now.date();

    const users = await User.find({});
    const todays = users.filter(u => {
      const dob = dayjs(u.dob);
      return dob.month() === m && dob.date() === d;
    });
    console.log('Birthday Job: Found', todays.length, 'birthdays today.');
    for (const user of todays) {
      try {
        const flyerPath = await generateFlyer(user);

        const maxAttempts = 3;
        let attempt = 0;
        let sent = false;
        let lastError = null;

        const ccEmails = Array.from(new Set(users.map(u => u.email).filter(Boolean)));
        console.log('CC Emails:', ccEmails);

        const payload = {
          to: user.email,
          bcc: ccEmails,
          subject: `🎂 Happy Birthday, ${user.name}!`,
          text: `Dear ${user.name},
          Wishing you a fantastic birthday! 🎉`,
          flyerPath
        };

        while (attempt < maxAttempts && !sent) {
          attempt++;
          try {
            await sendBirthdayEmail(payload);
            sent = true;
            console.log('Sent birthday email to', user.email, 'on attempt', attempt);
          } catch (err) {
            lastError = err;
            console.warn(`Attempt ${attempt} failed to send email to ${user.email}:`, err && err.message ? err.message : err);
            if (attempt < maxAttempts) {
              const delayMs = 1000 * Math.pow(2, attempt - 1); // 1s, 2s, 4s
              await new Promise(res => setTimeout(res, delayMs));
            }
          }
        }

        if (!sent) {
          throw lastError || new Error('Failed to send birthday email after retries');
        }
      } catch (e) {
        console.error('Error sending birthday email:', e.message);
      }
    }
    console.log(`Checked birthdays for ${now.format('YYYY-MM-DD')}. Found ${todays.length}.`);
  }, { timezone: tz });
}

import test from 'node:test';
import assert from 'node:assert/strict';
import nodemailer from 'nodemailer';

process.env.EMAIL = 'test@example.com';
process.env.EMAIL_PASSWORD = 'test-password';
process.env.SMTP_HOST = 'smtp.example.com';
process.env.SMTP_PORT = '587';
process.env.SMTP_SECURE = 'false';

test('sendEmail resolves without throwing when transport.sendMail fails', async (t) => {
  const originalCreateTransport = nodemailer.createTransport;
  nodemailer.createTransport = () => ({
    sendMail: () => new Promise((_, reject) => {
      reject(new Error('smtp auth failed'));
    }),
  });

  t.after(() => {
    nodemailer.createTransport = originalCreateTransport;
  });

  const { sendEmail } = await import('../emailService.js');
  const result = await sendEmail({
    from: 'test@example.com',
    to: 'customer@example.com',
    subject: 'Test',
    text: 'Hello',
  });

  assert.equal(result, null);
});

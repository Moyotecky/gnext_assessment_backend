import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// Create a transporter for Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
});

// Function to send the login email
export async function sendLoginEmail(
  recipient: string,
  location: string,
  deviceType: string,
  dateTime: string
) {
  try {
    // Load and customize the email template
    const emailPath = path.join(__dirname, '../../../public/emails/login-email.html');
    const emailTemplate = fs.readFileSync(emailPath, 'utf8');
    const customizedTemplate = emailTemplate
      .replace('{{location}}', location)
      .replace('{{deviceType}}', deviceType)
      .replace('{{dateTime}}', dateTime);

    // Email options
    const mailOptions = {
      from: `"GText Assessment" <moyotecky@gmail.com>`, // Sender address
      to: recipient, // Recipient email
      subject: 'New Login Detected',
      html: customizedTemplate,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send login email.');
  }
}

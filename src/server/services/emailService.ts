import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import WelcomeEmail from '../emails/WelcomeEmail';
import EmployeeInviteEmail from '../emails/EmployeeInviteEmail';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendWelcomeEmail = async (to: string, data: {
  companyName: string;
  name: string;
  loginUrl: string;
  setupUrl: string;
}) => {
  const html = render(WelcomeEmail(data));
  
  await transporter.sendMail({
    from: `"${data.companyName} HR" <${process.env.SMTP_FROM}>`,
    to,
    subject: `Welcome to ${data.companyName} HR System`,
    html,
  });
};

export const sendEmployeeInvite = async (to: string, data: {
  companyName: string;
  name: string;
  employeeId: string;
  inviteUrl: string;
  expiresIn: string;
}) => {
  const html = render(EmployeeInviteEmail(data));
  
  await transporter.sendMail({
    from: `"${data.companyName} HR" <${process.env.SMTP_FROM}>`,
    to,
    subject: `Welcome to ${data.companyName}`,
    html,
  });
};
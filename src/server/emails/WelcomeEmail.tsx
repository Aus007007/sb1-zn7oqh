import React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components';

interface WelcomeEmailProps {
  companyName: string;
  name: string;
  loginUrl: string;
  setupUrl: string;
}

export default function WelcomeEmail({
  companyName,
  name,
  loginUrl,
  setupUrl,
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to {companyName} HR System</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to {companyName} HR System</Heading>
          <Text style={text}>Hello {name},</Text>
          <Text style={text}>
            You have been set up as an HR administrator for {companyName}'s HR system.
            To get started, please complete your account setup by clicking the button below.
          </Text>
          <Link href={setupUrl} style={button}>
            Complete Setup
          </Link>
          <Text style={text}>
            After completing your setup, you can access the HR system at any time using:
          </Text>
          <Link href={loginUrl} style={link}>
            {loginUrl}
          </Link>
          <Text style={footer}>
            If you did not request this account, please ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  padding: '10px 0',
};

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #f0f0f0',
  borderRadius: '5px',
  margin: '0 auto',
  padding: '45px',
  width: '465px',
};

const h1 = {
  color: '#1f2937',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.1',
  margin: '0 0 15px',
};

const text = {
  color: '#4b5563',
  fontSize: '16px',
  lineHeight: '1.4',
  margin: '24px 0',
};

const button = {
  backgroundColor: '#2563eb',
  borderRadius: '5px',
  color: '#fff',
  display: 'block',
  fontSize: '16px',
  fontWeight: '600',
  padding: '12px',
  textAlign: 'center' as const,
  textDecoration: 'none',
  width: '200px',
  margin: '24px auto',
};

const link = {
  color: '#2563eb',
  textDecoration: 'underline',
};

const footer = {
  color: '#6b7280',
  fontSize: '14px',
  fontStyle: 'italic',
  margin: '32px 0 0',
};
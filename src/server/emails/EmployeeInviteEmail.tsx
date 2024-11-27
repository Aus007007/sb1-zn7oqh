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

interface EmployeeInviteEmailProps {
  companyName: string;
  name: string;
  employeeId: string;
  inviteUrl: string;
  expiresIn: string;
}

export default function EmployeeInviteEmail({
  companyName,
  name,
  employeeId,
  inviteUrl,
  expiresIn,
}: EmployeeInviteEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to {companyName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to {companyName}</Heading>
          <Text style={text}>Hello {name},</Text>
          <Text style={text}>
            You have been invited to join {companyName}'s HR system. Your employee ID is: {employeeId}
          </Text>
          <Text style={text}>
            To complete your account setup and access the HR system, please click the button below:
          </Text>
          <Link href={inviteUrl} style={button}>
            Accept Invitation
          </Link>
          <Text style={note}>
            This invitation will expire in {expiresIn}. If you need a new invitation,
            please contact your HR department.
          </Text>
          <Text style={footer}>
            If you did not expect this invitation, please ignore this email.
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

const note = {
  backgroundColor: '#fff7ed',
  border: '1px solid #ffedd5',
  borderRadius: '5px',
  color: '#c2410c',
  fontSize: '14px',
  margin: '24px 0',
  padding: '16px',
};

const footer = {
  color: '#6b7280',
  fontSize: '14px',
  fontStyle: 'italic',
  margin: '32px 0 0',
};
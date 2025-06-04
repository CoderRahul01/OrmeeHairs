import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { z } from 'zod';

import prisma from '@/lib/prisma';
import { sendEmail } from '@/lib/emailService';

// Validation schema for forgot password
const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate request body
    const result = forgotPasswordSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { message: 'Invalid input', errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    
    const { email } = result.data;
    
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    // For security reasons, don't reveal if the email exists or not
    if (!user) {
      return NextResponse.json(
        { message: 'If your email is registered, you will receive instructions to reset your password.' },
        { status: 200 }
      );
    }
    
    // Generate a random token
    const token = randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 3600000); // 1 hour from now
    
    // Save the token in the database
    await prisma.passwordResetToken.upsert({
      where: { email },
      update: {
        token,
        expires,
      },
      create: {
        email,
        token,
        expires,
      },
    });
    
    // Send password reset email
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}&email=${encodeURIComponent(email)}`;
    
    await sendEmail({
      to: [{ email, name: user.name || '' }],
      subject: 'Reset Your Ormee Hair Password',
      htmlContent: `
        <h1>Reset Your Password</h1>
        <p>You requested to reset your password for your Ormee Hair account.</p>
        <p>Please click the button below to reset your password. This link is valid for 1 hour.</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #B08D57; color: white; text-decoration: none; border-radius: 4px;">Reset Password</a>
        <p>If you didn't request this password reset, you can safely ignore this email.</p>
        <p>Best regards,<br>The Ormee Hair Team</p>
      `,
    });
    
    return NextResponse.json(
      { message: 'If your email is registered, you will receive instructions to reset your password.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
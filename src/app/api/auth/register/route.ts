import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { z } from 'zod';

import prisma from '@/lib/prisma';
import { sendEmail } from '@/lib/emailService';

// Validation schema for registration
const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate request body
    const result = registerSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { message: 'Invalid input', errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    
    const { name, email, password } = result.data;
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      );
    }
    
    // Hash the password
    const hashedPassword = await hash(password, 10);
    
    // Create new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'USER',
      },
    });
    
    // Send welcome email
    await sendEmail({
      to: [{ email, name }],
      subject: 'Welcome to Ormee Hair',
      htmlContent: `
        <h1>Welcome to Ormee Hair!</h1>
        <p>Dear ${name},</p>
        <p>Thank you for creating an account with us. We're excited to have you join our community!</p>
        <p>You can now sign in to your account and start exploring our premium hair products.</p>
        <p>Best regards,<br>The Ormee Hair Team</p>
      `,
    });
    
    // Return success response without sensitive data
    return NextResponse.json(
      {
        message: 'User registered successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 
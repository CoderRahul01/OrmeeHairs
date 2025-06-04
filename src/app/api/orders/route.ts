import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import prisma from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { sendEmail } from '@/lib/emailService';

// Validation schema for order items
const orderItemSchema = z.object({
  productId: z.string(),
  name: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
  image: z.string().optional(),
});

// Validation schema for shipping info
const shippingInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  pincode: z.string().min(6, 'Pincode is required'),
});

// Validation schema for order creation
const createOrderSchema = z.object({
  items: z.array(orderItemSchema),
  shippingInfo: shippingInfoSchema,
  paymentMethod: z.enum(['card', 'upi', 'cod']),
  subtotal: z.number().positive(),
  shippingCost: z.number().min(0),
  taxAmount: z.number().min(0),
  total: z.number().positive(),
});

export async function POST(req: Request) {
  try {
    // Get the current user session
    const session = await getServerSession(authOptions);
    
    // Parse the request body
    const body = await req.json();
    
    // Validate request body
    const result = createOrderSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { message: 'Invalid input', errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    
    const { items, shippingInfo, paymentMethod, subtotal, shippingCost, taxAmount, total } = result.data;
    
    // Generate a unique order number
    const orderNumber = `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`;
    
    // Check if we need to create a guest user
    let userId = session?.user?.id;
    
    if (!userId) {
      // For guest checkout, check if a user with this email already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: shippingInfo.email },
      });
      
      if (existingUser) {
        userId = existingUser.id;
      } else {
        // Create a temporary guest user
        const guestUser = await prisma.user.create({
          data: {
            email: shippingInfo.email,
            name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
            role: 'USER',
          },
        });
        
        userId = guestUser.id;
      }
    }
    
    // Create an address
    let shippingAddressId = '';
    
    // Check if user already has this address
    const existingAddress = await prisma.address.findFirst({
      where: {
        userId,
        addressLine1: shippingInfo.address,
        city: shippingInfo.city,
        state: shippingInfo.state,
        postalCode: shippingInfo.pincode,
      },
    });
    
    if (existingAddress) {
      shippingAddressId = existingAddress.id;
    } else {
      // Create a new address
      const newAddress = await prisma.address.create({
        data: {
          userId,
          name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
          phone: shippingInfo.phone,
          addressLine1: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          postalCode: shippingInfo.pincode,
          country: 'India',
        },
      });
      
      shippingAddressId = newAddress.id;
    }
    
    // Create the order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId,
        status: 'PENDING',
        subtotal: subtotal,
        tax: taxAmount,
        shipping: shippingCost,
        total: total,
        shippingAddressId,
        paymentStatus: paymentMethod === 'cod' ? 'PENDING' : 'PAID',
        notes: `Payment Method: ${paymentMethod}`,
        currency: 'INR',
        items: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.price,
            totalPrice: item.price * item.quantity,
          })),
        },
      },
      include: {
        shippingAddress: true,
        items: true,
      },
    });
    
    // Send order confirmation email
    await sendEmail({
      to: [{ email: shippingInfo.email, name: `${shippingInfo.firstName} ${shippingInfo.lastName}` }],
      subject: `Order Confirmation #${orderNumber}`,
      htmlContent: `
        <h1>Thank You for Your Order!</h1>
        <p>Dear ${shippingInfo.firstName},</p>
        <p>We're happy to let you know that your order has been confirmed.</p>
        <h2>Order Details</h2>
        <p><strong>Order Number:</strong> ${orderNumber}</p>
        <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
        <p><strong>Payment Method:</strong> ${
          paymentMethod === 'card' ? 'Credit/Debit Card' : 
          paymentMethod === 'upi' ? 'UPI' : 'Cash on Delivery'
        }</p>
        <p><strong>Total Amount:</strong> ₹${total.toFixed(2)}</p>
        <p>We'll send you another email when your order ships.</p>
        <p>Thank you for shopping with Ormee Hair!</p>
      `,
    });
    
    // Return success response
    return NextResponse.json(
      {
        message: 'Order created successfully',
        orderId: order.orderNumber,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 
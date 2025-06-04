# Ormee Hair E-commerce

A premium e-commerce platform for hair extensions, wigs, and hair care products built with Next.js, TypeScript, and Prisma.

## Features

- **Product Catalog**: Browse and search through a variety of hair products
- **User Authentication**: Secure sign-up, login, and password reset
- **Shopping Cart**: Add products to cart with persistent storage
- **Checkout Process**: Multi-step checkout with shipping and payment options
- **Order Management**: View and track orders in user account
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL with Prisma ORM
- **Email**: Brevo (Sendinblue) API
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (or Neon DB account)
- Brevo/Sendinblue API key (for emails)

### Environment Setup

1. Copy the example environment file:
   ```bash
   cp env-example.txt .env
   ```

2. Fill in the required environment variables:
   ```
   # Database (Neon DB)
   DATABASE_URL="postgresql://user:password@host:port/database"

   # NextAuth.js
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"

   # Email Service (Brevo/Sendinblue)
   BREVO_API_KEY="your-brevo-api-key"
   BREVO_DEFAULT_SENDER_EMAIL="noreply@yourdomain.com"
   BREVO_DEFAULT_SENDER_NAME="Ormee Hair"

   # Application URL
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

### Installation

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

3. Seed the database with initial data:
   ```bash
   pnpm db:seed
   ```

4. Start the development server:
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/src/app` - Next.js App Router pages and API routes
- `/src/components` - Reusable UI components
- `/src/lib` - Utility functions and context providers
- `/src/types` - TypeScript type definitions
- `/prisma` - Database schema and migrations

## Admin Access

The default admin credentials after seeding:
- Email: admin@ormeehair.com (or value of ADMIN_EMAIL env variable)
- Password: Admin123!

## Deployment

The application can be deployed on Vercel, Netlify, or any other platform that supports Next.js applications.

```bash
pnpm build
```

## Future Enhancements

- Product reviews and ratings
- Wishlist functionality
- Advanced filtering and search
- Admin dashboard
- Payment gateway integration
- Analytics and reporting

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import type { NextAuthConfig } from "next-auth";
import type { User as NextAuthUser } from "next-auth";
// import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";

import prisma from "@/lib/prisma";

// Temporary type for mock user
type MockUser = {
  id: string;
  email: string;
  name: string | null;
  password?: string;
  role?: string;
};

// Our custom user type with role
type CustomUser = NextAuthUser & {
  role?: string;
};

export const authOptions: NextAuthConfig = {
  // Remove PrismaAdapter temporarily until database is properly set up
  // adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt" as const,
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // For development, use a mock user
        const mockUser: MockUser = {
          id: "mock-user-id",
          email: credentials.email as string,
          name: "Mock User",
          password: "$2a$10$8VUw4LGQx97bZEZXhIL87umUJ2zqM3K1FgLzRiJYqEfzgK0qUV9hC", // "password123" hashed
          role: "USER"
        };

        // Simulate password validation
        const isPasswordValid = credentials.password === "password123";

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: mockUser.id,
          email: mockUser.email,
          name: mockUser.name,
          role: mockUser.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "your-development-secret-key",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 
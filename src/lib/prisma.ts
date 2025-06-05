// Mock Prisma Client for development
// This is a temporary solution until Prisma can be properly set up

const mockPrismaClient = {
  user: {
    findUnique: async () => {
      console.log('Mock: findUnique user called');
      return null;
    },
    create: async () => {
      console.log('Mock: create user called');
      return { id: 'mock-id', email: 'mock@example.com', name: 'Mock User' };
    },
  },
  account: {
    create: async () => {
      console.log('Mock: create account called');
      return { id: 'mock-account-id' };
    },
  },
  session: {
    create: async () => {
      console.log('Mock: create session called');
      return { id: 'mock-session-id' };
    },
    deleteMany: async () => {
      console.log('Mock: deleteMany sessions called');
      return { count: 0 };
    },
  },
  // Add other models as needed
};

// In a real setup, we would use PrismaClient
// import { PrismaClient } from '@/generated/prisma';
// const prisma = new PrismaClient();

const prisma = mockPrismaClient;

export default prisma; 
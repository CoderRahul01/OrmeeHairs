'use client';

import { useSession } from 'next-auth/react';

export function useAuth() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated' && !!session?.user;
  const isLoading = status === 'loading';
  const isAdmin = session?.user?.role === 'ADMIN';

  return {
    user: session?.user,
    isAuthenticated,
    isLoading,
    isAdmin,
  };
} 
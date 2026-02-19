'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthToken } from '@/components/AuthTokenProvider';

export const useAdminAuth = () => {
  const router = useRouter();
  const { token, userRole } = useAuthToken();

  useEffect(() => {
    if (!token) {
      router.push('/auth');
      return;
    }

    if (userRole && userRole !== 'admin') {
      router.push('/user/dashboard');
    }
  }, [token, userRole, router]);

  return { token, userRole, isAdmin: userRole === 'admin' };
};

export const useUserAuth = () => {
  const router = useRouter();
  const { token, userRole } = useAuthToken();

  useEffect(() => {
    if (!token) {
      router.push('/auth');
      return;
    }

    if (userRole && userRole === 'admin') {
      router.push('/admin/courses');
    }
  }, [token, userRole, router]);

  return { token, userRole, isUser: userRole === 'user' };
};

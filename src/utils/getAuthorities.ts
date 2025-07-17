'use server';

import { cookies } from 'next/headers';
import { AuthSession, Authority, UserRole } from '@/types/auth';

export const getAuthorities = async (): Promise<Authority[]> => {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if (!sessionCookie) {
      return [];
    }

    const parsedSession: AuthSession = JSON.parse(sessionCookie);
    
    if (!parsedSession.authorities || !Array.isArray(parsedSession.authorities)) {
      return [];
    }

    return parsedSession.authorities as Authority[];
  } catch (error) {
    console.error('Error parsing session authorities:', error);
    return [];
  }
};

export const hasAuthority = async (authority: Authority): Promise<boolean> => {
  const authorities = await getAuthorities();
  return authorities.includes(authority);
};

export const hasAnyAuthority = async (authoritiesToCheck: Authority[]): Promise<boolean> => {
  const authorities = await getAuthorities();
  return authoritiesToCheck.some(authority => authorities.includes(authority));
};

export const getUserRole = async (): Promise<UserRole | null> => {
  const authorities = await getAuthorities();
  const role = authorities.find(auth => auth.startsWith('ROLE_')) as UserRole;
  return role || null;
};

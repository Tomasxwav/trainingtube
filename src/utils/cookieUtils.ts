'use server';

import { cookies } from 'next/headers';
import { SessionData, AuthSession, Authority, UserRole } from '@/types/auth';

export async function setSessionCookie(session: SessionData): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set('session', JSON.stringify(session), {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: 604800000, 
  });
}

export async function getSessionCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get('session')?.value;
}

export async function getSession(): Promise<SessionData | null> {
  try {
    const sessionCookie = await getSessionCookie();
    if (!sessionCookie) return null;
    
    return JSON.parse(sessionCookie) as SessionData;
  } catch (error) {
    console.error('Error parsing session cookie:', error);
    return null;
  }
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}

export async function getAuthorities(): Promise<Authority[]> {
  try {
    const session = await getSession();
    
    if (!session?.authorities || !Array.isArray(session.authorities)) {
      return [];
    }

    return session.authorities as Authority[];
  } catch (error) {
    console.error('Error getting authorities:', error);
    return [];
  }
}

export async function hasAuthority(authority: Authority): Promise<boolean> {
  const authorities = await getAuthorities();
  return authorities.includes(authority);
}

export async function hasAnyAuthority(authoritiesToCheck: Authority[]): Promise<boolean> {
  const authorities = await getAuthorities();
  return authoritiesToCheck.some(authority => authorities.includes(authority));
}

export async function getUserRole(): Promise<UserRole | null> {
  const authorities = await getAuthorities();
  const role = authorities.find(auth => auth.startsWith('ROLE_')) as UserRole;
  return role || null;
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null && !!session.access_token;
}

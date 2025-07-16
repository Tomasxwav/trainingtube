'use server';

import { cookies } from 'next/headers';

export const useAuthorities = async () => {
  const cookieStore = await cookies();
  const authorities = cookieStore.get('session')?.value;

  if (!authorities) {
    return [];
  }
  const parsedAuthorities = JSON.parse(authorities).authorities;

  return parsedAuthorities;
};
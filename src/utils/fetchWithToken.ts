'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function fetchWithToken(url: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get('access_token')?.value;

  if (!accessToken) {
    const response = await fetch(url, options);

    if (!response.ok) {
      redirect('/login'); 
    }

    const data = await response.json();

    cookieStore.set('access_token', data.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 5 * 60,
      path: '/',
    });

    redirect('/home'); 
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    return {ok: false, error: 'Unauthorized', status: response.status };
  }

  const data = await response.json();

  return {ok: true, status: response.status, data: data}; 
}


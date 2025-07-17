'use server';

import { redirect } from 'next/navigation';
import getConfig from 'next/config';
import { SessionData } from '@/types/auth';
import { setSessionCookie, getSession } from './cookieUtils';

const { publicRuntimeConfig } = getConfig();
const BASE_URL = publicRuntimeConfig.publicBackendUrl;

async function refreshSession(refresh_token: string): Promise<SessionData | null> {
  try {
    const res = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token }),
    });

    if (!res.ok) return null;

    const newSession = await res.json();
    await setSessionCookie(newSession);
    return newSession;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
}

async function performRequest(url: string, token: string, options: RequestInit) {
  const response = await fetch(BASE_URL + url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  const contentType = response.headers.get('content-type');
  let data: any;

  if (contentType?.includes('application/json')) {
    try {
      data = await response.json();
    } catch (err) {
      console.warn('Respuesta vacía o malformada al intentar hacer JSON.parse');
      data = null;
    }
  } else {
    data = await response.text();
  }

  return { response, data };
}


export async function fetchWithToken(url: string, options: RequestInit = { method: 'GET' }) {
  const session = await getSession();

  if (!session) {
    console.log('No hay sesión, solicitando sin token');

    const response = await fetch(BASE_URL + url, options);

    if (!response.ok) {
      if (response.status === 401) redirect('/login');
      const error = await response.text();
      return { ok: false, error, status: response.status };
    }

    const newSession = await response.json();
    await setSessionCookie(newSession);
    redirect('/home');
  }

  let { response, data } = await performRequest(url, session.access_token, options);

  if (response.status === 401) {
    console.log('Token expirado, intentando refrescar...');

    const refreshedSession = await refreshSession(session.refresh_token);
    if (!refreshedSession) redirect('/login');

    ({ response, data } = await performRequest(url, refreshedSession.access_token, options));

    if (response.status === 401) {
      console.log('Reintento también falló. Redirigiendo a login...');
      redirect('/login');
    }
  }

  return {
    ok: response.ok,
    status: response.status,
    data,
  };
}

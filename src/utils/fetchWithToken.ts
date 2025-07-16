'use server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { SessionData } from '@/types/auth';
import getConfig from 'next/config';

export async function fetchWithToken(url: string, options: RequestInit = { method: 'GET' }) { 
  const { publicRuntimeConfig } = getConfig();
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value 

  console.log('la url es:', publicRuntimeConfig.publicBackendUrl, url);

  if (!sessionCookie) {

    console.log('No hay session cookie, se redirige a login');
    const response = await fetch(publicRuntimeConfig.publicBackendUrl + url, options);

    if (!response.ok) {
      if (response.status === 401) {
        redirect('/login');
      }
      const errorMessage = await response.text();
      return { ok: false, error: errorMessage, status: response.status };
    }

    const data = await response.json();
    
    cookieStore.set('session', JSON.stringify(data), {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });

    redirect('/home'); 
  }

  console.log('Hay session cookie, se hace la peticion con token');
  
  const session: SessionData = JSON.parse(sessionCookie);
  
  let response = await fetch(publicRuntimeConfig.publicBackendUrl + url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${session.access_token}`,
    },
  });
  console.log('Se ha hecho la peticion con token');
  
  console.log('Response status before checking token:', response.status);


  if (!response.ok && response.status === 401) {
    console.log('Entraste a la peticion con token, se ha expirado el token');
    
    console.log('Token expired, refreshing token');
    try {
      const newSessionResponse = await fetch(`${publicRuntimeConfig.publicBackendUrl}/auth/refresh-token`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh_token: session.refresh_token }),
        }
      );

      const newSession = await newSessionResponse.json();
      console.log('New session:', newSession);
      

      cookieStore.set('session', JSON.stringify(newSession), {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
      });

      console.log('New session cookie set, retrying request');
      

      response = await fetch(publicRuntimeConfig.publicBackendUrl + url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newSession.access_token}`,
        },
      });

      console.log('Retry response status:', response.status);
      

      if (response.status === 401) {
        redirect('/login');
      }

      let data;
      
      if (options.method !== 'GET') {
        data = await response.text();
      } else {
        data = await response.json();
      }

    } catch (error) {
      redirect('/login');
    }
  }

  let data;
  if (options.method !== 'GET') {
    data = await response.text();
  } else {
    data = await response.json();
  }



  return {ok: true, status: response.status, data: data}; 
}


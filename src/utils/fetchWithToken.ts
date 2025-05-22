'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function fetchWithToken(url: string, options: RequestInit = {}) {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('access_token')?.value

    if (!accessToken) {
        const response = await fetch(url, options)
        
        if (!response.ok) {
          await response.text();
          redirect('/login');
          }

        const data  = await response.json()
        

        await cookieStore.set('access_token', data.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 5 * 60,
            path: '/',
            })


        redirect('/home')
    }

    
  
    const res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    if (!res.ok) {
      throw new Error('Error en la solicitud');
    }
  
    return res.json();
  }
  
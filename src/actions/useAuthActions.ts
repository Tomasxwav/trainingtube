import { Role } from '@/types/employees';
import { Authority } from '@/types/auth';
import { fetchWithToken } from '@/utils/fetchWithToken';
import { clearSessionCookie, getAuthorities as getAuthoritiesCookies } from '@/utils/cookieUtils';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export const useAuthActions = () => {
  const router = useRouter()
  const login = async (email: string, password: string) => {
    try {
      const res = await fetchWithToken('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        return res;
      }
      router.push('/home')
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (name: string, email: string, password: string, role: Role) => {
    try {
      const res = await fetchWithToken('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
      });
      if (!res.ok) throw new Error('Error registering');
      const data = await res.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getAuthorities = () => {
    const [authorities, setAuthorities] = useState<Authority[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchAuthorities = async () => {
        try {
          const userAuthorities = await getAuthoritiesCookies();
          setAuthorities(userAuthorities);
        } catch (error) {
          console.error('Error fetching authorities:', error);
          setAuthorities([]);
        } finally {
          setLoading(false);
        }
      };

      fetchAuthorities();
    }, []);

    return { authorities, loading };
  };

  const deleteSession = async () => {
    try {
      /* const res = await fetchWithToken('/auth/logout', {
        method: 'POST',
      });

      if (!res.ok) {
        throw new Error('Error deleting session');
      } */

      await clearSessionCookie();
      router.push('/login');
    }
    catch (error) {
      console.error('Error deleting session:', error);
    }
  }

  return {
    login,
    register,
    getAuthorities,
    deleteSession,
  };
}
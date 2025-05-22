import { Role } from '@/types/employees';
import { fetchWithToken } from '@/utils/fetchWithToken';
import { redirect } from 'next/navigation';

export const useAuthActions = () => {
  const login = async (email: string, password: string) => {
    try {
      const res = await fetchWithToken('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        return res;
      }
      redirect('/home');
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (name: string, email: string, password: string, role: Role) => {
    try {
      const res = await fetchWithToken('http://localhost:8080/auth/register', {
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

  return {
    login,
    register,
  };
}
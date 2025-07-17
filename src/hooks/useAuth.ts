'use client';

import { useState, useEffect } from 'react';
import { getAuthorities } from '@/utils/getAuthorities';
import { Authority } from '@/types/auth';

export const useAuthorities = () => {
  const [authorities, setAuthorities] = useState<Authority[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthorities = async () => {
      try {
        const userAuthorities = await getAuthorities();
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

export const useHasAuthority = (authority: Authority) => {
  const { authorities, loading } = useAuthorities();
  
  return {
    hasPermission: authorities.includes(authority),
    loading
  };
};

export const useHasAnyAuthority = (authoritiesToCheck: Authority[]) => {
  const { authorities, loading } = useAuthorities();
  
  return {
    hasPermission: authoritiesToCheck.some(auth => authorities.includes(auth)),
    loading
  };
};

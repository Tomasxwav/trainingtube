'use client';

import { Button } from "@/components/ui/button";
import { Film } from "lucide-react";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { isAuthenticated, clearSessionCookie } from '@/utils/cookieUtils';


export const Header = () => {
  const [hasSession, setHasSession] = useState(false);
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  const checkSession = async () => {
    setIsLoadingSession(true);
    try {
      const session = await isAuthenticated();
      setHasSession(session);
    } catch (error) {
      console.error('Error checking session:', error);
      setHasSession(false);
    } finally {
      setIsLoadingSession(false);
    }
  };

  const handleLogout = async () => {
    try {
      await clearSessionCookie();
      setHasSession(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);
  return (
    <header className="border-b bg-background text-foreground backdrop-blur supports-[backdrop-filter]:bg-background scroll-smooth sticky top-0 z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-primary p-2 rounded-lg">
            <Film className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold ">TrainTube</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#caracteristicas" >
            <Button className=" transition-colors cursor-pointer" variant={"ghost"}>
              Características
            </Button>
          </Link>
          <Link href="#roles" >
            <Button className=" transition-colors cursor-pointer" variant={"ghost"}>
              Roles
            </Button>
          </Link>
          <Link href="#contacto" >
            <Button className=" transition-colors cursor-pointer" variant={"ghost"}>
              Contacto
            </Button>
          </Link>
        </nav>


        {isLoadingSession ? 

          <div className='flex items-center space-x-4'>
            <div className='w-30 h-10 bg-white/10 rounded animate-pulse'/>
            <div className='w-30 h-10 bg-white/10 rounded animate-pulse'/>
          </div>

        : !hasSession ?

          <div className="flex items-center space-x-4">
            <Link href="/login" >
              <Button variant="ghost" className="hidden sm:inline-flex cursor-pointer">
                Iniciar Sesión
              </Button>
            </Link>
            <Button className="bg-primary text-foreground transition-colors"> 
              Solicitar Demo
            </Button>
          </div> 

        :

        <div className="flex items-center space-x-4">
            <Link href="/home" >
              <Button variant="ghost" className="hidden sm:inline-flex cursor-pointer">
                Dashboard
              </Button>
            </Link>
            <Button onClick={handleLogout} className="text-white "> 
              Cerrar Sesión
            </Button>
          </div>
        }
      </div>
    </header>
  );
};
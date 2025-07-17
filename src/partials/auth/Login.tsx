'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { Film, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useTheme } from "next-themes"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuthActions } from '@/actions/useAuthActions';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setTheme } = useTheme()
  const router = useRouter()
  
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  }
  
  const { login } = useAuthActions();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await login(email, password ); 
      
      if (!response?.ok) {
        setError(response?.error || '');
      } 
    } catch (err) {
      setError('An error occurred. Please try again.' + err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen h-screen bg-dark-50 flex items-center justify-center p-4">
        <button onClick={toggleTheme} className='absolute top-10 right-10'>XD</button>
      <div className="scale-80 2xl:scale-100 w-full max-w-md bg-foreground/10 rounded-lg shadow-md overflow-hidden animate-fade-in">
        <div className="p-6 sm:p-8">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Film size={24} className="text-background" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-center text-dark-900 mb-6">
            Welcome to TrainTube
          </h1>
          
          <p className="text-center text-dark-600 mb-6">
            Sign in to access your training videos
          </p>
          
          <form onSubmit={handleLogin}>
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md flex items-center gap-2 animate-fade-in">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-dark-700 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-dark-400" />
                </div>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-background py-2 pl-10 pr-3 border border-dark-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-dark-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-dark-400" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-background py-2 pl-10 pr-10 border border-dark-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={18} className="text-dark-400" />
                  ) : (
                    <Eye size={18} className="text-dark-400" />
                  )}
                </button>
              </div>
            </div>
            
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-primary cursor-pointer text-white "
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          
          <div className="mt-8 text-center text-sm text-dark-600">
            <p>Demo Credentials:</p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <div className="bg-dark-50 p-2 rounded-md">
                <p className="font-medium">Admin</p>
                <p>admin@example.com</p>
                <p>admin123</p>
              </div>
              <div className="bg-dark-50 p-2 rounded-md">
                <p className="font-medium">Employee</p>
                <p>employee@example.com</p>
                <p>employee123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
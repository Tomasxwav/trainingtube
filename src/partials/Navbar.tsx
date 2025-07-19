'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Bell, Menu, User, LogOut, Sun } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTheme } from "next-themes";
import MobileSidebar from './MobileSidebar';
import { Button } from '@/components/ui/button';

export default function Navbar({handleSearchChange} : { handleSearchChange: (value: string) => void }) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  }


  const router = useRouter();
  const { setTheme } = useTheme();
  
  const handleLogout = () => {
    router.push('/login');
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  }
  
  return (
    <header className="bg-background border-b border-sidebar-border shadow-sm z-10 w-full">
      <MobileSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center md:hidden">
          <Button
            variant="ghost" 
            className="text-dark-900 hover:text-primary-500 focus:outline-none"
            aria-label="Toggle menu"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu size={24} />
          </Button>
        </div>

        
        <div className={`flex items-center transition-all duration-200 ${isSearchExpanded ? 'flex-grow' : ''}`}>
          <div className={`hidden md:flex items-center h-10  rounded-full px-4 transition-all duration-200 ${isSearchExpanded ? 'w-full' : 'w-96'}`}>
            <Search size={20} className="text-dark-500" />
            <Input
              type="text"
              placeholder="Search videos..."
              className="border-none w-full ml-2 focus:outline-none text-dark-900"
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => setIsSearchExpanded(true)}
              onBlur={() => setIsSearchExpanded(false)}

            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="md:hidden text-dark-900 hover:text-primary-500 focus:outline-none">
            <Search size={24} />
          </button>
          
          <button className="text-dark-900 hover:text-primary-500 focus:outline-none relative">
            <Bell size={24} />
            <span className="absolute top-0 right-0 h-2 w-2 bg-primary-500 rounded-full"></span>
          </button>
          
          <div className="relative">
            <span className="flex items-center space-x-2 focus:outline-none cursor-pointer"  onClick={() => setIsProfileOpen(!isProfileOpen)}>
              <Avatar >
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {/* <span className="hidden md:inline font-medium text-dark-900">{user?.name}</span> */}
            </span>
              
            
           {/*  {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-card rounded-md shadow-lg py-1 z-20 animate-fade-in">
                <div className="px-4 py-2 border-b">
                  <p className="text-sm font-medium text-dark-900">{user?.name}</p>
                  <p className="text-xs text-dark-500">{user?.email}</p>
                </div>
                <button className="flex items-center px-4 py-2 text-sm text-dark-900 hover:bg-dark-50 cursor-pointer" onClick={toggleTheme}>
                  <Sun size={16} className="mr-2" />
                  Toggle Theme
                </button>
                <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-dark-900 hover:bg-dark-50">
                  <User size={16} className="mr-2" />
                  Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-dark-900 hover:bg-dark-50 cursor-pointer"
                >
                  <LogOut size={16} className="mr-2" />
                  Sign out
                </button>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </header>
  );
}
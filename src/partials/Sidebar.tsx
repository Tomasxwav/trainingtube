'use client'

import Link from 'next/link'
import { Home, Film, Users, PlayCircle, ThumbsUp, Clock, Settings, HelpCircle } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';

export default function Sidebar() {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';
  
  const navItems = [
    {
      name: 'Home',
      icon: Home,
      path: '/',
      showFor: ['admin', 'employee'],
    },
    {
      name: 'All Videos',
      icon: PlayCircle,
      path: '/xd',
      showFor: ['employee'],
    },
    {
      name: 'Liked Videos',
      icon: ThumbsUp,
      path: '/liked',
      showFor: ['employee'],
    },
    {
      name: 'Watch Later',
      icon: Clock,
      path: '/watch-later',
      showFor: ['employee'],
    },
    {
      name: 'Dashboard',
      icon: Home,
      path: '/admin',
      showFor: ['admin'],
    },
    {
      name: 'Videos',
      icon: Film,
      path: '/admin/videos',
      showFor: ['admin'],
    },
    {
      name: 'Employees',
      icon: Users,
      path: '/admin/employees',
      showFor: ['admin'],
    },
    {
      name: 'Settings',
      icon: Settings,
      path: '/settings',
      showFor: ['admin', 'employee'],
    },
    {
      name: 'Help',
      icon: HelpCircle,
      path: '/help',
      showFor: ['admin', 'employee'],
    },
  ];
  
  const filteredNavItems = navItems.filter(item => 
    item.showFor.includes(user?.role || '')
  );
  
  return (
    <aside className="hidden md:flex md:flex-col w-64 min-h-screen h-full bg-background border-r border-dark-100 overflow-hidden">
      <div className="flex items-center p-4 border-b border-dark-100">
        <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
          <Film size={18} className="text-foreground" />
        </div>
        <span className="ml-2 text-xl font-bold text-dark-900">TrainTube</span>
        {isAdmin && (
          <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
            Admin
          </span>
        )}
      </div>
      
      <nav className="flex-1 pt-4">
        <ul>
          {filteredNavItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`flex items-center px-4 py-3 text-dark-800 hover:bg-dark-50 transition-colors ${
                  location.pathname === item.path ? 'bg-dark-50 text-primary-600 font-medium' : ''
                }`}
              >
                <item.icon size={20} className={`${
                  location.pathname === item.path ? 'text-primary-500' : 'text-dark-600'
                }`} />
                <span className="ml-3">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-dark-100">
        <p className="text-xs text-dark-500">© 2025 TrainTube</p>
      </div>
    </aside>
  );
}
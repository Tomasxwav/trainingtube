'use client'

import Link from 'next/link'
import { Home, Film, Users, PlayCircle, ThumbsUp, Clock, Settings, HelpCircle, Heart } from 'lucide-react';
import { useAuthActions } from '@/actions/useAuthActions';
import { Authority } from '@/types/auth';
import { navItems } from '@/constants/sidebar-items';

export default function Sidebar() {
  const { getAuthorities } = useAuthActions();
  const { authorities, loading } = getAuthorities();


  const filteredNavItems = navItems.filter(item => 
    item.showFor.some(permission => authorities.includes(permission))
  );

  if (loading) {
    return (
      <aside className="hidden md:flex md:flex-col w-64 min-h-screen bg-background border-r border-dark-100 overflow-hidden">
        <div className="flex items-center p-4 border-b border-dark-100">
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="ml-2 h-6 bg-gray-200 rounded animate-pulse w-24"></div>
        </div>
        <nav className="flex-1 pt-4">
          <ul>
            {[...Array(6)].map((_, i) => (
              <li key={i}>
                <div className="flex items-center px-4 py-3">
                  <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="ml-3 h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    );
  }
  
  return (
    <aside className="hidden md:flex md:flex-col w-64 min-h-screen bg-background border-r border-dark-100 overflow-hidden">
      <Link href='/' className="flex items-center p-4 border-b border-dark-100">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <Film size={18} className="text-white" />
        </div>
        <span className="ml-2 text-xl font-bold text-dark-900">TrainTube</span>
        {authorities.includes('ROLE_ADMIN') && (
          <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
            Admin
          </span>
        )}
        {authorities.includes('ROLE_SUPERVISOR') && (
          <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-tertiary-100 text-tertiary-700 rounded-full">
            Supervisor
          </span>
        )}
      </Link>
      
      <nav className="flex-1 pt-4">
        <ul>
          {filteredNavItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`flex items-center px-4 py-3 text-dark-800 hover:bg-dark-50 transition-colors `}
              >
                <item.icon size={20} />
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
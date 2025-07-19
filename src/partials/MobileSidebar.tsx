'use client';

import { useAuthActions } from '@/actions/useAuthActions';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { navItems } from '@/constants/sidebar-items';
import clsx from 'clsx';
import { Film, X } from 'lucide-react';
import Link from 'next/link';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar( { isOpen, onClose }: MobileSidebarProps) {
  const { getAuthorities } = useAuthActions();
  const { authorities, loading } = getAuthorities();

  const filteredNavItems = navItems.filter(item => 
    item.showFor.some(permission => authorities.includes(permission))
  );

  console.log('Filtered Nav Items:', filteredNavItems);

  return (
    <aside className={clsx("fixed inset-0 z-50 bg-background shadow-lg flex flex-col w-[80vw] h-full transition-transform duration-300 ease-in-out", isOpen ? "translate-x-0" : "-translate-x-full")}>
        {/* Close button */}
        <Button 
          variant="ghost"
          className="cursor-pointer absolute top-4 right-4 z-50"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Logo and title   */}

        <div className="flex items-center space-x-2 p-4">
          <div className="bg-primary p-2 rounded-lg">
            <Film className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold ">TrainTube</span>
        </div>

        <Separator />

        {/* Navigation items */}
        <nav className="flex flex-col space-y-2 p-4 w-full">
            {loading ? (
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              </div>
            ) : (
              filteredNavItems.map((item) => (
                <Link
                  className='flex w-full gap-2'
                  key={item.path}
                  href={item.path}
                  onClick={onClose}
                >
                  <Button 
                    variant="ghost"
                    className="w-full justify-start"
                    aria-label={item.name}
                  >
                    <item.icon className="h-5 w-5 text-foreground" />
                    <span className="ml-2">{item.name}</span>
                  </Button>
                </Link>
              ))
            )}
        </nav>

        {/* Footer */}
        <div className="mt-auto p-4 border-t border-dark-100">
            <p className="text-xs text-dark-500">© 2025 TrainTube</p>
        </div>

        {/* Background */}
        <div  
          className={clsx(
            "fixed left-full transition-opacity opacity-70 bg-black w-screen h-screen -z-10",
            isOpen ? "block " : "hidden"
          )}
          onClick={onClose}
        >
        </div>
        
            
    </aside>
  )
}

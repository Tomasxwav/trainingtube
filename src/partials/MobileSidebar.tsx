'use client';

import { useAuthActions } from '@/actions/useAuthActions';
import { Button } from '@/components/ui/button';
import { navItems } from '@/constants/sidebar-items';
import clsx from 'clsx';
import { Film, Link } from 'lucide-react';

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

  return (
    <aside className={clsx("fixed inset-0 z-50 bg-background shadow-lg flex flex-col w-[80vw] h-full transition-transform duration-300 ease-in-out", isOpen ? "translate-x-0" : "-translate-x-full")}>
        {/* Close button */}
        <Button 
          variant="ghost"
          className="cursor-pointer absolute top-4 right-4 z-50"
          onClick={onClose}
        >
          x
        </Button>

        {/* Logo and title   */}

        <div className="flex items-center space-x-2 p-4">
          <div className="bg-primary p-2 rounded-lg">
            <Film className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold ">TrainTube</span>
        </div>

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
                  className='flex w-full gap-2 '
                  key={item.path}
                  href={item.path}
                  onClick={onClose}
                >
                  <Button 
                    variant="ghost"
                    aria-label={item.name}
                  >
                    <item.icon className="h-5 w-5 text-dark-900" />
                    <span className="ml-2">{item.name}</span>
                    </Button>
                </Link>
              ))
            )}
            <div>Caca</div>
        </nav>
    </aside>
  )
}

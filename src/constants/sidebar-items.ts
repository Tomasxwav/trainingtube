import { Authority } from '@/types/auth';
import { Building2, Clock, Film, Heart, HelpCircle, Home, PlayCircle, Settings, Users } from 'lucide-react';

export const navItems: Array<{
    name: string;
    icon: any;
    path: string;
    showFor: Authority[];
  }> = [
    {
      name: 'Inicio',
      icon: Home,
      path: '/home',
      showFor: ['ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_SUPERVISOR'],
    },
    {
      name: 'Videos pendientes',
      icon: Clock,
      path: '/videos/pending',
      showFor: ['ROLE_EMPLOYEE', 'ROLE_SUPERVISOR'],
    },
    {
      name: 'Todos los videos',
      icon: PlayCircle,
      path: '/videos',
      showFor: ['ROLE_EMPLOYEE', 'ROLE_SUPERVISOR', 'ROLE_ADMIN'],
    },
    // {
    //   name: 'Videos que me gustan',
    //   icon: ThumbsUp,
    //   path: '/videos/liked',
    //   showFor: ['canViewMyInteractions'],
    // },
    {
      name: 'Favoritos',
      icon: Heart,
      path: '/videos/favorites',
      showFor: ['canViewMyInteractions'],
    },
    // {
    //   name: 'Mis métricas',
    //   icon: Home,
    //   path: '/metrics',
    //   showFor: ['canViewMyMetrics'],
    // },
    {
      name: 'Gestion de videos',
      icon: Film,
      path: '/admin/videos-management',
      showFor: ['ROLE_ADMIN'],
    },
    {
      name: 'Empleados',
      icon: Users,
      path: '/admin/employees',
      showFor: ['ROLE_ADMIN'],
    },
    {
      name: 'Empleados',
      icon: Users,
      path: '/supervisor/employees',
      showFor: ['ROLE_SUPERVISOR'],
    },
    {
      name: 'Departamentos',
      icon: Building2,
      path: '/admin/departments',
      showFor: ['ROLE_ADMIN'],
    },
    {
      name: 'Configuración',
      icon: Settings,
      path: '/settings',
      showFor: ['ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_SUPERVISOR'],
    },
    {
      name: 'Ayuda',
      icon: HelpCircle,
      path: '/help',
      showFor: ['ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_SUPERVISOR'],
    },
  ];

// Función para filtrar los items del sidebar basado en las autoridades del usuario
export const getFilteredNavItems = (authorities: Authority[]) => {
  return navItems.filter(item => 
    item.showFor.some(permission => authorities.includes(permission))
  );
};
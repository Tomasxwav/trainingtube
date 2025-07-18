import { Video } from '@/types/videos'
import { ColumnDef } from "@tanstack/react-table"
import { Pencil, Trash2, Eye, Star, Clock, ArrowUpDown, Play } from 'lucide-react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

const departmentColors: Record<string, string> = {
  'engineering': 'bg-blue-100 text-blue-800 border-blue-200',
  'product': 'bg-purple-100 text-purple-800 border-purple-200',
  'marketing': 'bg-green-100 text-green-800 border-green-200',
  'finance': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'hr': 'bg-pink-100 text-pink-800 border-pink-200',
  'it': 'bg-gray-100 text-gray-800 border-gray-200',
  'sales': 'bg-orange-100 text-orange-800 border-orange-200',
  'academy': 'bg-indigo-100 text-indigo-800 border-indigo-200',
  'legal': 'bg-red-100 text-red-800 border-red-200',
}


export const columns: ColumnDef<Video>[] = [
    {
      accessorKey: 'title',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-transparent p-0 font-medium"
          >
            Video
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      enableSorting: true,
      enableColumnFilter: true,
      cell: ({ row }) => {
        const videoUrl = encodeURIComponent(row.original.videoUrl);

        return (
          <div className="flex items-center space-x-3 min-w-[300px]">  
            <Link className="relative" href={`/video?url=${videoUrl}`}>
              <Image 
                src={row.original.thumbnailUrl} 
                alt={row.original.title} 
                width={80} 
                height={50} 
                className="rounded-md object-cover border"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity rounded-md cursor-pointer">
                <Play className="h-6 w-6 text-white" fill="white" />
              </div>
            </Link>
            <div className="space-y-1">
              <p className="font-medium text-foreground leading-tight">{row.original.title}</p>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {row.original.description.substring(0, 20)}{row.original.description.length > 20 ? '...' : ''} 
              </p>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'department',
      header: ({ column }) => {
        return (
          <div className={`flex items-center w-full justify-center`}>
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="hover:bg-transparent p-0 font-medium"
            >
              Departamento
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )
      },
      enableSorting: true,
      enableColumnFilter: true,
      cell: ({ row }) => {
        const department = row.original.department.toLowerCase()
        const colorClass = departmentColors[department] || 'bg-gray-100 text-gray-800 border-gray-200'
        
        return (
          <div className={`flex items-center w-full justify-center`}>
            <Badge 
              variant="outline" 
              className={`capitalize ${colorClass}`}
            >
              {row.original.department}
            </Badge>
          </div>
        )
      },
    },
   /*  {
        accessorKey: 'rating',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="hover:bg-transparent p-0 font-medium"
            >
              Calificación
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        enableSorting: true,
        enableColumnFilter: true,
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{Number(row.original.rating).toFixed(1)}</span>
          </div>
        ),
    },
    {
        accessorKey: 'views',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="hover:bg-transparent p-0 font-medium"
            >
              Vistas
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        enableSorting: true,
        enableColumnFilter: true,
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-muted-foreground" />
            <span>{row.original.views?.toLocaleString() || '0'}</span>
          </div>
        ),
    }, */
    {
        accessorKey: 'duration',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="hover:bg-transparent p-0 font-medium"
            >
              Duración
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        enableSorting: true,
        enableColumnFilter: true,
        cell: ({ row }) => {
          const duration = row.original.duration || 0
          const minutes = Math.floor(duration / 60)
          const seconds = duration % 60
          
          return (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{minutes}:{seconds.toString().padStart(2, '0')}</span>
            </div>
          )
        },
    },
    {
        accessorKey: 'uploadDate',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="hover:bg-transparent p-0 font-medium"
            >
              Subido
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        enableSorting: true,
        enableColumnFilter: true,
        cell: ({ row }) => {
          const date = new Date(row.original.uploadDate);
          const now = new Date();
          const diffTime = Math.abs(now.getTime() - date.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          
          let timeAgo = '';
          if (diffDays === 1) timeAgo = 'Ayer';
          else if (diffDays < 7) timeAgo = `Hace ${diffDays} días`;
          else if (diffDays < 30) timeAgo = `Hace ${Math.floor(diffDays / 7)} semanas`;
          else timeAgo = date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' });
          
          return (
            <div className="space-y-1">
              <div className="font-medium">
                {date.toLocaleDateString('es-ES', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
              <div className="text-xs text-muted-foreground">{timeAgo}</div>
            </div>
          );
        },
    },
    {
      accessorKey: 'actions',
      header: 'Acciones',
      enableSorting: false,
      enableColumnFilter: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              // TODO: Implementar funcionalidad de edición
              console.log('Editar video:', row.original.id)
            }}
            className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            <Pencil size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              // TODO: Implementar funcionalidad de eliminación
              console.log('Eliminar video:', row.original.id)
            }}
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      ),
    },  
]
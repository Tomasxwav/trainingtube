import { Video } from '@/types/videos'
import { ColumnDef } from "@tanstack/react-table"
import { Pencil, Trash2 } from 'lucide-react'
import Image from 'next/image'


export const columns: ColumnDef<Video>[] = [
    {
        accessorKey: 'title',
        header: 'Title',
        enableSorting: true,
        enableColumnFilter: true,
        cell: ({ row }) => (
          <div className="flex items-center space-x-2 w-[50vw]">  
              <Image src={row.original.thumbnailUrl} alt={row.original.title} width={150} height={100} className="rounded w-38 h-24" />    
              <span>{row.original.title}</span>
          </div>
      ),
    },
    {
        accessorKey: 'department',
        header: 'Department',
        enableSorting: true,
        enableColumnFilter: true,
        cell: ({ row }) => (
          <span className="capitalize">{row.original.department.toLowerCase()}</span>
        ),
    },
/*     {
        accessorKey: 'duration',
        header: 'Duration',
        enableSorting: true,
        enableColumnFilter: true,
    },
    {
        accessorKey: 'views',
        header: 'Views',
        enableSorting: true,
        enableColumnFilter: true,
    },
    {
        accessorKey: 'rating',
        header: 'Rating',
        enableSorting: true,
        enableColumnFilter: true,
    }, */
    {
        accessorKey: 'uploadDate',
        header: 'Uploaded',
        enableSorting: true,
        enableColumnFilter: true,
        cell: ({ row }) => {
          const date = new Date(row.original.uploadDate);
          return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });
        },
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      enableSorting: false,
      enableColumnFilter: false,
      cell: ({ row }) => (
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => {}}
            className="p-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => {}}
            className="p-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },  
]
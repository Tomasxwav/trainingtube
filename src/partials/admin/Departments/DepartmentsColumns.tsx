import { ColumnDef } from "@tanstack/react-table"
import { Pencil, Trash2, ArrowUpDown, Eye, EyeOff } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Department } from '@/types/employees'

interface DepartmentTableMeta {
  onEdit: (department: Department) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string, isActive: boolean, departmentName: string) => void;
}

export const createColumns = (meta: DepartmentTableMeta): ColumnDef<Department>[] => [
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-transparent p-0 font-medium"
          >
            Nombre
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      enableSorting: true,
      enableColumnFilter: true,
      cell: ({ row }) => {
        return (
          <div >  
            {row.original.name}
          </div>
        )
      },
    },
    {
      accessorKey: 'description',
      header: ({ column }) => {
        return (
          <div>
              Descripción
          </div>
        )
      },
      cell: ({ row }) => {
        return (
          <div className={`text-foreground/40`}>
            {row.original.description}
          </div>
        )
      },
    },
    {
        accessorKey: 'active',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="hover:bg-transparent p-0 font-medium w-full flex items-center justify-center"

            >
              Estado
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        enableSorting: true,
        enableColumnFilter: true,
        cell: ({ row }) => {
          return (
            <div className="w-full flex items-center justify-center"> 
              <Badge variant={row.original.active ? 'destructive' : 'default'}>
                {row.original.active ? 'Activo' : 'Inactivo'}
              </Badge>
            </div>
          )
        },
    },
    {
      accessorKey: 'actions',
      enableSorting: false,
      enableColumnFilter: false,
      header: ({ column }) => {
        return (
            <div className="w-full flex items-center justify-center">
                Acciones
            </div>
            )
        },
      cell: ({ row }) => (
        <div className="w-full flex items-center justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
                meta.onToggle(row.original.id, !row.original.active, row.original.name)
            }}
            className="h-8 w-8 p-0 text-foreground hover:text-foreground/80 hover:bg-green-50" 
          >
            {row.original.active ? (
              <Eye size={16} />
              ) : (
                <EyeOff size={16} className='text-foreground/50' />
              )}
              
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              meta.onEdit(row.original)
            }}
            className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            <Pencil size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
                meta.onDelete(row.original.id)
            }}
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 size={16} />
          </Button>
          
        </div>
      ),
    },  
]
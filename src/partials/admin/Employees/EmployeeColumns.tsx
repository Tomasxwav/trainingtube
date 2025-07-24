import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Employee, Roles } from '@/types/employees';
import { sinceDate } from '@/utils/sinceDate';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@radix-ui/react-select';
import { ColumnDef } from '@tanstack/react-table';
import { ChevronUp, ChevronDown, Edit, Trash2 } from 'lucide-react';

interface DepartmentTableMeta {
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
  onRoleChange: (id: string, role: Roles) => void;
}



export const createColumns = (meta: DepartmentTableMeta): ColumnDef<Employee>[] => [
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-auto p-0 font-semibold"
          >
            Empleado
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ChevronDown className="ml-2 h-4 w-4" />
            ) : null}
          </Button>
        );
      },
      cell: ({ row }) => {
        const employee = row.original;
        const displayName = employee.name || 'Empleado desconocido';
        const initials = displayName
          .split(' ')
          .map(n => n[0])
          .join('')
          .toUpperCase();
        
        return (
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{displayName}</div>
              <div className="text-sm text-muted-foreground">{employee.email}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'role',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-auto p-0 font-semibold"
          >
            Rol
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ChevronDown className="ml-2 h-4 w-4" />
            ) : null}
          </Button>
        );
      },
      cell: ({ row }) => {
        const employee = row.original;
        const getRoleBadgeVariant = (role: Roles) => {
            switch (role) {
                case 'ADMIN':
                return 'destructive';
                case 'SUPERVISOR':
                return 'default';
                case 'EMPLOYEE':
                return 'secondary';
                default:
                return 'outline';
            }
        };
        return (
          <Select
            value={employee.role.name}
            onValueChange={(value: Roles) => meta.onRoleChange(employee.id, value.toUpperCase() as Roles)}
          >
            <SelectTrigger className="w-32">
              <SelectValue>
                <Badge variant={getRoleBadgeVariant(employee.role.name)} className="capitalize">
                  {employee.role.name.toLocaleLowerCase()}
                </Badge>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="employee">
                <Badge variant="secondary" className="capitalize">
                  Empleado
                </Badge>
              </SelectItem>
              <SelectItem value="supervisor">
                <Badge variant="default" className="capitalize">
                  Supervisor
                </Badge>
              </SelectItem>
              <SelectItem value="admin">
                <Badge variant="destructive" className="capitalize">
                  Administrador
                </Badge>
              </SelectItem>
            </SelectContent>
          </Select>
        );
      },
      filterFn: (row, id, value) => {
        const employee = row.original as Employee;
        return value.includes(employee.role.name);
      },
    },
    {
      accessorKey: 'department',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-auto p-0 font-semibold"
          >
            Departamento
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ChevronDown className="ml-2 h-4 w-4" />
            ) : null}
          </Button>
        );
      },
      cell: ({ row }) => {
        const department = row.original.department.name;
        
        return (
          <span className="text-muted-foreground capitalize">

            {department || 'No asignado'} 
          </span>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-auto p-0 font-semibold"
          >
            Ingreso
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ChevronDown className="ml-2 h-4 w-4" />
            ) : null}
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <span className="text-muted-foreground">
            {sinceDate(row.getValue('createdAt'))}
          </span>
        );
      },
    },
    {
      id: 'actions',
      header: 'Acciones',
      cell: ({ row }) => {
        const employee = row.original;
        
        return (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => meta.onEdit(employee)}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => meta.onDelete(employee.id)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];
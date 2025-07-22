'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Employee, Role, Roles } from '@/types/employees';
import { employeeSchema, EmployeeFormData } from '@/schema/employees/employeeSchema';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useDepartmentStore } from '@/stores/departmentStore';


interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EmployeeFormData) => void;
  employee?: Employee | null;
}

export function EmployeeModal({ isOpen, onClose, onSubmit, employee }: EmployeeModalProps) {
  const departments = useDepartmentStore((state) => state.departments);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'EMPLOYEE',
      department: '',
    },
  });

  const watchedRole = watch('role');

  useEffect(() => {
    if (employee) {
      reset({
        name: employee.name,
        email: employee.email,
        password: '',
        role: employee.role.name,
        department: employee.department.name || '',
      });
    } else {
      reset({
        name: '',
        email: '',
        password: '',
        role: 'EMPLOYEE',
        department: '',
      });
    }
  }, [employee, reset]);

  const onFormSubmit = (data: EmployeeFormData) => {
    const submitData = {
      ...data,
      password: data.password || (employee ? employee.password : ''),
      department: data.department || '',
      role: data.role.toUpperCase() as Roles,
    };
    onSubmit(submitData);
    handleClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {employee ? 'Editar Empleado' : 'Agregar Nuevo Empleado'}
          </DialogTitle>
          <DialogDescription>
            {employee
              ? 'Actualiza la información del empleado abajo.'
              : 'Completa los datos para crear una nueva cuenta de empleado.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          {/* Nombre */}
          <div className="space-y-2">
            <Label htmlFor="name">Nombre Completo</Label>
            <Input
              id="name"
              {...register('name', {
                required: 'El nombre es obligatorio',
                minLength: {
                  value: 2,
                  message: 'El nombre debe tener al menos 2 caracteres',
                },
              })}
              placeholder="Ingresa el nombre completo"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Correo */}
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              {...register('email', {
                required: 'El correo es obligatorio',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Correo electrónico inválido',
                },
              })}
              placeholder="Ingresa el correo electrónico"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Contraseña */}
          <div className="space-y-2">
            <Label htmlFor="password">
              {employee ? 'Nueva Contraseña (deja vacío para mantener la actual)' : 'Contraseña'}
            </Label>
            <Input
              id="password"
              type="password"
              {...register('password', {
                required: employee ? false : 'La contraseña es obligatoria',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres',
                },
              })}
              placeholder={employee ? 'Ingresa nueva contraseña (opcional)' : 'Ingresa la contraseña'}
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          {/* Rol */}
          <div className="space-y-2">
            <Label>Rol</Label>
            <Select
              value={watchedRole}
              onValueChange={(value: Roles) => setValue('role', value)}
            >
              <SelectTrigger>
                <SelectValue>
                  <Badge
                    variant={
                      watchedRole === 'ADMIN'
                        ? 'destructive'
                        : watchedRole === 'SUPERVISOR'
                        ? 'default'
                        : 'secondary'
                    }
                    className="capitalize"
                  >
                    {watchedRole}
                  </Badge>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EMPLOYEE">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="capitalize">
                      Empleado
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Acceso básico al contenido de capacitación
                    </span>
                  </div>
                </SelectItem>
                <SelectItem value="SUPERVISOR">
                  <div className="flex items-center space-x-2">
                    <Badge variant="default" className="capitalize">
                      Supervisor
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Puede gestionar equipo y contenido
                    </span>
                  </div>
                </SelectItem>
                <SelectItem value="ADMIN">
                  <div className="flex items-center space-x-2">
                    <Badge variant="destructive" className="capitalize">
                      Administrador
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Acceso total al sistema
                    </span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-sm text-destructive">{errors.role.message}</p>
            )}
            
          </div>

          {/* Departamento */}
          <div className="space-y-2">
            <Label>Departamento</Label>
            <Select
              value={watch('department')}
              onValueChange={(value) => setValue('department', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un departamento" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.name}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.department && (
              <p className="text-sm text-destructive">{errors.department.message}</p>
            )}  
          </div>

          <DialogFooter className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? 'Guardando...'
                : employee
                ? 'Actualizar Empleado'
                : 'Crear Empleado'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

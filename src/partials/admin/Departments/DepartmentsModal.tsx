'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Department } from '@/types/employees';
import { DepartmentFormData } from './DepartmentsManagement';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { departmentsSchema } from '@/schema/departments/departmentsSchema';
import { z } from 'zod';

type FormValues = z.infer<typeof departmentsSchema>;

export interface DepartmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DepartmentFormData) => void;
  department?: Department | null;
}

export function DepartmentsModal({
  isOpen,
  onClose,
  onSubmit,
  department,
}: DepartmentsModalProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(departmentsSchema),
    defaultValues: {
      name: '',
      description: '',
      active: true,
    },
  });

  useEffect(() => {
    if (department) {
      form.reset({
        name: department.name,
        description: department.description,
        active: department.active,
      });
    } else {
      form.reset({
        name: '',
        description: '',
        active: true,
      });
    }
  }, [department, isOpen, form]);

  const handleSubmit = (data: FormValues) => {
    onSubmit(data as DepartmentFormData);
    form.reset();
  };

  const handleClose = () => {
    onClose();
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {department ? 'Editar Departamento' : 'Agregar Nuevo Departamento'}
          </DialogTitle>
          <DialogDescription>
            {department 
              ? 'Modifica la información del departamento' 
              : 'Completa los datos para crear un nuevo departamento'
            }
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nombre del Departamento <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Recursos Humanos" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Descripción <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe las responsabilidades y funciones del departamento"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="cursor-pointer">
                      Departamento activo
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Los departamentos activos aparecerán en los selectores del sistema
                    </p>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Guardando...' : (department ? 'Actualizar' : 'Crear')} Departamento
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
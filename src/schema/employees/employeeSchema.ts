import { z } from 'zod';

export const employeeSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre debe tener menos de 50 caracteres'),
  email: z
    .string()
    .email('Correo electrónico inválido')
    .toLowerCase(),
  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  role: z.enum(['ADMIN', 'EMPLOYEE', 'SUPERVISOR'], {
    required_error: 'El rol es obligatorio',
  }),
  department: z
    .string()
    .min(1, 'El departamento es obligatorio')
});

export const createEmployeeSchema = employeeSchema.required({
  password: true,
});

export const updateEmployeeSchema = employeeSchema.extend({
  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .optional(),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;
export type CreateEmployeeData = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeData = z.infer<typeof updateEmployeeSchema>;

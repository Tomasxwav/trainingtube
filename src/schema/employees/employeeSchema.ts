import { z } from 'zod';

export const employeeSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z
    .string()
    .email('Invalid email address')
    .toLowerCase(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .optional()
    .or(z.literal('')),
  role: z.enum(['admin', 'employee', 'supervisor'], {
    required_error: 'Role is required',
  }),
  department: z
    .string()
    .min(1, 'Department is required')
    .optional(),
});

export const createEmployeeSchema = employeeSchema.required({
  password: true,
});

export const updateEmployeeSchema = employeeSchema.extend({
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .optional(),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;
export type CreateEmployeeData = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeData = z.infer<typeof updateEmployeeSchema>;

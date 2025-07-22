import { z } from 'zod';

export const departmentsSchema = z.object({
  name: z.string().min(2, {
    message: 'El nombre del departamento debe tener al menos 2 caracteres.',
  }),
  description: z.string().min(2, {
    message: 'La descripción del departamento debe tener al menos 2 caracteres.',
  }),
  active: z.boolean(),
});
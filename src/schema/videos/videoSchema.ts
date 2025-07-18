import { z } from "zod";

// Constantes para la validación de archivos
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/ogg",
];

export const videoSchema = z.object({
  title: z.string().min(2, {
    message: "El título debe tener al menos 2 caracteres.",
  }),
  description: z.string().min(2, {
    message: "La descripción debe tener al menos 2 caracteres.",
  }),
  thumbnail: z.instanceof(File),
  video: z
    .instanceof(File)
    .refine(
      (file) => !file || file instanceof File,
      "Debe ser un archivo válido"
    )
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE * 10, // 50MB para video
      `El video debe ser menor a ${(MAX_FILE_SIZE * 10) / 1024 / 1024}MB`
    )
    .refine(
      (file) => !file || ACCEPTED_VIDEO_TYPES.includes(file.type),
      "Solo se permiten formatos de video .mp4, .webm y .ogg"
    ),
  department:  z
    .string()
    .min(1, 'El departamento es obligatorio'),
  tags: z.array(z.string()).optional(),
});

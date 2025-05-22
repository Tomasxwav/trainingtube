import { z } from "zod";

// Constants for file validation
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
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  thumbnail: z.instanceof(File),
  video: z
    .instanceof(File)
    .refine(
      (file) => !file || file instanceof File,
      "Must be a valid file"
    )
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE * 10, // 50MB for video
      `Video must be less than ${(MAX_FILE_SIZE * 10) / 1024 / 1024}MB`
    )
    .refine(
      (file) => !file || ACCEPTED_VIDEO_TYPES.includes(file.type),
      "Only .mp4, .webm and .ogg video formats are supported"
    ),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
});
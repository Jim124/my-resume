import * as z from 'zod';
import { ZodSchema } from 'zod';

export const profileResumeSchema = z.object({
  name: z.string().min(2, { message: 'Name must be 2 characters' }),
  email: z.string().min(8, { message: 'Email must be at least 8 characters' }),
  phone: z.string().min(8, { message: 'Phone must be at least 8 characters' }),
  portfolio: z
    .string()
    .min(8, { message: 'portfolio must be at least 8 characters' }),
  profession: z
    .string()
    .min(8, { message: 'Profession must be at least 8 characters' }),
  careerObjective: z
    .string()
    .min(8, { message: 'Career Objective must be at least 8 characters' }),
  address: z
    .string()
    .min(8, { message: 'Address must be at least 8 characters' }),
  education: z
    .string()
    .array()
    .nonempty({ message: "Education can't be empty!" }),
  skills: z.string().array().nonempty({ message: "Skills can't be empty!" }),
  experience: z
    .string()
    .array()
    .nonempty({ message: "Experience can't be empty!" }),
});

export function validateFieldSchema<T>(schema: ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(', '));
  }
  return result.data;
}

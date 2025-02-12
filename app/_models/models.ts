import { z } from 'zod';

// Auth
export const LoginFormSchema = z.object({
  email: z.string().email('Invalid email format'),
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(20, 'Name must be at most 20 characters')
    .regex(/^[a-zA-Z]+$/, 'Name can only contain letters (a-z, A-Z)'),
});
export type LoginFormData = z.infer<typeof LoginFormSchema>;

// Search
export type SearchResults = {
  next?: string;
  prev?: string;
  resultIds: string[];
  total: number;
};

// Search Preferences
export const breedPreferencesSchema = z.record(z.string(), z.boolean());
export const SortByEnum = z.enum(['breed', 'name', 'age']);
export type SortBy = z.infer<typeof SortByEnum>;
export const OrderByEnum = z.enum(['asc', 'desc']);
export type OrderBy = z.infer<typeof OrderByEnum>;

export const searchPreferencesSchema = z.object({
  all: z.boolean(),
  breedPreferences: breedPreferencesSchema,
  minAge: z.number(),
  maxAge: z.number(),
  sortBy: SortByEnum,
  orderBy: OrderByEnum,
});
export type PreferencesData = z.infer<typeof searchPreferencesSchema>;

// Components
export type ResultIds = string[];
export type Dog = {
  img: string;
  name: string;
  id: string;
  age: number;
  breed: string;
  zip_code: number;
};

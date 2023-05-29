import { z } from 'zod';

export const credentialsAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'min_8').max(20, 'min_20'),
});

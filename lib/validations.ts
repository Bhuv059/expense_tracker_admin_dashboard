import { z } from "zod";

export const UserSchemaqqqq = z.object({
  id: z.string(),
  name: z.string().min(5).max(50),
  email: z.string().min(5).max(50),
  phone: z.string().min(5).max(50),
  address: z.string().min(5).max(50),
});

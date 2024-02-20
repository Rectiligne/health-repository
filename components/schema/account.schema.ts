import { z } from "zod";

export const userAccountFormSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  /* email: z.string().min(1, "Email necessaire").email("Email non valide"), */
});

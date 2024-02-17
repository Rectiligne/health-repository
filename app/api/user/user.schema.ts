import * as z from "zod";

export const UserSchemaLogOn = z
  .object({
    email: z.string().min(1, "Email necessaire").email("Email non valide"),
    password: z
      .string()
      .min(1, "Mot de passe necessaire")
      .min(8, "Mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: z
      .string()
      .min(1, "Confirmation du mot de passe necessaire"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export const UserSchemaLogIn = z.object({
  email: z.string().min(1, "Email necessaire").email("Email non valide"),
  password: z
    .string()
    .min(1, "Mot de passe necessaire")
    .min(8, "Mot de passe doit contenir au moins 8 caractères"),
});

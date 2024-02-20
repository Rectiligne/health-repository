import { z } from "zod";

export const providerFormSchema = z.object({
  github_access_token: z.string().optional(),
  github_endpoint: z.string().optional(),
  gitlab_access_token: z.string().optional(),
  gitlab_endpoint: z.string().optional(),
});

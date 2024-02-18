import type { User } from "@prisma/client";
import "next-auth";

declare module "next-auth" {
  interface AuthUser extends User {}

  interface Session {
    user: AuthUser;
    token: {
      id: number;
      email: string;
    };
  }
}

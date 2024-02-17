import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    email: string;
  }
  interface Session {
    user: User;
    token: {
      id: number;
      email: string;
    };
  }
}

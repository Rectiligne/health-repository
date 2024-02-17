// imports
import NextAuth from "next-auth";

import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/error",
  },
});

export { handler as GET, handler as POST };

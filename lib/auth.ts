import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import prisma from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@mail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }
        const isValid = await compare(credentials.password, user.password!);

        if (!isValid) {
          return null;
        }

        const { password, ...rest } = user;

        return {
          ...rest,
        };
      },
    }),
  ],
  callbacks: {
    /*  async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },  */
    async session({ session, token }) {
      let user = null;

      if (token) {
        const data = await prisma.user.findUnique({
          where: {
            email: token.email!,
          },
        });
        const { password, ...userData } = data!;

        user = {
          ...userData,
        };
      }

      return {
        ...session,
        user: { ...user },
      };
    },
    async jwt({ token, user }) {
      if (user) {
        return { ...token, id: user.id, email: user.email };
      }
      return token;
    },
  },
};

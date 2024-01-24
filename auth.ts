import NextAuth, { type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "@/auth.config";
import prisma from "@/lib/db";
import { getUserById } from "@/data/user";

export type ExtendedUser = DefaultSession["user"] & {
  role: "ADMIN" | "USER";
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({user, account}){
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id)
      if (!existingUser?.emailVerified){
        return false;
      }

      return true
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as "ADMIN" | "USER";
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;
      const user = await getUserById(token.sub);
      if (!user) return token;

      token.role = user.role;

      return token;
    },
  },
  events: {
    linkAccount: async ({ user }) => {
      await prisma.user.update({
        where: {
          id: user.id
        },
        data:{emailVerified: new Date()}
      });
    },
  },
  session: { strategy: "jwt" },

  ...authConfig,
});

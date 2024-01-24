import Credential from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { LoginAuthShema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

import bcrypt from "bcryptjs";

export default {
  providers: [
    Credential({
      async authorize(credentials, req) {
        const validated = LoginAuthShema.safeParse(credentials);

        if (validated.success) {
          const { email, password } = validated.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const matchingPassword = await bcrypt.compare(
            password,
            user.password
          );

          if (matchingPassword) return user;
        }
        return null;
      },
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthConfig;

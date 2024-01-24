"use server";

import { signIn } from "@/auth";
import { getVerificationTokenByEmail } from "@/data/token";
import { getUserByEmail, getUserById } from "@/data/user";
import { sendVerificationToken } from "@/lib/resend";
import { generateVerificationToken } from "@/lib/tokens";
import { REDIRECT_AUTH } from "@/route";
import { LoginAuthShema } from "@/schemas";
import { error } from "console";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginAuthShema>) => {
  const validated = LoginAuthShema.safeParse(values);
  if (!validated.success) {
    return { error: "Remplir les champs correctement" };
  }
  const { email, password } = validated.data;

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.password) {
    return { error: "Reesayer avec google ou github" };
  }

  if(!existingUser.emailVerified){
    const token = await generateVerificationToken(email);
    await sendVerificationToken(token.email, token.token)
     return {success: "Email dèja envoyé"}
  }


  try {
    await signIn("credentials", { email, password, redirectTo: REDIRECT_AUTH });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Email ou mot de passe incorrect" };

        default:
          return { error: "une erreur s' est produite" };
      }
    }
    throw error;
  }
};

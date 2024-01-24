"use server";

import { RegisterAuthShema } from "@/schemas";
import * as z from "zod";
import prisma from '@/lib/db'
import bcrypt from 'bcryptjs'
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationToken } from "@/lib/resend";


export const register = async (values: z.infer<typeof RegisterAuthShema>) => {
  const validated = RegisterAuthShema.safeParse(values);

  if (!validated.success) return { error: "une erreur s' est produite" };

  const {name, email, password} = validated.data
  const hashedPass = await bcrypt.hash(password, 10)
  
  const existingUser = await getUserByEmail(email);
  
  if (existingUser) {
    return { error: "User Already exist" }
  }
  
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPass,
    }
  })

  const verificationToken = await generateVerificationToken(email);

  // TODO: Implement 2FA
  await sendVerificationToken(verificationToken.email, verificationToken.token)


  
  return { success: "Email envoyé" };
};

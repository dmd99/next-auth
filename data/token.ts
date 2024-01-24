import prisma from "@/lib/db";

export const getVerificationTokenByEmail = async (email: string) => {
  const verificationToken = await prisma.verificationToken.findFirst({
    where: { email },
  });
  return verificationToken;
};

export const getVerificationTokenByToken = async (token: string) => {
  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
  });
  return verificationToken;
};

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
export const sendVerificationToken = async (email: string, token: string) => {
  await resend.emails.send({
    from: "Ecsam <onboarding@resend.dev>",
    to: [email],
    subject: "Test Verification token",
    html: `<p> Salut Maboury clique: <a href="http://localhost:3000/verify-user?token${token}">ICI</a> </p>`,
  });
};

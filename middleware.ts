import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  REDIRECT_AUTH,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/route";
export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLogged = !!req.auth;

  const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLogged) {
      return Response.redirect(new URL(REDIRECT_AUTH, nextUrl));
    }
    return null;
  }

  if (!isLogged && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return null;

});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

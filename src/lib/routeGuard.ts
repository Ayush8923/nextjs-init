"use client";

import { redirect } from "next/navigation";

type Middleware = "guest" | "auth" | "admin";

interface AuthRedirectOptions {
  middleware: Middleware;
  redirectIfAuthenticated?: string;
  pathname: string;
  user: any | null;
}

export function handleAuthRedirect({
  middleware,
  redirectIfAuthenticated,
  pathname,
  user,
}: AuthRedirectOptions) {
  const isAdminMiddleware = () => middleware === "admin";
  const isGuestOrAuthMiddleware = () =>
    middleware === "guest" || middleware === "auth";
  const isAdminRoute = () => pathname.startsWith("/admin");
  const isVerifyEmailPage = () => pathname === "/verify-email";
  const isUserAdmin = () =>
    user &&
    user?.roles?.some((role: { name: string }) => role.name === "admin");

  const getRedirectPathIfAuthenticated = () => {
    if (user && !user.email_verified_at) return "/verify-email";
    if (!user?.country || !user?.state) return "/account-details";
    if (!user?.profile_handle) return "/profile-details";
    return redirectIfAuthenticated ?? "/";
  };

  if (pathname === "/consent") return;

  if (isGuestOrAuthMiddleware() && user && !user?.dob) {
    redirect("/consent");
  }

  if (isGuestOrAuthMiddleware() && redirectIfAuthenticated && user) {
    redirect(getRedirectPathIfAuthenticated());
  }

  if (isVerifyEmailPage() && user && user?.email_verified_at) {
    redirect(redirectIfAuthenticated ?? "/dashboard");
  }

  if (isAdminRoute() && isAdminMiddleware()) {
    if (!user) {
      if (pathname !== "/admin/login") redirect("/admin/login");
      return;
    } else if (!isUserAdmin()) {
      redirect("/");
    } else if (
      isAdminMiddleware() &&
      redirectIfAuthenticated &&
      user &&
      isUserAdmin()
    ) {
      redirect(redirectIfAuthenticated);
    }
  }
}

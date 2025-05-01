"use client";

import { redirect } from "next/navigation";
import { AGE_LIMIT, calculateAge, getCookie } from "./common";

type Middleware = "guest" | "auth" | "admin";

interface AuthRedirectOptions {
  middleware: Middleware;
  redirectIfAuthenticated?: string;
  pathname: string;
  user: any | null;
  error: any;
}

const hasDOBInCookie = () => getCookie("DOB");
const isAdminRoute = (pathname: string) => pathname.startsWith("/admin");
const isVerifyEmailPage = (pathname: string) => pathname === "/verify-email";
const isUserAdmin = (user: any) =>
  user?.roles?.some((role: { name: string }) => role.name === "admin");
const isGuestOrAuthMiddleware = (middleware: string) =>
  middleware === "guest" || middleware === "auth";
const isAdminMiddleware = (middleware: string) => middleware === "admin";

export function handleAuthRedirect({
  middleware,
  redirectIfAuthenticated,
  pathname,
  user,
  error,
}: AuthRedirectOptions) {
  const dobFromCookie = getCookie("DOB");
  const isLegalAge = calculateAge(dobFromCookie) >= AGE_LIMIT;
  const getPostAuthRedirectPath = () => {
    if (user && !user.email_verified_at) return "/verify-email";
    if (!user?.country || !user?.state) return "/account-details";
    if (!user?.profile_handle) return "/profile-details";
    return redirectIfAuthenticated ?? "/dashboard";
  };

  const safeRedirect = (target: string) => {
    const normalize = (url: string) =>
      decodeURIComponent(url.replace(/\/+$/, "").toLowerCase());

    const normalizedTarget = normalize(target);
    const normalizedCurrent = normalize(pathname);

    if (normalizedTarget !== normalizedCurrent) {
      redirect(target);
    }
  };

  if (pathname === "/consent") return;

  // eslint-disable-next-line no-console
  console.log(
    isGuestOrAuthMiddleware(middleware),
    user,
    !user?.dob,
    !hasDOBInCookie(),
    !isLegalAge,
    "==>From routeGuard Method"
  );
  if (
    isGuestOrAuthMiddleware(middleware) &&
    user &&
    !user?.dob &&
    (!hasDOBInCookie() || !isLegalAge)
  ) {
    safeRedirect("/consent");
    return;
  } else if (isLegalAge && pathname === "/no-access") {
    const target = getPostAuthRedirectPath();
    safeRedirect(target);
    return;
  }

  if (isGuestOrAuthMiddleware(middleware) && redirectIfAuthenticated && user) {
    const target = getPostAuthRedirectPath();
    safeRedirect(target);
    return;
  }

  if (isVerifyEmailPage(pathname) && user && user?.email_verified_at) {
    const target = redirectIfAuthenticated ?? "/dashboard";
    safeRedirect(target);
    return;
  }

  if (isAdminRoute(pathname) && isAdminMiddleware(middleware)) {
    if (!user) {
      safeRedirect("/admin/login");
      return;
    } else if (!isUserAdmin(user)) {
      safeRedirect("/");
      return;
    } else if (redirectIfAuthenticated && isUserAdmin(user)) {
      safeRedirect(redirectIfAuthenticated);
      return;
    }
  }

  if (!user && error) {
    if (error?.response?.status === 409) {
      safeRedirect("/verify-email");
      return;
    }

    if (middleware === "auth") {
      safeRedirect("/login");
    }
  }
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AGE_LIMIT, calculateAge } from "@/lib/common";

const GUEST_ROUTES = ["/no-access", "/sign-up"];

export function middleware(request: NextRequest) {
  const dob = request.cookies.get("DOB")?.value;
  // eslint-disable-next-line no-console
  console.log(dob, "==>dob")
  const age = dob ? calculateAge(dob) : null;
  const { pathname } = request.nextUrl;

  if (pathname === "/admin") {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // eslint-disable-next-line no-console
  console.log(!dob, pathname, GUEST_ROUTES, "==> from middleware");
  if (!dob && GUEST_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/consent", request.url));
  }

  if (pathname === "/sign-up" && age !== null && age <= AGE_LIMIT) {
    return NextResponse.redirect(new URL("/no-access", request.url));
  }

  return NextResponse.next();
}

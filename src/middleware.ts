import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AGE_LIMIT, calculateAge } from "@/lib/common";

export function middleware(request: NextRequest) {
  const dob = request.cookies.get("DOB")?.value;
  const age = dob ? calculateAge(dob) : null;

  if (!dob) {
    return NextResponse.redirect(new URL("/consent", request.url));
  }

  if (
    request.nextUrl.pathname === "/login" &&
    age !== null &&
    age <= AGE_LIMIT
  ) {
    return NextResponse.redirect(new URL("/no-access", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/no-access", "/login"],
};

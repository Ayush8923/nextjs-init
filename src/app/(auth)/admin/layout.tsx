"use client";

import { Loading } from "@/components";
import { useAuth } from "@/hooks/auth";

export default function AdminGuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useAuth({
    middleware: "admin",
    redirectIfAuthenticated: "/admin/dashboard",
  });

  if (isLoading) {
    return <Loading />;
  }

  return <main className="w-full">{children}</main>;
}

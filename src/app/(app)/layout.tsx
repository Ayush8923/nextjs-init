"use client";

import { useAuth } from "@/hooks/auth";
import Loading from "@/components/Loading";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";

const AppLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const authMiddleware = pathname.startsWith("/admin") ? "admin" : "auth";
  const { isLoading } = useAuth({ middleware: authMiddleware });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      <main>{children}</main>
      <SpeedInsights />
    </div>
  );
};

export default AppLayout;

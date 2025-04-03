"use client";

import { useAuth } from "@/hooks/auth";
import Loading from "@/components/Loading";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

const AppLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const authMiddleware = pathname.startsWith("/admin") ? "admin" : "auth";
  const { user } = useAuth({ middleware: authMiddleware });

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      <main>{children}</main>
    </div>
  );
};

export default AppLayout;

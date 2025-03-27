"use client";

import { useAuth } from "@/hooks/auth";
import Loading from "@/app/(app)/Loading";
import { ReactNode } from "react";

const AppLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth({ middleware: "auth" });

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

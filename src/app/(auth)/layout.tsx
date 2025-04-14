"use client";

import AuthCard from "@/app/(auth)/AuthCard";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="text-gray-900 antialiased">
      <AuthCard>{children}</AuthCard>
    </div>
  );
};

export default Layout;

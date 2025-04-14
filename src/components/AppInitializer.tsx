"use client";

import { useAuth } from "@/hooks/auth";
import { Loading } from "@/components";
import { ReactNode } from "react";

export default function AppInitializer({ children }: { children: ReactNode }) {
  const { isLoading } = useAuth();

  if (isLoading) return <Loading />;

  return <>{children}</>;
}

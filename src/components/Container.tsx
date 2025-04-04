"use client";

import React, { ReactNode } from "react";
import { AppHeader, BottomTabBar } from "@/components";
import { useAuth } from "@/hooks/auth";
import { bottomTabBarRoutes } from "@/lib/constant";

const Container = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth({
    middleware: "auth",
    redirectIfAuthenticated: "/dashboard",
  });

  return (
    <div className="flex flex-col h-screen mx-6 text-primary-100">
      <AppHeader
        userName={user?.profile_handle}
        userProfile={user?.profile_image_url}
      />
      <main className="flex flex-col flex-grow justify-start max-w-lg mx-auto px-6 mt-[60px]">
        {children}
      </main>
      <BottomTabBar routes={bottomTabBarRoutes} />
    </div>
  );
};

export default Container;

"use client";

import React, { ReactNode } from "react";
import { AppHeader, BottomTabBar } from "@/components";
import { useAuth } from "@/hooks/auth";
import { bottomTabBarRoutes } from "@/lib/constant";
import { useRouter } from "next/navigation";

const Container = ({
  children,
  hasHeaderVisible = true,
}: {
  children: ReactNode;
  hasHeaderVisible?: boolean;
}) => {
  const router = useRouter();
  const { user } = useAuth({
    middleware: "auth",
  });

  return (
    <div className="flex flex-col h-screen mx-6 text-primary-100">
      {hasHeaderVisible && (
        <AppHeader
          userName={user?.profile_handle}
          userProfile={user?.profile_image_url}
          userProfileClick={() => router.push("/profile")}
        />
      )}
      <main className="flex flex-col flex-grow justify-start max-w-lg mx-auto px-6 mt-[60px] mb-[71px] w-full py-8 bg-white">
        {children}
      </main>
      <BottomTabBar routes={bottomTabBarRoutes} />
    </div>
  );
};

export default Container;

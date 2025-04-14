"use client";

import { Loading, Sidebar } from "@/components";
import { useAuth } from "@/hooks/auth";
import { routes } from "@/lib/constant";

export default function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout, isLoading } = useAuth({ middleware: "admin" });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <div className="w-64 flex-shrink-0 h-full">
        <Sidebar
          handleLogout={() => logout("/admin/login")}
          userName={user?.first_name || "Admin"}
          routes={routes}
          userProfile={user?.profile_image_url}
        />
      </div>
      <div className="flex-1 overflow-y-auto h-screen mx-[60px] pt-12">
        {children}
      </div>
    </div>
  );
}

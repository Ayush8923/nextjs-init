"use client";

import { useAuth } from "@/hooks/auth";

const AdminDashboard = () => {
  const { user } = useAuth({ middleware: "admin" });

  return (
    <div className="h-full">
      <div className="p-8">
        <h1 className="font-medium text-2xl">
          Welcome, {user?.first_name || "Admin"}
        </h1>
      </div>
    </div>
  );
};

export default AdminDashboard;

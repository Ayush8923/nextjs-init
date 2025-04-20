"use client";

import { Button } from "@/components";
import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/navigation";

const WelcomeMessage = () => {
  const router = useRouter();
  const { user } = useAuth({
    middleware: "auth",
    redirectIfAuthenticated: "/dashboard",
  });

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-2xl font-medium">Welcome, {user?.profile_handle}</h1>
      <div className="font-extralight text-base mt-3 text-center">
        We are excited to have you as a part of Unos y Otros! Begin your journey
        by adding your collection today.
      </div>

      <Button
        type="button"
        variant="secondary"
        className="w-full"
        title="Add to Collection"
        onClick={() => router.push("/collection")}
      />
    </div>
  );
};

export default WelcomeMessage;

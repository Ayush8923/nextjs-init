"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/auth";

const LoginLinks = () => {
  const { user } = useAuth({ middleware: "guest" });

  return (
    <>
      {user ? (
        <Link
          href="/dashboard"
          className="ml-4 text-sm text-gray-700 underline"
        >
          Dashboard
        </Link>
      ) : (
        <div>
          <Link
            href="/login"
            className="border-2 border-gray-700 rounded-full px-6 py-2 text-gray-700 font-medium"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="ml-4 border-2 border-gray-700 rounded-full px-6 py-2 text-gray-700 font-medium"
          >
            Register
          </Link>
        </div>
      )}
    </>
  );
};

export default LoginLinks;

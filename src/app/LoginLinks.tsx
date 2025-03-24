"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/auth";

const LoginLinks = () => {
  const { user } = useAuth({ middleware: "guest" });

  const linkClass =
    "border border-primary-100 rounded-full px-[26px] py-[10px] text-primary-100 font-semibold text-sm";

  return (
    <Link href={user ? "/dashboard" : "/login"} className={linkClass}>
      {user ? "Dashboard" : "Login"}
    </Link>
  );
};

export default LoginLinks;

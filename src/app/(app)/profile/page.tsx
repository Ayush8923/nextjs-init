"use client";

import { Button, Container } from "@/components";
import Image from "next/image";
import { useAuth } from "@/hooks/auth";
import { formatMemberSince } from "@/lib/common";
import { profileOptions } from "@/lib/constant";
import { useState } from "react";
import Link from "next/link";

const Profile = () => {
  const { user, logout } = useAuth({
    middleware: "auth",
    redirectIfAuthenticated: "/profile",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsLoading(true);
    logout("/login");
  };

  return (
    <Container>
      <div className="flex items-center">
        {user && user.profile_image_url ? (
          <Image
            src={user?.profile_image_url}
            alt="Profile"
            width={50}
            height={50}
            className="rounded-full w-[50px] h-[50px]"
          />
        ) : (
          <div className="h-[50px] w-[50px] bg-gray-200 rounded-full relative"></div>
        )}
        <div className="ml-4">
          <h2 className="text-base font-medium">{user?.profile_handle}</h2>
          <p className="font-light text-xs">
            Member since {formatMemberSince(user?.created_at)}
          </p>
        </div>
      </div>

      <div className="text-base font-medium mt-9">
        {profileOptions.map((option, index) => {
          const disable = option?.disable || false;
          return (
            <Link
              key={index}
              href={disable ? "#" : option.href}
              className={`w-full flex justify-between items-center py-7 border-b border-gray-200 ${
                disable && "opacity-50 cursor-not-allowed"
              } ${index === 0 && "border-t"}`}
            >
              <span>{option.label}</span>
              <option.icon />
            </Link>
          );
        })}
      </div>

      <div className="fixed bottom-[80px] left-0 right-0 p-6 md:px-0 max-w-md mx-auto">
        <Button
          className="w-full !mt-0"
          variant="secondary"
          onClick={handleLogout}
          title="Logout"
          loading={isLoading}
        />
      </div>
    </Container>
  );
};
export default Profile;

"use client";

import Link from "next/link";
import React from "react";
import { ApplicationLogo } from "./icons";
import Image from "next/image";

type ApplicationHeaderProps = {
  userName: string;
  userProfile?: string;
};

const AppHeader = ({ userName, userProfile = "" }: ApplicationHeaderProps) => {
  return (
    <header className="fixed top-0 py-4 left-6 right-6 bg-white">
      <div className="flex justify-between max-w-lg mx-auto px-6">
        <div className="flex items-center">
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <div className="relative">
                <ApplicationLogo width="50" height="36" />
              </div>
            </div>
          </Link>
        </div>

        <div className="flex items-center">
          <p className="font-extralight text-xs mr-1.5">{userName}</p>
          {!userProfile ? (
            <div className="h-[35px] w-[35px] bg-gray-200 rounded-full relative"></div>
          ) : (
            <Image
              src={userProfile}
              alt="Profile"
              width={35}
              height={35}
              className="rounded-full"
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;

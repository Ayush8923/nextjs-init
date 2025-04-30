import React from "react";
import { LeftArrowIcon } from "./icons";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      className="flex items-center font-bold text-xs text-gray-500"
      onClick={() => router.back()}
    >
      <LeftArrowIcon /> <span className="ml-1.5">Back</span>
    </button>
  );
};

export default BackButton;

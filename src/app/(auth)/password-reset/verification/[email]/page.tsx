"use client";

import AuthHeader from "@/components/AuthHeader";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

const PasswordResetEmail = ({ params }: any) => {
  const router = useRouter();
  const email = params?.email ? decodeURIComponent(params.email) : "";

  return (
    <AuthHeader label="Reset Password">
      <div className="w-full max-w-md text-center">
        <div className="mb-4 flex items-center justify-center mt-[90px]">
          <p className="text-base text-primary-100 font-extralight text-center">
            Reset password link has been sent to
            <span className="font-bold"> {email}</span>. Use the link in the
            email to continue forward.
          </p>
        </div>

        <Button
          className="w-full rounded text-primary-100"
          onClick={() => router.push("/forgot-password")}
          title="Change email"
          variant="secondary"
        />
      </div>
    </AuthHeader>
  );
};

export default PasswordResetEmail;

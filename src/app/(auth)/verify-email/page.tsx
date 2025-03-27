"use client";

import AuthFlowHeader from "@/components/AuthFlowHeader";
import Button from "@/components/Button";
import { useAuth } from "@/hooks/auth";
import { useState } from "react";

const Page = () => {
  const { resendEmailVerification, user } = useAuth({
    middleware: "auth",
    redirectIfAuthenticated: "/account-details",
  });

  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AuthFlowHeader label="Sign up to start">
      <div className="w-full max-w-md text-center">
        <div className="mb-4 flex items-center justify-center mt-[90px]">
          <p className="text-base text-primary-100 font-extralight text-center">
            A verification email has been sent to
            <span className="font-bold"> {user?.email}</span>. Use the link in
            the email to continue forward.
          </p>
        </div>

        {status === "verification-link-sent" && (
          <div className="mb-4 font-medium text-sm text-green-600">
            A new verification link has been sent to the email address you
            provided during registration.
          </div>
        )}

        <Button
          className="w-full rounded text-primary-100"
          onClick={() => resendEmailVerification({ setStatus, setIsLoading })}
          title="Resend Verification Email"
          variant="secondary"
          disabled={isLoading}
          loading={isLoading}
        />
      </div>
    </AuthFlowHeader>
  );
};

export default Page;

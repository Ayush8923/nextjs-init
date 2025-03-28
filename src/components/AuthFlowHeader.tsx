import { ReactNode } from "react";
import { ApplicationLogo } from "./icons";

const AuthFlowHeader = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  return (
    <div className="w-full sm:max-w-md px-9 mt-14">
      <div className="flex justify-center">
        <div className="w-16 h-16 flex items-center justify-center">
          <ApplicationLogo />
        </div>
      </div>
      <h1 className="text-center text-2xl font-medium my-12">{label}</h1>
      {children}
    </div>
  );
};

export default AuthFlowHeader;

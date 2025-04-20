import React, { ReactNode } from "react";
import { Skeleton } from "@radix-ui/themes";

const LoadingSkeleton = ({
  children,
  loading,
}: {
  children: ReactNode;
  loading: boolean;
}) => {
  return loading ? <Skeleton>{children}</Skeleton> : <>{children}</>;
};

export default LoadingSkeleton;

import { IconButton, Tooltip } from "@radix-ui/themes";
import React from "react";
import { TooltipIcon } from "./icons";

type TooltipProps = {
  content: string;
  loading?: boolean;
};

const IconButtonWithRef = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof IconButton>
>(({ children, ...props }, ref) => (
  <IconButton
    {...props}
    ref={ref}
    className="!p-0 !mx-2"
    radius="full"
    variant="ghost"
  >
    {children}
  </IconButton>
));

IconButtonWithRef.displayName = "IconButtonWithRef";

const CustomTooltip = ({ content, loading = false }: TooltipProps) => {
  return (
    <Tooltip content={content}>
      <IconButtonWithRef loading={loading}>
        <TooltipIcon />
      </IconButtonWithRef>
    </Tooltip>
  );
};

export default CustomTooltip;

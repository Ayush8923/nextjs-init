import React, { forwardRef } from "react";
import { IconButton } from "@radix-ui/themes";
import * as Popover from "@radix-ui/react-popover";
import { TooltipIcon } from "./icons";

type CustomPopoverProps = {
  content: string;
  loading?: boolean;
};

const IconButtonWithRef = forwardRef<
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

const CustomPopover = ({ content, loading = false }: CustomPopoverProps) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <IconButtonWithRef loading={loading}>
          <TooltipIcon />
        </IconButtonWithRef>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="top"
          sideOffset={5}
          align="center"
          className="z-50 max-w-[90vw] sm:max-w-xs break-words rounded-md bg-primary-100 text-white px-3 py-2 text-sm shadow-md outline-none focus:outline-none focus:ring-0"
        >
          {content}
          <Popover.Arrow className="fill-primary-100" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default CustomPopover;

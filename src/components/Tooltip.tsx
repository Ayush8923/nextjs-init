import { IconButton, Tooltip } from "@radix-ui/themes";
import React from "react";
import { TooltipIcon } from "./icons";

type TooltipProps = {
  content: string;
  loading?: boolean;
};

const CustomTooltip = ({ content, loading = false }: TooltipProps) => {
  return (
    <Tooltip content={content}>
      <IconButton
        className="!p-0 !mx-2"
        radius="full"
        variant="ghost"
        loading={loading}
      >
        <TooltipIcon />
      </IconButton>
    </Tooltip>
  );
};

export default CustomTooltip;

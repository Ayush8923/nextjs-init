import React from "react";

type BackIconProps = {
  width?: string;
  height?: string;
  color?: string;
};

const BackIcon = ({
  width = "5",
  height = "8",
  color = "#959595",
}: BackIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 5 8"
      fill="none"
    >
      <path
        d="M4.00049 7L1.09096 4.25121C0.97033 4.13729 0.97033 3.86302 1.09096 3.74879L4.00049 1"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default BackIcon;

import React from "react";

type LeftArrowIconProps = {
  width?: string;
  height?: string;
  color?: string;
  className?: string;
};

const LeftArrowIcon = ({
  width = "12",
  height = "20",
  color = "white",
  className = "",
}: LeftArrowIconProps) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 12 20"
    fill="none"
  >
    <path
      d="M1.84113 11.8123L10.1458 20L12 18.1748L3.68226 10L12 1.82519L10.1458 0L1.84113 8.18766L-9.53674e-07 10L1.84113 11.8123Z"
      fill={color}
    />
  </svg>
);

export default LeftArrowIcon;

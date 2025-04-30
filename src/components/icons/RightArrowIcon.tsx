import React from "react";

type RightArrowIconProps = {
  width?: string;
  height?: string;
  color?: string;
  className?: string;
};

const RightArrowIcon = ({
  width = "6",
  height = "10",
  color = "#373435",
  className = "",
}: RightArrowIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={width}
    height={height}
    viewBox="0 0 6 10"
    fill="none"
  >
    <path
      d="M5.00322 5.90617L0.913183 10L0 9.0874L4.09646 5L0 0.912596L0.913183 0L5.00322 4.09383L5.90997 5L5.00322 5.90617Z"
      fill={color}
    />
  </svg>
);

export default RightArrowIcon;

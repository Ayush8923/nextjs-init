import React from "react";

const AccordionIcon = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="6"
      viewBox="0 0 11 6"
      fill="none"
    >
      <path
        d="M5.04891 5.04814L0.955078 0.958105L1.86767 0.0449215L5.95508 4.14138L10.0425 0.0449218L10.9551 0.958105L6.86125 5.04814L5.95508 5.95489L5.04891 5.04814Z"
        fill="#373435"
      />
    </svg>
  );
};

export default AccordionIcon;

import React from "react";

const RatingIcon = ({
  selected,
  onClick,
}: {
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      fill={selected ? "#373435" : "none"}
      viewBox="0 0 43 41"
      className="w-[43px] h-[41px] cursor-pointer transition-[fill,stroke] duration-200"
      role="button"
      aria-label={selected ? "Selected rating star" : "Unselected rating star"}
    >
      <path
        d="M20.5489 1.92705C20.8483 1.00574 22.1517 1.00574 22.4511 1.92705L26.5516 14.5471C26.6854 14.9591 27.0694 15.2381 27.5026 15.2381H40.7721C41.7409 15.2381 42.1436 16.4777 41.3599 17.0471L30.6247 24.8467C30.2742 25.1014 30.1275 25.5528 30.2614 25.9648L34.3619 38.5848C34.6612 39.5062 33.6068 40.2723 32.8231 39.7029L22.0878 31.9033C21.7373 31.6486 21.2627 31.6486 20.9122 31.9033L10.1769 39.7029C9.39323 40.2723 8.33875 39.5062 8.6381 38.5849L12.7386 25.9648C12.8725 25.5528 12.7258 25.1014 12.3753 24.8467L1.64007 17.0471C0.856356 16.4777 1.25913 15.2381 2.22785 15.2381H15.4974C15.9306 15.2381 16.3146 14.9591 16.4484 14.5471L20.5489 1.92705Z"
        stroke={selected ? "#373435" : "#D9D9D9"}
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default RatingIcon;

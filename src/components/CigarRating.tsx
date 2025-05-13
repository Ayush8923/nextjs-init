import React from "react";
import { SmallRatingIcon } from "./icons";
import { cigarStrengths } from "@/lib/constant";

const StarRating = ({ rating, maxStars = 5 }: any) => {
  if (!rating) {
    return <div className="text-base font-medium mt-0.5">N/A</div>;
  }
  return (
    <div className="flex space-x-1.5 mt-0.5">
      {[...Array(maxStars)].map((_, i) => {
        const fillRatio = Math.min(Math.max(rating - i, 0), 1);

        return (
          <span key={i} className="relative w-[21px] h-[21px] block">
            <SmallRatingIcon color="#D9D9D9" />

            {fillRatio > 0 && (
              <div
                className="absolute top-0 left-0 overflow-hidden"
                style={{ width: `${fillRatio * 100}%` }}
              >
                <SmallRatingIcon color="#373435" />
              </div>
            )}
          </span>
        );
      })}
    </div>
  );
};

const CigarRating = ({ cigar }: any) => {
  return (
    <div className="my-9">
      <div className="flex space-x-4">
        <div className="bg-gray-400 rounded-xl p-2 pb-[27px] flex-1">
          <div>
            <div className="text-gray-500 text-sm">Your Rating</div>
            <StarRating rating={cigar.user_rating} />
          </div>

          <div className="my-3">
            <div className="text-xs font-light">Strength</div>
            <StarRating rating={cigarStrengths.indexOf(cigar.strength) + 1} />
          </div>

          {/* Added N/A for now, this is coming from the Journal feature. Will implement this later phase. */}
          <div>
            <div className="text-xs font-light">Draw Resistance</div>
            <div className="text-base font-medium mt-0.5">N/A</div>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-gray-400 flex flex-col justify-between rounded-xl pb-2.5 px-2 pt-2">
            <div>
              <div className="text-gray-500 font-light text-xs">
                Average Rating
              </div>
              <div className="mt-1.5">
                <StarRating rating={cigar.average_rating} />
              </div>
              <div className="text-xs font-light mt-1">From the community</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CigarRating;

import { getNameInitials } from "~/lib/utils";

import star from "icons/star.svg";
import { TReview } from "~/types/ReviewTypes";

const GoogleReviewCard = (props: TReview) => {
  return (
    <div className="bg-white flex flex-col gap-3 border border-black p-3">
      <div className="flex items-center">
        <div className="flex items-center flex-1 gap-4">
          {props.picture ? (
            <div className="h-20 w-20 rounded-full bg-primary overflow-hidden">
              <img
                src={props.picture}
                alt="user"
                className="object-cover h-full w-full"
              />
            </div>
          ) : (
            <div className="h-20 w-20 rounded-full bg-primary overflow-hidden flex items-center justify-center">
              <p className="text-white text-base">
                {getNameInitials(props.name)}
              </p>
            </div>
          )}
          <div className="flex flex-col gap-1">
            <p className="font-bold text-black text-base line-clamp-1">
              {props.name}
            </p>
            <p className="text-neutral text-xs">Guest</p>
          </div>
        </div>
        <p className="self-start text-sm text-neutral">{props.date}</p>
      </div>
      <div className="flex items-center gap-1">
        {Array.from({ length: props.stars }).map((_, index) => (
          <img key={index} src={star} alt="star" className="w-6 h-6" />
        ))}
      </div>
      <p className="text-black text-base line-clamp-5">{props.review}</p>
    </div>
  );
};

export { GoogleReviewCard };

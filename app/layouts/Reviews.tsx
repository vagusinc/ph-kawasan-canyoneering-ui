import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/base-components/ui/carousel";
import { GoogleReviewCard } from "~/components";

import star from "icons/star.svg";
import { TReview } from "~/types/ReviewTypes";
import { TItemType } from "~/types/StrapiTypes";

interface IReviewsProps {
  reviews: TItemType<TReview>[];
  average?: number;
}

const Reviews = (props: IReviewsProps) => {
  return (
    <div className="px-8 md:px-12 lg:px-40 py-16 lg:py-40">
      {props.average && (
        <div className="flex flex-col w-full items-center justify-center mb-16">
          <h1 className="font-bold text-black text-3xl mb-1">
            {props.average.toFixed(1)}
          </h1>
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: props.average }).map((_, index) => (
              <img key={index} src={star} alt="star" className="w-6 h-6" />
            ))}
          </div>
          <h6 className="text-black text-base">{`Based on ${props.reviews.length} reviews`}</h6>
        </div>
      )}
      <Carousel className="w-full">
        <CarouselContent>
          {props.reviews.map((review, index) => (
            <CarouselItem
              key={index}
              className="basis-full md:basis-1/2 lg:basis-1/3"
            >
              <GoogleReviewCard {...review.attributes} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export { Reviews };

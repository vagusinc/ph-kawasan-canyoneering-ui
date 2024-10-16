/* eslint-disable react/display-name */
import { useNavigate } from "@remix-run/react";
import { forwardRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/base-components/ui/carousel";
import { ProductCard } from "~/components";
import { TItemType } from "~/types/StrapiTypes";
import { TTour } from "~/types/TourTypes";

interface IFeaturedServicesProps {
  products: TItemType<TTour>[];
}

const FeaturedServices = forwardRef<HTMLDivElement, IFeaturedServicesProps>(
  (props, ref) => {
    const navigate = useNavigate();

    return (
      <div ref={ref} className="py-10 px-8 md:px-12 lg:px-24 flex flex-col">
        <div className="flex flex-col gap-2 md:gap-4 mb-8 md:mb-12">
          <h1 className="self-center font-rushink text-primary text-center text-2xl md:text-5xl">
            Featured Services
          </h1>
          <p className="self-center text-black text-center text-xs md:text-base">
            Explore these popular places and tours we offer just for you.
          </p>
        </div>
        <Carousel className="w-full">
          <CarouselContent>
            {props.products.map((product, index) => (
              <CarouselItem
                key={index}
                className="basis-full md:basis-1/2 lg:basis-1/3"
              >
                <ProductCard
                  product={product}
                  onClick={(p) => navigate(`/product/${p.id}`)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    );
  }
);

export { FeaturedServices };

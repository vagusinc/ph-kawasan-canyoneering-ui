/* eslint-disable react/display-name */
import { useNavigate } from "@remix-run/react";
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

interface ISimilarProducts {
  products: TItemType<TTour>[];
}

const SimilarProducts = (props: ISimilarProducts) => {
  const navigate = useNavigate();

  const handleProductClicked = (product: TItemType<TTour>) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="pb-10 px-8 md:px-12 lg:px-24 flex flex-col gap-4 md:gap-10">
      <h1 className="font-bold text-lg md:text-3xl text-black">
        You may also like
      </h1>
      <Carousel className="w-full">
        <CarouselContent>
          {props.products.map((product, index) => (
            <CarouselItem
              key={index}
              className="basis-full md:basis-1/2 lg:basis-1/4"
            >
              <ProductCard
                product={product}
                compact
                onClick={handleProductClicked}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export { SimilarProducts };

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useMemo } from "react";
import { TItemType } from "~/types/StrapiTypes";
import { TTour } from "~/types/TourTypes";

export interface IProductCard {
  product: TItemType<TTour>;
  compact?: boolean;
  onClick?: (product: TItemType<TTour>) => void;
}

const ProductCard = ({ product, compact, onClick }: IProductCard) => {
  const subtitleText = useMemo(() => {
    if (
      product.attributes?.hasPickup &&
      product.attributes?.hasDropoff &&
      product.attributes?.addons?.data.length > 0
    ) {
      return "Pick up and drop off with Add-ons";
    }

    if (
      product.attributes?.hasPickup &&
      product.attributes?.hasDropoff &&
      product.attributes?.addons?.data.length === 0
    ) {
      return "Pick up and drop off";
    }

    if (product.attributes?.hasPickup && !product.attributes?.hasDropoff) {
      return "With pick up";
    }

    return product.attributes.description;
  }, [product]);

  const productPrice = useMemo(() => {
    if (!product.attributes.pricePerPerson) {
      return product.attributes?.tour_options?.data.at(0)?.attributes
        .pricePerPerson;
    }

    return product.attributes.pricePerPerson;
  }, [product]);

  return (
    <div
      onClick={() => onClick?.(product)}
      className={`bg-white overflow-hidden rounded-lg flex flex-col shadow-md ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      <div className={compact ? "h-40" : "h-80"}>
        <img
          src={
            product.attributes?.tour_images.data?.[0]?.attributes.formats.large
              .url
          }
          alt="product"
          className="h-full w-full object-cover"
        />
      </div>
      <div className={`bg-white flex-col py-3 ${compact ? "px-4" : "px-8"}`}>
        <p className="text-xs text-neutral">{product.attributes?.category}</p>
        <p className="text-black text-base line-clamp-1">
          {product.attributes?.name}
        </p>
        <p className="text-xs text-neutral mb-4 line-clamp-1 h-[1lh]">
          {subtitleText}
        </p>
        <p className="font-bold text-primary text-xl">{`₱${productPrice} / person`}</p>
      </div>
    </div>
  );
};

export { ProductCard };

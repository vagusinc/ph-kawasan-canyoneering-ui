import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TCartItem } from "~/types/CartItem";
import { TItemType } from "~/types/StrapiTypes";
import { TTour } from "~/types/TourTypes";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getNameInitials(name: string) {
  if (name.length === 0) return "";

  return name
    .split(" ")
    .map((n) => n.at(0))
    .join("");
}

export function getPickupAndDropoffOptionsFromTour(
  tours: TItemType<TTour>[],
  tourName: string
) {
  const tour = tours.find((t) => t.attributes.name === tourName);

  if (!tour) return [];

  return Array.from(
    new Set(
      tour.attributes.pickup_and_dropoff_packages.data.map(
        (pad) => pad.attributes.location
      )
    )
  );
}

export function getAddonOptiosnFromTour(
  tours: TItemType<TTour>[],
  tourName: string
) {
  const tour = tours.find((t) => t.attributes.name === tourName);

  if (!tour) return [];

  return tour.attributes.addons.data;
}

export function getPickupAndDropoffPrice(
  tour: TItemType<TTour>,
  location: string,
  quantity: number
) {
  const pickupAndDropoffPackage =
    tour.attributes.pickup_and_dropoff_packages.data.filter(
      (pkg) => pkg.attributes.location === location
    );

  if (!pickupAndDropoffPackage || pickupAndDropoffPackage.length === 0)
    return 0;

  let price =
    pickupAndDropoffPackage.find((p) => p.attributes.minimumPersons <= 2)
      ?.attributes.price || 0;

  pickupAndDropoffPackage.forEach((pkg) => {
    if (
      pkg.attributes.minimumPersons <= quantity &&
      pkg.attributes.maximumPersons >= quantity
    ) {
      price = pkg.attributes.price;
    }
  });

  if (quantity > 11) {
    price = pickupAndDropoffPackage.at(-1)!.attributes.price;
  }

  return price;
}

export function getAddonsTotalPriceFromCartItem(addons: TCartItem["addons"]) {
  if (!addons) {
    return 0;
  }

  const totalPrice = addons.reduce(
    (totalValue, addon) => (totalValue += addon.price * addon.pax),
    0
  );

  return totalPrice;
}

export function isNullOrEmpty(value: string | undefined) {
  if (!value || value?.length === 0) return true;

  return false;
}

export function convertCartItemsToRichTextJson(cartItems: TCartItem[]) {
  const bookingDetailsString = cartItems.flatMap((cartItem) => {
    const tourNameObj = {
      type: "paragraph",
      children: [
        {
          bold: true,
          text: `Tour name: ${cartItem.tourName}`,
          type: "text",
          underline: true,
        },
      ],
    };

    const quantityObj = {
      type: "paragraph",
      children: [
        {
          text: `Number of pax: ${cartItem.quantity}`,
          type: "text",
        },
      ],
    };
    const tourDateObj = {
      type: "paragraph",
      children: [
        {
          text: `Tour date: ${cartItem.date.toString()}`,
          type: "text",
        },
      ],
    };
    const tourPickupAndDropoffObj = {
      type: "paragraph",
      children: [
        {
          text: `Pickup and drop-off: ${cartItem.pickupAndDropoff.name} ${
            cartItem.pickupAndDropoff.name === "Meet on-site"
              ? ""
              : `(${cartItem.pickupAndDropoff.quantity} pax)`
          }`,
          type: "text",
        },
      ],
    };
    const tourAddOnsTitleObj = {
      type: "paragraph",
      children: [
        {
          text: "Addons: ",
          type: "text",
        },
      ],
    };

    const tourAddOnsListObj = {
      type: "list",
      format: "unordered",
      children: cartItem.addons?.map((addon) => {
        return {
          type: "list-item",
          children: [
            {
              text: `${addon.name}: ${addon.pax} pax`,
              type: "text",
            },
          ],
        };
      }),
    };

    const richTextJsonArray: any[] = [
      tourNameObj,
      quantityObj,
      tourDateObj,
      tourPickupAndDropoffObj,
      tourAddOnsTitleObj,
    ];

    if (cartItem.addons != undefined && cartItem.addons.length > 0) {
      richTextJsonArray.push(tourAddOnsListObj);
    }

    return richTextJsonArray;
  });

  return bookingDetailsString;
}

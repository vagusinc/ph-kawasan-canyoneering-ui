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

  let price = pickupAndDropoffPackage.at(0)!.attributes.price;

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

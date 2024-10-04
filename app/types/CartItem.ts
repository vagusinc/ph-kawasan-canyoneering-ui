export type TCartItem = {
  tourName: string;
  tourThumbnail: string;
  pricePerPax: number;
  quantity: number;
  pickupAndDropoff: { name: string; quantity: number; price: number };
  addons?: { name: string; pax: number; price: number }[];
  date: string;
};

import { TItemDates } from "./StrapiTypes";

export type TReview = {
  name: string;
  review: string;
  date: string;
  stars: number;
  picture?: string; // to be added in strapi
} & TItemDates;

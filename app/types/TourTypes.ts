import { TItemDates, TItemType } from "./StrapiTypes";

export type TTour = {
  name: string;
  description: string | null;
  category: string | null;
  hasPickup: boolean | null;
  hasDropoff: boolean | null;
  pricePerPerson: number | null;
  enabled: boolean;
  tour_images: { data: TItemType<TTourImages>[] };
  addons: { data: TItemType<TTourAddons>[] };
  tour_options: { data: TItemType<TTourOptions>[] };
  tour_videos: { data: TItemType<TTourVideos>[] };
  pickup_and_dropoff_packages: { data: TItemType<TPickupAndDropoffPackage>[] };
} & TItemDates;

export type TTourImages = {
  url: string;
} & TItemDates;

export type TTourAddons = {
  name: string;
  pricePerPerson: number;
} & TItemDates;

export type TTourOptions = {
  name: string;
  pricePerPerson: number;
} & TItemDates;

export type TTourVideos = {
  videoUrl: string;
} & TItemDates;

export type TPickupAndDropoffPackage = {
  location: string;
  maximumPersons: number;
  minimumPersons: number;
  price: number;
} & TItemDates;

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
  name: string;
  alternativeText: "string" | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large: TImageFormat;
    small: TImageFormat;
    medium: TImageFormat;
    thumbnail: TImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
} & TItemDates;

export type TImageFormat = {
  ext: string;
  url: string;
  hash: "string";
  mime: "string";
  name: "string";
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
};

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

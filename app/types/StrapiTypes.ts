export type TPaginatedResponse<T> = {
  data: TItemType<T>[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export type TSingleResponse<T> = {
  data: TItemType<T>;
  meta: object;
};

export type TItemType<T> = {
  id: number;
  attributes: T;
};

export type TItemDates = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type TFileType = {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: string | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: "local";
  provider_metadata: null;
} & TItemDates;

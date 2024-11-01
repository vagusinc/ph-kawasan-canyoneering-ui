import { axiosServerClient } from "~/config/.server";
import { TBannerType } from "~/types/Banner";
import { TSingleResponse } from "~/types/StrapiTypes";

export async function getBanner(): Promise<
  TSingleResponse<TBannerType> | undefined
> {
  try {
    const response = await axiosServerClient.get("/banner");
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

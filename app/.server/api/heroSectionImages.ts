import { axiosServerClient } from "~/config/.server";
import { THeroSectionImage } from "~/types/HeroSectionImagesType";
import { TPaginatedResponse } from "~/types/StrapiTypes";

export async function getHeroSectionImages(): Promise<
  TPaginatedResponse<THeroSectionImage> | undefined
> {
  try {
    const response = await axiosServerClient.get(
      "/hero-section-images?populate=image"
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

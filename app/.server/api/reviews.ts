import { axiosServerClient } from "~/config/.server";
import { TReview } from "~/types/ReviewTypes";
import { TPaginatedResponse } from "~/types/StrapiTypes";

export async function getReviews(): Promise<
  TPaginatedResponse<TReview> | undefined
> {
  try {
    const response = await axiosServerClient.get("/reviews");
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

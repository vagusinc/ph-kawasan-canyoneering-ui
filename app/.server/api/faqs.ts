import { axiosServerClient } from "~/config/.server";
import { TFAQType } from "~/types/FAQTypes";
import { TPaginatedResponse } from "~/types/StrapiTypes";

export async function getFAQs(): Promise<
  TPaginatedResponse<TFAQType> | undefined
> {
  try {
    const response = await axiosServerClient.get("/faqs");
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

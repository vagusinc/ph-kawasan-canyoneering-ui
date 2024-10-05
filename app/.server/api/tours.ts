import { axiosServerClient } from "~/config/.server";
import { TPaginatedResponse, TSingleResponse } from "~/types/StrapiTypes";
import { TTour } from "~/types/TourTypes";

export async function getTours(): Promise<
  TPaginatedResponse<TTour> | undefined
> {
  try {
    const response = await axiosServerClient.get("/tours?populate=*");
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function getTour(
  id: number
): Promise<TSingleResponse<TTour> | undefined> {
  try {
    const response = await axiosServerClient.get(`/tours/${id}?populate=*`);
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

import { axiosServerClient } from "~/config/.server";
import { TFileType } from "~/types/StrapiTypes";

export async function getAssets(): Promise<TFileType[] | undefined> {
  try {
    const response = await axiosServerClient.get("/upload/files");
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function getAsset(id: number): Promise<TFileType | undefined> {
  try {
    const response = await axiosServerClient.get(`/upload/files/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

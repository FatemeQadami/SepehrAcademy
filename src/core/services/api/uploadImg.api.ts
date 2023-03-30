import Http from "../interceptor/interceptor";
import { env } from "../../config/env";

const MainUrl = env.APP_PUBLIC_PATH;

export const uploadImgAPI = async (obj: string) => {
  try {
    const result = await Http.post(`${MainUrl}upload/image`, obj);
    return result.data;
  } catch (error) {
    return null;
  }
};

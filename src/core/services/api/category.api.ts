import { env } from "../../config/env";
import Http from "../interceptor/interceptor";

const MainUrl = env.APP_PUBLIC_PATH;

export const categoryAPI = async () => {
  try {
    const result = await Http.get(`${MainUrl}category/getall`);
    return result;
  } catch (error) {
    return null;
  }
};
import { env } from "../../config/env";
import Http from "../interceptor/interceptor";

const MainUrl = env.APP_PUBLIC_PATH;

export const coursesAPI = async () => {
  try {
    const result = await Http.get(`${MainUrl}course/getall`);
    return result;
  } catch (error) {
    return null;
  }
};

import { env } from "../../config/env";
import Http from "../interceptor/interceptor";

const MainUrl = env.APP_PUBLIC_PATH;

export const teachersAPI = async () => {
  try {
    const result = await Http.get(`${MainUrl}employee/getallteachers`);
    return result;
  } catch (error) {
    return null;
  }
};

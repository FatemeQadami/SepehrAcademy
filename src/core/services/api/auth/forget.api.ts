import { env } from "../../../config/env";
import { forgetPassType } from "../../../models";
import Http from "../../interceptor/interceptor";

const MainUrl = env.APP_PUBLIC_PATH;

export const forgetPassAPI = async (obj: forgetPassType) => {
  try {
    const result = await Http.post(`${MainUrl}forgetpassword`, obj);
    return result.data.result;
  } catch (error) {
    return false;
  }
};

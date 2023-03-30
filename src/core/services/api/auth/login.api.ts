import { env } from "../../../config/env";
import { loginType } from "../../../models";
import Http from "../../interceptor/interceptor";
import { setItem } from "../../storage/storage";

const MainUrl = env.APP_PUBLIC_PATH;

export const loginAPI = async (obj: loginType) => {
  try {
    const result = await Http.post(`${MainUrl}auth/login`, obj);

    const user = result.data.result.studentModel;
    const token = result.data.result.jwtToken;

    setItem("user", JSON.stringify(user));
    setItem("token", token);

    console.log(result.data.result);
    return result.data.result;
  } catch (error) {
    return null;
  }
};

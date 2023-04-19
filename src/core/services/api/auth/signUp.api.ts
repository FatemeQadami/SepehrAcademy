import { env } from "../../../config/env";
import { EStorageKeys } from "../../../enums/storage";
import { signUpType } from "../../../models";
import Http from "../../interceptor/interceptor";
import { setItem } from "../../storage/storage";

const MainUrl = env.APP_PUBLIC_PATH;

export const signUpAPI = async (obj: signUpType) => {
  try {
    const result = await Http.post(`${MainUrl}auth/register`, obj);

    const user = result.data.result;

    setItem(EStorageKeys.User, user);

    return result.data.result;
  } catch (error) {
    return null;
  }
};

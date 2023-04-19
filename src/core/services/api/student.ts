import { env } from "../../config/env";
import { getItem } from "../storage/storage";
import Http from "../interceptor/interceptor";
import { EStorageKeys } from "../../enums/storage";

const MainUrl = env.APP_PUBLIC_PATH;

export const studentByIdAPI = async () => {
  try {
    const user = await getItem(EStorageKeys.User);
    const userObj = user ? JSON.parse(user) : null;
    if (!userObj) return null;
    const result = await Http.get(`${MainUrl}student/${userObj._id}`);
    console.log("userObj", result.data.result);
    return result.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

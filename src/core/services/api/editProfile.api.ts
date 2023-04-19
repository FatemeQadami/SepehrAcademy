import { env } from "../../config/env";
import { getItem } from "../storage/storage";
import Http from "../interceptor/interceptor";
import { editProfileType } from "../../models";
import { EStorageKeys } from "../../enums/storage";


const MainUrl =env.APP_PUBLIC_PATH

export const editProfileAPI = async (obj:editProfileType) => {
  try {
    const user = await getItem(EStorageKeys.User);
    const userObj = JSON.parse(user);
    const result = await Http.put(`${MainUrl}student/${userObj._id}`,obj);
    return result.data;
  } catch (error) {
    return null;
  }
};
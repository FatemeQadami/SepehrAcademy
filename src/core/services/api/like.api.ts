import { env } from "../../config/env";
import { idType } from "../../models";
import Http from "../interceptor/interceptor";

const MainUrl = env.APP_PUBLIC_PATH;

export const likeAPI = async (obj: idType) => {
  try {
    const result = await Http.post(`${MainUrl}course/like`, obj);
    return result.data;
  } catch (error) {
    return null;
  }
};

export const disLikeAPI = async (obj: idType) => {
  try {
    const result = await Http.post(`${MainUrl}course/dislike`, obj);
    return result.data;
  } catch (error) {
    return null;
  }
};

export const countLikeDislikeAPI = async (id: string) => {
  try {
    const result = await Http.get(`${MainUrl}course/likeCount/${id}`);
    return result.data;
  } catch (error) {
    return null;
  }
};

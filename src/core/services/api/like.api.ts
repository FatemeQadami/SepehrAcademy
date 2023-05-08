import { env } from "../../config/env";
import Http from "../interceptor/interceptor";

const MainUrl = env.APP_PUBLIC_PATH;

export const likeAPI = async () => {
  try {
    const result = await Http.post(`${MainUrl}course/like`);
    return result.data;
  } catch (error) {
    return null;
  }
};

export const disLikeAPI = async () => {
  try {
    const result = await Http.post(`${MainUrl}course/dislike`);
    return result.data;
  } catch (error) {
    return null;
  }
};

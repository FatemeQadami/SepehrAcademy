import { env } from "../../config/env";
import { commentType } from "../../models";
import Http from "../interceptor/interceptor";

const MainUrl = env.APP_PUBLIC_PATH;

export const commentsAPI = async () => {
  try {
    const result = await Http.get(`${MainUrl}comments/`);
    return result.data;
  } catch (error) {
    return null;
  }
};

export const addCommentsAPI = async (obj: commentType) => {
  try {
    const result = await Http.post(`${MainUrl}comments/send`, obj);
    return result.data;
  } catch (error) {
    return null;
  }
};

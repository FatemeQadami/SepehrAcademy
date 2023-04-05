import { env } from "../../../config/env";
import { studentByIdAPI } from "../student";
import Http from "../../interceptor/interceptor";
import { resetPassType } from "../../../models";

const MainUrl = env.APP_PUBLIC_PATH;

export const resetPassAPI = async (obj: resetPassType) => {
  try {
    const token = await studentByIdAPI();
    console.log("token", token.result);
    const result = await Http.post(
      `${MainUrl}resetPassword/${token.result.resetPasswordToken}`,
      obj
    );

    console.log(result.data.result);

    return result.data.result;
  } catch (error) {
    return false;
  }
};

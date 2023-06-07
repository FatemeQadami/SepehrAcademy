import RNFetchBlob from "rn-fetch-blob";

import { env } from "../../config/env";
import { getItem } from "../storage/storage";
import { EStorageKeys } from "../../enums/storage";

const MainUrl = env.APP_PUBLIC_PATH;

export const uploadImageAPI = async (uObj: any) => {
  const token = await getItem(EStorageKeys.Token);

  const result = await RNFetchBlob.fetch(
    "POST",
    `${MainUrl}upload/image`,
    {
      "x-auth-token": token,
      "Content-Type": "multipart/form-data",
    },
    [uObj]
  );
  return result;
};

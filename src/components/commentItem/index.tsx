import React, { FC } from "react";
import { Image, Text, View } from "react-native";

import user from "../../assets/img/comment/user.png";

interface commentItemProp {
  userName: string;
  comment: string;
}

export const CommentItem: FC<commentItemProp> = ({
  userName,
  comment,
}): JSX.Element => {

  return (
    <View
      className=" bg-white p-5 rounded-[20px] mx-4 my-2 dark:bg-[#212477]"
      style={{ elevation: 8 }}
    >
      <View className="flex-row-reverse">
        <Image className="rounded-[20px] w-[30] h-[30]" source={user} />
        <Text className="font-Yekan text-[14px] color-[#002D85] dark:color-white">
          {userName}
        </Text>
      </View>
      <Text className="font-Yekan color-[#999999] text-[13px] pt-1 pr-1 dark:color-white">
        {comment}
      </Text>
    </View>
  );
};

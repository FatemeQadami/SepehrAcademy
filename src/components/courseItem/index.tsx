import { View, Text, Image, Pressable } from "react-native";
import React, { FC, useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import Favorite from "../common/favorite";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Toast from "react-native-toast-message";

interface ICourseItemProp {
  courseTitle: string;
  courseTeacher: string;
  courseImage: string | undefined;
  coursePrice: string | number;
  item: any;
  pageName:string
}

const CourseItem: FC<ICourseItemProp> = ({
  courseTitle,
  courseTeacher,
  courseImage,
  coursePrice,
  pageName,
  item,
}): JSX.Element => {
  const navigation = useNavigation<any>();

  const { studentModel }: any = useSelector((state: RootState) => state.user);

  return (
    <>
      <View className="my-[15] pr-14 pl-6 relative">
        <Pressable
          onPress={() => {
            navigation.navigate("CourseDetails", { item });
          }}
          className="flex-row-reverse justify-between rounded-[20px] mx-5 py-3.5 bg-white "
          style={{ elevation: 5 }}
        >
          <View className="mr-10">
            <View className="flex flex-row-reverse justify-around">
              <Text className="font-Yekan font-bold text-[18px] color-[#002D85] mb-2 ">
                {courseTitle}
              </Text>
            </View>
            <View className="flex flex-row-reverse my-2 pl-1">
              <FontAwesome5 name="user-tie" color="#969696" />
              <Text className="font-Yekan text-[13px] color-[#696969] px-1">
                {courseTeacher}
              </Text>
            </View>
            <View className="flex flex-row-reverse pl-1">
              <FontAwesome5 name="coins" color="#969696" />
              <Text className="color-[#E00000] text[12px] pr-2 font-Yekan ">
                {coursePrice}
              </Text>
              <Text className="font-Yekan color-[#696969] text-[12px] pt-0.5">
                ت
              </Text>
            </View>
          </View>
          <View className="items-center flex justify-between ml-3 pr-5">
            {pageName==="fav"}
            <Favorite color="gray" size={16} item={item} />
            <View className="items-center">
              <AntDesign name="pluscircle" size={30} color="#4F91FF" />
            </View>
          </View>
        </Pressable>
        <View className="absolute top-4 right-10 rounded-[40px] w-[65] h-[65]">
          <Image
            className="rounded-[40px] w-[65] h-[65]"
            source={{ uri: courseImage }}
          />
        </View>
      </View>
    </>
  );
};

export default CourseItem;

import { View, Text, Image, Pressable } from "react-native";
import React, { FC, useState } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { Favorite } from "../common/favorite";
import { removeItem } from "../../redux/features/favorite";
import { removeItemFromCart } from "../../redux/features/cart";
import { CustomModal } from "../common/modal";
import { CustomButton } from "../common/customButton";
import { useColorTheme } from "../../core/config/color";
import { ERouteList } from "../../core/enums/route";

interface CourseItemProp {
  courseTitle: string;
  courseTeacher: string;
  courseImage: string | undefined;
  coursePrice: string | number;
  item: any;
  pageName?: string;
}

export const CourseItem: FC<CourseItemProp> = ({
  courseTitle,
  courseTeacher,
  courseImage,
  coursePrice,
  pageName,
  item,
}): JSX.Element => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const navigation = useNavigation<any>();

  const dispatch = useDispatch();

  const color = useColorTheme();

  return (
    <>
      <View className="my-[15] pr-14 pl-6 relative">
        <Pressable
          onPress={() => {
            navigation.navigate(ERouteList.CourseDetails, { item });
          }}
          className="flex-row-reverse justify-between rounded-[20px] mx-5 py-3.5 bg-white dark:bg-[#212477] "
          style={{ elevation: 5 }}
        >
          <View className="mr-10">
            <View className="flex flex-row-reverse justify-around">
              <Text className="font-Yekan font-bold text-[18px] color-[#002D85] mb-2 dark:color-white ">
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
            {pageName === "Courses" ? (
              <Favorite color="gray" size={16} item={item} />
            ) : pageName === "fav" ? (
              <Pressable onPress={() => dispatch(removeItem(item))}>
                <AntDesign name="delete" color="red" size={15} />
              </Pressable>
            ) : (
              <></>
            )}

            {pageName === "cart" ? (
              <Pressable
                className="bg-red-500 rounded-[16px] items-center p-2 mt-11 "
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <AntDesign name="delete" color="white" size={16} />
              </Pressable>
            ) : (
              <AntDesign name="pluscircle" size={30} color={color?.iconColor} />
            )}
          </View>
        </Pressable>
        <View className="absolute top-4 right-10 rounded-[40px] w-[65] h-[65]">
          <Image
            className="rounded-[40px] w-[65] h-[65]"
            source={{ uri: courseImage }}
          />
        </View>
      </View>
      <CustomModal
        visible={modalVisible}
        animationType="slide"
        className2="px-12 py-6 rounded-[30px]"
        className="py-10"
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View>
          <Text className="font-Yekan text-[16px] text-center my-2 dark:color-white ">
            آیا از حذف این درس اطمینان دارید؟
          </Text>
          <View className="flex-row items-center justify-center my-4 ">
            <CustomButton
              buttonTitle="خیر"
              onPress={() => setModalVisible(!modalVisible)}
              className="border-[1.5px] font-Yekan border-[#FF0000] dark:border-white px-11 py-2 color-[#FF0000] dark:color-white text-[16px] text-center rounded-[27px] mx-2 "
            />
            <CustomButton
              buttonTitle="بله"
              onPress={() => {
                dispatch(removeItemFromCart(item));
                Toast.show({
                  type: "success",
                  text1: " درس انتخاب شده با موفقیت حذف شد",
                });
                setModalVisible(!modalVisible);
              }}
              className="bg-[#04A641] font-Yekan border-[1.5px] border-[#04A641] px-11 py-2 color-white text-[16px] text-center rounded-[27px] mx-2 "
            />
          </View>
        </View>
      </CustomModal>
    </>
  );
};

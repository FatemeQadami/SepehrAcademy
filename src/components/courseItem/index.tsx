import { useNavigation } from "@react-navigation/native";
import React, { FC, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useDispatch, useSelector } from "react-redux";

import { ERouteList } from "../../core/enums/route";
import { EStorageKeys } from "../../core/enums/storage";
import { getItem, setItem } from "../../core/services/storage/storage";
import { removeItemFromCart } from "../../redux/features/cart";
import { removeItemFromFav } from "../../redux/features/favorite";
import { RootState } from "../../redux/store";
import { BookMark } from "../common/bookMark";
import { CustomButton } from "../common/customButton";
import { Favorite } from "../common/favorite";
import { CustomModal } from "../common/modal";

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

  const { studentModel }: any = useSelector((state: RootState) => state.user);
  const cart: any = useSelector((state: RootState) => state.cart);
  const favorite: any = useSelector((state: RootState) => state.favorite);

  //---------- remove from cart ----------

  const removeFromCart = async () => {
    dispatch(removeItemFromCart(item));
    const filtered = cart.filter(
      (item: { _id: string }) => item._id !== item._id
    );
    const userData = {
      [studentModel?._id]: {
        cart: filtered,
        favorite: favorite,
      },
    };
    const get = await getItem(EStorageKeys.UserData);
    setItem(EStorageKeys.UserData, { ...get, ...userData });
    Toast.show({
      type: "success",
      text1: " درس انتخاب شده با موفقیت حذف شد",
    });
    setModalVisible(!modalVisible);
  };

  //---------- remove from favorite ----------

  const removeFromFavorite = async () => {
    dispatch(removeItemFromFav(item));
    const filtered = favorite.filter(
      (item: { _id: string }) => item._id !== item._id
    );
    const userData = {
      [studentModel?._id]: {
        cart: cart,
        favorite: filtered,
      },
    };
    const get = await getItem(EStorageKeys.UserData);
    setItem(EStorageKeys.UserData, { ...get, ...userData });
  };

  return (
    <>
      <View className="my-[15] pr-14 pl-6 relative">
        <Pressable
          onPress={() => {
            navigation.navigate({
              name: ERouteList.CourseDetails,
              params: { item },
            });
          }}
          className="flex-row-reverse justify-between rounded-[20px] mx-5 py-3.5 bg-white dark:bg-[#212477] "
          style={{ elevation: 5 }}
        >
          <View className="mr-10">
            <View className="flex flex-row-reverse justify-around">
              <Text className="font-Yekan font-bold text-[17px] color-[#002D85] mb-2 dark:color-white ">
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
              <View className="px-2 pb-2">
                <Favorite color="gray" size={20} item={item} />
              </View>
            ) : pageName === "fav" ? (
              <Pressable
                className="px-2 pb-2"
                onPress={() => removeFromFavorite()}
              >
                <AntDesign name="delete" color="red" size={18} />
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
            ) : pageName === "fav" ? (
              <></>
            ) : (
              <BookMark item={item} />
            )}
          </View>
        </Pressable>
        <View className="absolute top-[20%] right-10 rounded-full w-[65] h-[65]">
          <Image
            className="rounded-full w-[65] h-[65]"
            source={{ uri: courseImage }}
          />
        </View>
      </View>
      <CustomModal
        visible={modalVisible}
        animationType="slide"
        statusBarTranslucent
        className2="px-12 py-6 rounded-[30px] "
        className="py-10 bg-blue-rgba h-full"
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
                removeFromCart();
              }}
              className="bg-[#04A641] font-Yekan border-[1.5px] border-[#04A641] px-11 py-2 color-white text-[16px] text-center rounded-[27px] mx-2 "
            />
          </View>
        </View>
      </CustomModal>
    </>
  );
};

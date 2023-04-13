import { View, Text, Image, Pressable } from "react-native";
import React, { FC } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { useColorScheme } from "nativewind";

import user from "../../assets/img/profile/user.png";
import { removeItem } from "../../core/services/storage/storage";
import { RootState } from "../../redux/store";
import { handelLogin } from "../../redux/features/user";
import { useColorTheme } from "../../core/config/color";
import { ERouteList } from "../../core/enums/route";
import { EStorageKeys } from "../../core/enums/storage";

export const DrowerItem: FC = (): JSX.Element => {
  const navigation = useNavigation<any>();

  const color = useColorTheme();

  const { colorScheme } = useColorScheme();

  const { studentModel }: any = useSelector((state: RootState) => state.user);

  const { route }: any = useSelector((state: RootState) => state.selector);

  const dispatch = useDispatch();

  const clearPass = () => {
    removeItem(EStorageKeys.user);
    removeItem(EStorageKeys.token);
    dispatch(handelLogin({ model: null, token: null }));
    navigation.navigate(ERouteList.LogIn);
    Toast.show({
      type: "error",
      text1: "برای ورود به اپلیکیشن باید مجددا رمز عبور خود را وارد نمایید!!",
    });
  };

  return (
    <View className="p-[30] dark:bg-[#00216C] h-full">
      <View className="items-center mt-[90] mb-[75]">
        <Image
          source={
            studentModel && studentModel.profile
              ? { uri: studentModel.profile }
              : user
          }
          className="w-[153] h-[153] rounded-[80px]"
        />
        <Text className="font-Gab text-[25px] mt-4 color-[#002D85] dark:color-white">
          {studentModel && studentModel.fullName
            ? studentModel.fullName
            : "کاربر مهمان"}
        </Text>
      </View>
      <Pressable
        className="flex-row-reverse my-[10] pl-3 border-r-2"
        style={{
          borderRightColor:
            route === ERouteList.EditProfile
              ? color?.routeBorderColor
              : "transparent",
        }}
        onPress={() => {
          studentModel
            ? navigation.navigate(ERouteList.EditProfile)
            : navigation.replace(ERouteList.LogIn);
        }}
      >
        <FontAwesome
          name="user-o"
          color={
            route === ERouteList.EditProfile
              ? color?.iconColor
              : colorScheme === "dark"
              ? "white"
              : "gray"
          }
          size={15}
          style={{ marginTop: 2 }}
        />
        <Text
          className="text-[18px] font-Yekan px-5"
          style={{
            color:
              route === ERouteList.EditProfile
                ? color?.routeTextColor
                : colorScheme === "dark"
                ? "white"
                : "#686868",
          }}
        >
          {studentModel !== null ? "پروفایل کاربری" : "ورود/ثبت نام"}
        </Text>
      </Pressable>
      <Pressable
        className="flex-row-reverse my-[10] pl-3 border-r-2"
        style={{
          borderRightColor:
            route === ERouteList.CourseTab
              ? color?.routeBorderColor
              : "transparent",
        }}
        onPress={() => {
          navigation.navigate(ERouteList.CourseTab);
        }}
      >
        <Ionicons
          name="document-text-outline"
          color={
            route === ERouteList.CourseTab
              ? color?.iconColor
              : colorScheme === "dark"
              ? "white"
              : "gray"
          }
          size={15}
          style={{ marginTop: 2 }}
        />
        <Text
          className="text-[18px] font-Yekan px-5"
          style={{
            color:
              route === ERouteList.CourseTab
                ? color?.routeTextColor
                : colorScheme === "dark"
                ? "white"
                : "#686868",
          }}
        >
          دوره‌ها
        </Text>
      </Pressable>
      <Pressable
        className="flex-row-reverse my-[10] pl-3 border-r-2"
        style={{
          borderRightColor:
            route === ERouteList.Favorites
              ? color?.routeBorderColor
              : "transparent",
        }}
        onPress={() => {
          navigation.navigate(ERouteList.Favorites);
        }}
      >
        <FontAwesome
          name="heart-o"
          color={
            route === ERouteList.Favorites
              ? color?.iconColor
              : colorScheme === "dark"
              ? "white"
              : "gray"
          }
          size={15}
          style={{ marginTop: 2 }}
        />
        <Text
          className="color-[#686868] text-[18px] font-Yekan px-5"
          style={{
            color:
              route === ERouteList.Favorites
                ? color?.routeTextColor
                : colorScheme === "dark"
                ? "white"
                : "#686868",
          }}
        >
          علاقمندی‌ها
        </Text>
      </Pressable>
      <Pressable
        className="flex-row-reverse my-[10] pl-3 border-r-2"
        style={{
          borderRightColor:
            route === ERouteList.Cart ? color?.routeBorderColor : "transparent",
        }}
        onPress={() => {
          navigation.navigate(ERouteList.Cart);
        }}
      >
        <FontAwesome
          name="shopping-basket"
          color={
            route === ERouteList.Cart
              ? color?.iconColor
              : colorScheme === "dark"
              ? "white"
              : "gray"
          }
          size={15}
          style={{ marginTop: 2 }}
        />
        <Text
          className="color-[#686868] font-Yekan text-[18px] px-5"
          style={{
            color:
              route === ERouteList.Cart
                ? color?.routeTextColor
                : colorScheme === "dark"
                ? "white"
                : "#686868",
          }}
        >
          سبدخرید
        </Text>
      </Pressable>
      <Pressable
        className="flex-row-reverse my-[10] pl-3 border-r-2"
        style={{
          borderRightColor:
            route === ERouteList.Settings
              ? color?.routeBorderColor
              : "transparent",
        }}
        onPress={() => {
          navigation.navigate(ERouteList.Settings);
        }}
      >
        <Ionicons
          name="settings-outline"
          color={
            route === ERouteList.Settings
              ? color?.iconColor
              : colorScheme === "dark"
              ? "white"
              : "gray"
          }
          size={15}
          style={{ marginTop: 2 }}
        />
        <Text
          className="color-[#686868] font-Yekan text-[18px] px-5"
          style={{
            color:
              route === ERouteList.Settings
                ? color?.routeTextColor
                : colorScheme === "dark"
                ? "white"
                : "#686868",
          }}
        >
          تنظیمات
        </Text>
      </Pressable>
      {studentModel && (
        <View className="px-2">
          <Pressable
            onPress={() => clearPass()}
            className="bg-[#FFF4F4] flex-row px-2 py-2 mt-[170] rounded-[20px]"
          >
            <Text className="color-[#FF2B2B] font-Yekan text-[15px] px-2">
              خروج از حساب کاربری
            </Text>
            <AntDesign
              name="logout"
              color="#FF2B2B"
              size={12}
              style={{ padding: 2 }}
            />
          </Pressable>
        </View>
      )}
    </View>
  );
};

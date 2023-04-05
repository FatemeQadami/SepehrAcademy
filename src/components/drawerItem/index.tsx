import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import user from "../../assets/img/profile/user.png";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { removeItem } from "../../core/services/storage/storage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { handelLogin } from "../../redux/features/user";
import Toast from "react-native-toast-message";

const DrowerItem = () => {
  const navigation = useNavigation<any>();

  const { studentModel }: any = useSelector((state: RootState) => state.user);

  const { route } = useSelector((state: RootState) => state.selector);

  const dispatch = useDispatch();

  const clearPass = () => {
    removeItem("user");
    removeItem("token");
    dispatch(handelLogin({ model: null, token: null }));
    navigation.navigate("Login");
    Toast.show({
      type: "error",
      text1: "برای ورود به اپلیکیشن باید مجددا رمز عبور خود را وارد نمایید!!",
    });
  };

  return (
    <View className="p-[30]">
      <View className="items-center mt-[90] mb-[75]">
        <Image
          source={
            studentModel && studentModel.profile
              ? { uri: studentModel.profile }
              : user
          }
          className="w-[153] h-[153] rounded-[80px]"
        />
        <Text className="font-Gab text-[25px] mt-4 ">
          {studentModel && studentModel.fullName
            ? studentModel.fullName
            : "کاربر مهمان"}
        </Text>
      </View>
      <Pressable
        onPress={() => {
          studentModel
            ? navigation.navigate("Profile")
            : navigation.replace("Login");
        }}
      >
        <View
          className="flex-row-reverse my-[10] pl-3 border-r-2"
          style={{
            borderRightColor: route === "Profile" ? "#0136C4" : "white",
          }}
        >
          <FontAwesome
            name="user-o"
            color={route === "Profile" ? "#0136C4" : "gray"}
            size={15}
          />
          <Text
            className="text-[18px] font-Yekan px-5"
            style={{ color: route === "Profile" ? "#0136C4" : "#686868" }}
          >
            {studentModel ? "پروفایل کاربری" : "ورود/ثبت نام"}
          </Text>
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("CoursesTab");
        }}
      >
        <View
          className="flex-row-reverse my-[10] pl-3 border-r-2"
          style={{
            borderRightColor: route === "CoursesTab" ? "#0136C4" : "white",
          }}
        >
          <Ionicons
            name="document-text-outline"
            color={route === "CoursesTab" ? "#0136C4" : "gray"}
            size={15}
          />
          <Text
            className="text-[18px] font-Yekan px-5"
            style={{ color: route === "CoursesTab" ? "#0136C4" : "#686868" }}
          >
            دوره‌ها
          </Text>
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("Favorites");
        }}
      >
        <View
          className="flex-row-reverse my-[10] pl-3 border-r-2"
          style={{
            borderRightColor: route === "Favorites" ? "#0136C4" : "white",
          }}
        >
          <FontAwesome
            name="heart-o"
            color={route === "Favorites" ? "#0136C4" : "gray"}
            size={15}
          />
          <Text
            className="color-[#686868] text-[18px] font-Yekan px-5"
            style={{ color: route === "Favorites" ? "#0136C4" : "#686868" }}
          >
            علاقمندی‌ها
          </Text>
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("Cart");
        }}
      >
        <View
          className="flex-row-reverse my-[10] pl-3 border-r-2"
          style={{
            borderRightColor: route === "Cart" ? "#0136C4" : "white",
          }}
        >
          <FontAwesome
            name="shopping-basket"
            color={route === "Cart" ? "#0136C4" : "gray"}
            size={15}
          />
          <Text
            className="color-[#686868] font-Yekan text-[18px] px-5"
            style={{ color: route === "Cart" ? "#0136C4" : "#686868" }}
          >
            سبدخرید
          </Text>
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("Settings");
        }}
      >
        <View
          className="flex-row-reverse my-[10] pl-3 border-r-2"
          style={{
            borderRightColor: route === "Settings" ? "#0136C4" : "white",
          }}
        >
          <Ionicons
            name="settings-outline"
            color={route === "Settings" ? "#0136C4" : "gray"}
            size={15}
          />
          <Text
            className="color-[#686868] font-Yekan text-[18px] px-5"
            style={{ color: route === "Settings" ? "#0136C4" : "#686868" }}
          >
            تنظیمات
          </Text>
        </View>
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

export default DrowerItem;

import { Link, useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  Pressable,
  ScrollView,
} from "react-native";

import logo from "../../assets/img/pre-start/logo.png";
import background from "../../assets/img/pre-start/background.png";
import { CustomButton } from "../common/customButton";
import { ERouteList } from "../../core/enums/route";

const { width, height } = Dimensions.get("screen");

console.log("width" , width)

export const StartPage: FC = (): JSX.Element => {
  const navigation = useNavigation<any>();

  return (
    <View className="flex justify-content bg-white dark:bg-[#00216C] h-[full]">
      <ImageBackground
        source={background}
        style={{
          width: "123%",
          height: "123%",
          position: "absolute",
          top: -height / 1.47,
          left: -width / 1.83,
        }}
        resizeMode="contain"
      />
      <ImageBackground
        source={background}
        style={{
          position: "absolute",
          width: "123%",
          height: "123%",
          top: -height / 6.3,
          right: -width / 1.7,
        }}
        resizeMode="contain"
      />
      <View className="flex-col justify-center items-center mt-44">
        <View className="flex flex-col justify-center">
          <Image className="border mx-auto mb-1" source={logo} />
          <Text className="text-[23px] font-Yekan font-light text-center pt-5 color-[#00469A]  dark:color-white">
            آکادمی کدنویسی بحر
          </Text>
        </View>
        <View className="flex rounded-t-[40] p-9 mt-20 bg-[#3A84FF] pb-16 w-full">
          <Text className="text-white text-[32px] font-Yekan text-right items-center pt-4">
            خوش آمدید
          </Text>
          <Text className="text-white text-[15px] font-Yekan mt-4">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطر آنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
            و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
          </Text>
          <View className="flex-row justify-between mt-16">
            <CustomButton
              buttonTitle="ثبت‌ نام"
              onPress={() => {
                navigation?.navigate(ERouteList?.SignUp);
              }}
              className="font-Yekan color-white text-[16px] text-center border-2 border-white pb-2 pt-3 px-12 rounded-[27px] "
            />
            <CustomButton
              buttonTitle="ورود"
              onPress={() => {
                navigation.navigate(ERouteList.LogIn);
              }}
              className="font-Yekan color-white text-[16px] text-center border-2 border-[#0043F7] bg-[#0043F7] pb-2 pt-3 px-[56] rounded-[27px] "
            />
          </View>
          <Pressable
            onPress={() =>
              navigation.navigate(ERouteList.MyDrawer, {
                screen: ERouteList.DrawerTab,
                params: { screen: ERouteList.CourseTab },
              })
            }
          >
            <Text className="font-Yekan color-white text-[18px] text-center mt-[55] mb-4 underline">
              ورود به صفحه اصلی
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

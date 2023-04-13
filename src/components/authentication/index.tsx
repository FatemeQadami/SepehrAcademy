import { Dimensions, ImageBackground, Text, View } from "react-native";
import React, { FC } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import background from "../../assets/img/auth/background.png";
import { LoginForm } from "./login";
import { SignUpForm } from "./signUp";
import { ForgetpassForm } from "./forgetpass";

const { width, height } = Dimensions.get("screen");

interface AuthLayoutProp {
  formBox: string;
  pageTitle: string;
}

export const AuthLayout: FC<AuthLayoutProp> = ({
  formBox,
  pageTitle,
}): JSX.Element => {
  return (
    <KeyboardAwareScrollView>
      <View className="bg-white dark:bg-[#00216C] ">
        <ImageBackground
          source={background}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: -height / 1.78,
            left: -width / 3,
          }}
          resizeMode="contain"
        />
        <ImageBackground
          source={background}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: -height / 25,
            right: -width / 2.5,
          }}
          resizeMode="contain"
        />
        <View className="px-10 mt-[70]">
          <Text className="font-Yekan text-[30px] dark:color-white">
            {pageTitle}
          </Text>
          <Text className="font-Yekan text-[14px] mt-[8] mb-[48] dark:color-white">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
            و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
          </Text>
        </View>

        <View
          className="flex rounded-t-[35] px-10 bg-[#3A84FF] pt-[50] "
          style={
            formBox === "forgetpass"
              ? {
                  height: 390,
                  marginTop: 254,
                }
              : { height: 645 }
          }
        >
          {formBox === "login" ? (
            <LoginForm />
          ) : formBox === "signUp" ? (
            <SignUpForm />
          ) : (
            <ForgetpassForm />
          )}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

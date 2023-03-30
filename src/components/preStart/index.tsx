import { Link, useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, Image, ImageBackground, Dimensions } from "react-native";
import logo from "../../assets/img/pre-start/logo.png";
import background from "../../assets/img/pre-start/background.png";
import CustomButton from "../common/customButton";

const { width, height } = Dimensions.get("screen");

const PreStartPage = ({ navigateToSignUp, navigateToLogin }: any) => {
  const navigation = useNavigation<any>();

  return (
    <View className="flex justify-content bg-white" style={{ height: 880 }}>
      <ImageBackground
        source={background}
        style={{
          width: "123%",
          height: "123%",
          position: "absolute",
          top: -height / 1.56,
          left: -width / 1.82,
        }}
        resizeMode="contain"
      />
      <ImageBackground
        source={background}
        style={{
          position: "absolute",
          width: "123%",
          height: "123%",
          top: -height / 7.3,
          right: -width / 1.7,
        }}
        resizeMode="contain"
      />
      <View className="mt-44">
        <View className="flex justify-center justify-between">
          <Image className="border mx-auto mb-1" source={logo} />
          <Text
            className="text-3xl font-Yekan font-light text-center pt-5"
            style={{ color: "#00469A" }}
          >
            آکادمی کدنویسی بحر
          </Text>
        </View>
        <View
          className="flex rounded-t-[40] p-9 mt-20"
          style={{ backgroundColor: "#3A84FF", height: 480 }}
        >
          <Text className="text-white text-5xl font-Yekan pt-3">خوش آمدید</Text>
          <Text className="text-white text-base font-Yekan mt-4">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
            و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
          </Text>
          <View className="flex-row justify-center justify-between mt-16">
            <CustomButton
              buttonTitle="ثبت‌ نام"
              onPress={() => {
                navigation.navigate("SignUp");
              }}
              className="font-Yekan color-white text-[16px] text-center border-2 border-white py-[10] w-[148] rounded-[27px] "
            />
            <CustomButton
              buttonTitle="ورود"
              onPress={() => {
                navigation.navigate("Login");
              }}
              className="font-Yekan color-white text-[16px] text-center bg-[#0043F7] py-[12] w-[150] rounded-[27px] "
            />
          </View>
          <Link
            to={{ screen: "Courses" }}
            style={{
              marginTop: 55,
              marginBottom: 25,
              textAlign: "center",
              color: "white",
              fontSize: 20,
              fontFamily: "YekanBakh",
              textDecorationLine: "underline",
            }}
          >
            ورود به صفحه اصلی
          </Link>
        </View>
      </View>
    </View>
  );
};

export default PreStartPage;

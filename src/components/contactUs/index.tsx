import React, { FC } from "react";
import { Image, Pressable, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";

import logo from "../../assets/img/contactUs/logo.png";

interface ContactUsProps {
  onPress: Function;
}

export const ContactUs: FC<ContactUsProps> = ({ onPress }): JSX.Element => {
  return (
    <View>
      <View className="flex justify-center">
        <Image className="border mx-auto mt-8 mb-1" source={logo} />
        <Text className="text-[23px] font-Yekan font-light text-center py-5 color-[#00469A] dark:color-white ">
          آکادمی کدنویسی بحر
        </Text>
        <Text className="font-Yekan text-[14px] color-[#818181] my-7">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
          کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی
          در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می
          طلبد،
        </Text>
        <View className="flex-row-reverse justify-between my-3">
          <View className="flex-row-reverse items-center">
            <Entypo
              name="email"
              color="white"
              size={15}
              style={{
                backgroundColor: "#2A8CFE",
                borderRadius: 8,
                paddingHorizontal: 4,
                paddingVertical: 4,
              }}
            />
            <Text className="font-Yekan text-[13px] color-[#818181] mr-2">
              ایمیل:
            </Text>
          </View>
          <Text className="font-Gab text-[19px] color-[#474747] dark:color-white">
            Sepehr_academy@gmail.com
          </Text>
        </View>
        <View className="flex-row-reverse justify-between my-3">
          <View className="flex-row-reverse items-center">
            <Feather
              name="phone-call"
              color="white"
              size={15}
              style={{
                backgroundColor: "#2A8CFE",
                borderRadius: 8,
                paddingHorizontal: 4,
                paddingVertical: 4,
              }}
            />
            <Text className="font-Yekan text-[13px] color-[#818181] mr-2">
              شماره تماس:
            </Text>
          </View>
          <Text className="font-Yekan text-[14px] color-[#474747] mt-1 dark:color-white">
            0911 123 1234
          </Text>
        </View>
        <View className="flex-row-reverse mt-4 mb-[50]">
          <View className="flex-row-reverse items-center">
            <Ionicons
              name="location-outline"
              color="white"
              size={15}
              style={{
                backgroundColor: "#2A8CFE",
                borderRadius: 8,
                paddingHorizontal: 4,
                paddingVertical: 4,
              }}
            />
            <Text className="font-Yekan text-[13px] color-[#818181] mr-2 ">
              آدرس:
            </Text>
          </View>
          <Text className="font-Yekan mt-1 text-[14px] color-[#474747] mr-2 dark:color-white">
            ساری، جاده دریا، بعد از مجتمع دنیای آرزو
          </Text>
        </View>
        <Pressable
          onPress={() => {
            onPress();
          }}
        >
          <Text className="border border-[#FF0000] dark:border-white px-8 py-2 color-[#FF0000] dark:color-white text-[16px] text-center rounded-[27px] mx-3 ">
            بازگشت
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

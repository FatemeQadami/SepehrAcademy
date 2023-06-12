import React, { FC } from "react";
import { Pressable, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

interface AwarenessPropsType {
  closeOnpress: Function;
}

export const Awareness: FC<AwarenessPropsType> = ({
  closeOnpress,
}): JSX.Element => {
  return (
    <View>
      <Pressable onPress={() => closeOnpress()}>
        <FontAwesome name="close" size={22} color="red" />
      </Pressable>
      <View className="mx-2">
        <Text className="font-Yekan text-base color-black dark:color-white leading-8 pb-5">
          باسلام{"\n"}
          {"\n"}خوشحالیم که تصمیم دارید در دوره‌های آکادمی سپهر شرکت کنید.
          {"\n"}
          در این اپلیکیشن شما قادر خواهید بود دوره‌هایی که به صورت حضوری در پژوهشگاه سپهر  تدریس
          میشوند را رزرو کنید، سپس تیم سپهر با شما تماس خواهد گرفت تا اطلاعات و
          جزئیات دوره و شرایط شرکت در دوره را در اختیارتان قرار دهد.
          {"\n"}
          برای دریافت آدرس و شماره تماس آکادمی وارد صفحه "تنظیمات" شده سپس وارد
          بخش "درباره ما" شوید.{"\n"}
          {"\n"}با آرزوی رضایتمندی شما
        </Text>
      </View>
    </View>
  );
};

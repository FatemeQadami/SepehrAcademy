import React, { FC } from "react";
import { Image, Pressable, Text, View } from "react-native";
import logo from "../../assets/img/aboutUs/logo.png";

interface AboutUsProps {
  onPress: Function;
}

export const AboutUs: FC<AboutUsProps> = ({ onPress }): JSX.Element => {
  return (
    <View>
      <View className="flex justify-center">
        <Image className="border mx-auto mt-8 mb-1" source={logo} />
        <Text className="text-[23px] font-Yekan font-light text-center pt-5 color-[#00469A] dark:color-white">
          آکادمی کدنویسی بحر
        </Text>
        <Text className="font-Yekan text-[14px] color-[#818181] mt-10 mb-8">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
          کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی
          در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می
          طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی
          الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این
          صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و
          شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای
          اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده
          قرار گیرد. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ،
          و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
          در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
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
  );
};

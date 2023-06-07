import React, { FC } from "react";
import { Pressable, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

interface PrivacyPolicyType {
  closeOnpress: Function;
}

export const PrivacyPolicy: FC<PrivacyPolicyType> = ({
  closeOnpress,
}): JSX.Element => {
  return (
    <View>
      <Pressable onPress={() => closeOnpress()}>
        <FontAwesome name="close" size={22} color="red" />
      </Pressable>
      <View className="mx-2">
        <Text className="font-Yekan font-bold text-lg mt-5 color-black dark:color-white ">
          اطلاعیه حفظ حریم خصوصی
        </Text>
        <Text className="font-Yekan text-base my-8  color-black dark:color-white leading-8 ">
          ما در این اپلیکیشن به حفاظت کردن و احترام گذاشتن به حریم شخصی شما
          متعهد هستیم.{"\n"}
          هر گونه اطلاعاتی که داوطلبانه در اختیار ما قرار می دهید، از جمله نام و
          آدرس ایمیل خود و ... ، تنها برای هدفی که اطلاعات به ما ارائه شده است،
          استفاده می شود .{"\n"} این اپلیکیشن هیچ اطلاعاتی در مورد شما از منابع
          دیگر جمع آوری نمی کند .{"\n"} ما داده‌های شخصی جمع‌آوری‌شده شما را طبق
          آنچه در بالا ذکر شد، نمی‌فروشیم یا افشا نمی‌کنیم .
        </Text>
      </View>
    </View>
  );
};

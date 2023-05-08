import { View, Text } from "react-native";
import React, { FC } from "react";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { handelLogOut } from "../../redux/features/user";
import { CustomButton } from "../common/customButton";
import { ERouteList } from "../../core/enums/route";

interface clearPassType {
  onPress: any;
}

export const ClearPassword: FC<clearPassType> = ({ onPress }): JSX.Element => {

  const dispatch = useDispatch();

  const navigation = useNavigation<any>();

  const clearPass = () => {
    dispatch(handelLogOut());

    navigation.navigate(ERouteList.LogIn);
    Toast.show({
      type: "error",
      text1: "برای ورود به اپلیکیشن باید مجددا رمز عبور خود را وارد نمایید!!",
    });
  };

  return (
    <View>
      <Text className="font-Yekan text-[18px] text-center px-1 dark:color-white">
        با این عمل، برای ورود به اپلیکیشن باید مجددا رمز عبور خود را وارد
        نمایید.
      </Text>
      <Text className="font-Yekan text-[18px] text-center my-8 dark:color-white">
        آیا مایل به ادامه هستید؟
      </Text>
      <View className="flex-row items-center justify-center my-1">
        <CustomButton
          buttonTitle="بازگشت"
          onPress={() => {
            onPress();
          }}
          className="border font-Yekan border-[#FF0000] dark:border-white text-center px-8 py-2 color-[#FF0000] dark:color-white text-[16px] rounded-[27px] mx-3 "
        />
        <CustomButton
          buttonTitle="تایید"
          onPress={() => clearPass()}
          className="bg-[#04A641] font-Yekan border border-[#04A641] px-10 py-2 text-center color-white text-[16px] rounded-[27px] mx-3 "
        />
      </View>
    </View>
  );
};

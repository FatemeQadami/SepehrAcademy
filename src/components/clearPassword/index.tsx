import { View, Text, Pressable } from "react-native";
import React, { FC } from "react";
import { removeItem } from "../../core/services/storage/storage";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { handelLogin } from "../../redux/features/user";
import Toast from "react-native-toast-message";
import CustomButton from "../common/customButton";

interface clearPassType {
  onPress: any;
}

const ClearPassword: FC<clearPassType> = ({ onPress }): JSX.Element => {
  const {} = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const navigation = useNavigation<any>();

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
    <View>
      <Text className="font-Yekan text-[18px] text-center px-1">
        با این عمل، برای ورود به اپلیکیشن باید مجددا رمز عبور خود را وارد
        نمایید.
      </Text>
      <Text className="font-Yekan text-[18px] text-center my-8">
        آیا مایل به ادامه هستید؟
      </Text>
      <View className="flex-row items-center justify-center my-1">
        
        <CustomButton
          buttonTitle="بازگشت"
          onPress={() => {
            onPress();
          }}
          className="border font-Yekan border-[#FF0000] text-center px-8 py-2 color-[#FF0000] text-[16px] rounded-[27px] mx-3 "
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

export default ClearPassword;
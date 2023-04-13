import {View } from "react-native";
import React, { FC, useState } from "react";
import Toast from "react-native-toast-message";
import { Link } from "@react-navigation/native";

import {Form} from "../../common/forms";
import { forgetpassValidation } from "../../../core/validation";
import {InputText} from "../../common/inputText";
import { CustomButton } from "../../common/customButton";
import { forgetPassAPI } from "../../../core/services/api/auth/forget.api";
import { forgetPassType } from "../../../core/models";
import { ERouteList } from "../../../core/enums/route";

export const ForgetpassForm: FC = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const onSubmit = async (value: forgetPassType) => {
    setIsLoading(true);
    const userObj = {
      email: value?.email,
    };
    const user = await forgetPassAPI(userObj);

    if (user) {
      Toast.show({
        type: "success",
        text1: "لینک تغییر رمزعبور به ایمیل شما ارسال شد :)",
      });
    }
    setIsLoading(false);
  };
  return (
    <View>
      <Form
        enableReinitialize
        initialValues={{ email: "" }}
        validationSchema={forgetpassValidation}
        onSubmit={onSubmit}
      >
        {({ submitForm }) => (
          <>
            <>
              <InputText
                name="email"
                placeholder="ایمیل"
                type="email-address"
                rightIconName="envelope-o"
                rightIconSize={20}
                rightIconStyle={{ marginRight: 20, paddingTop: 12 }}
                className="bg-white text-right fontSize-[18px] h-[45] w-[270] pr-[20]"
              />
            </>
            <View className="mt-[50]">
              <CustomButton
                buttonTitle="تایید ایمیل"
                isLoading={isLoading}
                loadingClassName="bg-[#0043F7] py-3.5 rounded-[30px]"
                color="white"
                onPress={submitForm}
                className="text-center font-Yekan text-[20px] bg-[#0043F7] color-white rounded-[30px] py-3 "
              />
            </View>
            <View className="flex flex-row-reverse justify-center mt-20">
              <Link
                to={{ screen: ERouteList.LogIn }}
                style={{
                  fontFamily: "YekanBakh",
                  fontSize: 18,
                  color: "white",
                  paddingHorizontal: 50,
                  textDecorationLine: "underline",
                  borderLeftWidth: 1,
                  borderLeftColor: "white",
                }}
              >
                ورود
              </Link>
              <Link
                to={{ screen: ERouteList.SignUp }}
                style={{
                  fontFamily: "YekanBakh",
                  fontSize: 18,
                  color: "white",
                  paddingHorizontal: 50,
                  borderRightWidth: 1,
                  borderRightColor: "white",
                  textDecorationLine: "underline",
                }}
              >
                ثبت نام
              </Link>
            </View>
          </>
        )}
      </Form>
    </View>
  );
};

import { Pressable, View, Text } from "react-native";
import React, { useState } from "react";
import Form from "../../common/forms";
import { validationReset } from "../../../core/validation";
import InputText from "../../common/inputText";
import CustomButton from "../../common/customButton";
import Toast from "react-native-toast-message";
import { forgetPassType, resetPassType } from "../../../core/models";
import { resetPassAPI } from "../../../core/services/api/auth/resetPass.api";
import { forgetPassAPI } from "../../../core/services/api/auth/forget.api";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";

const ResetPass = () => {
  const [isPasswordSecure, setIsPasswordSecure] = useState<Boolean>(true);
  const [isPasswordSecure2, setIsPasswordSecure2] = useState<Boolean>(true);

  const { studentModel }: any = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const onSubmit = async (values: resetPassType) => {
    try {
      const userObj: forgetPassType = {
        email: studentModel?.email,
      };
      const user = await forgetPassAPI(userObj);
    } catch (error) {}

    const userObj2: resetPassType = {
      password: values?.password,
    };
    const Reset = await resetPassAPI(userObj2);
    Toast.show({ type: "success", text1: "رمزعبور با موفقیت تغییر یافت" });

    console.log("first" , values);
  };

  return (
    <View>
      <Form
        enableReinitialize
        initialValues={{ password: "", passwordConfirm: "" }}
        validationSchema={validationReset}
        onSubmit={onSubmit}
      >
        {({ submitForm, resetForm }) => (
          <>
            <>
              <InputText
                name="password"
                placeholder="رمز عبور جدید"
                rightIconName="lock"
                rightIconSize={22}
                rightIconStyle={{ marginTop: 10, marginRight: 20 }}
                secureTextEntry={isPasswordSecure}
                leftIconName={isPasswordSecure ? "eye" : "eye-slash"}
                onPress={() => {
                  isPasswordSecure
                    ? setIsPasswordSecure(false)
                    : setIsPasswordSecure(true);
                }}
                leftIconSize={22}
                leftIconStyle={{ padding: 10, marginLeft: 8 }}
                className="text-right fontSize-[18px] h-[42] w-[190] pr-[20]"
                classView="border-2 border-[#E3E6E8]"
              />
              <InputText
                name="passwordConfirm"
                placeholder="تکرار رمز عبور جدید"
                rightIconName="lock"
                rightIconSize={22}
                rightIconStyle={{ marginTop: 10, marginRight: 20 }}
                secureTextEntry={isPasswordSecure2}
                leftIconName={isPasswordSecure2 ? "eye" : "eye-slash"}
                onPress={() => {
                  isPasswordSecure2
                    ? setIsPasswordSecure2(false)
                    : setIsPasswordSecure2(true);
                }}
                leftIconSize={22}
                leftIconStyle={{ padding: 10, marginLeft: 8 }}
                className="text-right fontSize-[18px] h-[42] w-[190] pr-[20]"
                classView="border-2 border-[#E3E6E8]"
              />
            </>
            <View className="flex-row items-center justify-center my-5">
              <Pressable onPress={() => resetForm()}>
                <Text className="border font-Yekan border-[#FF0000] px-10 py-2 color-[#FF0000] text-[16px] text-center rounded-[27px] mx-3 ">
                  باز نشانی
                </Text>
              </Pressable>
              <CustomButton
                buttonTitle="تغییر رمز عبور"
                onPress={() => submitForm()}
                className="bg-[#04A641] font-Yekan border border-[#04A641] px-8 py-2 color-white text-[16px] text-center rounded-[27px] mx-3"
              />
            </View>
          </>
        )}
      </Form>
    </View>
  );
};

export default ResetPass;
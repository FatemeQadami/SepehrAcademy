import { Text, View, Image } from "react-native";
import React, { useState, FC } from "react";
import { Link, useNavigation, CommonActions } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

import { Form } from "../../common/forms";
import { loginValidation } from "../../../core/validation";
import { InputText } from "../../common/inputText";
import google from "../../../assets/img/auth/login/google.png";
import facebook from "../../../assets/img/auth/login/facebook.png";
import twitter from "../../../assets/img/auth/login/twitter.png";
import { CustomButton } from "../../common/customButton";
import { loginAPI } from "../../../core/services/api/auth/login.api";
import { RootState } from "../../../redux/store";
import { handelLogin } from "../../../redux/features/user";
import { loginType } from "../../../core/models";
import { ERouteList } from "../../../core/enums/route";
import { getItem } from "../../../core/services/storage/storage";
import { EStorageKeys } from "../../../core/enums/storage";
import { loadCartData } from "../../../redux/features/cart";
import { loadFavData } from "../../../redux/features/favorite";

export const LoginForm: FC = (): JSX.Element => {
  const [isPasswordSecure, setIsPasswordSecure] = useState<Boolean>(true);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const { token, studentModel }: any = useSelector(
    (state: RootState) => state.user
  );

  const navigation = useNavigation<any>();

  const dispatch = useDispatch();

  const onSubmit = async (values: loginType) => {
    setIsLoading(true);
    const userObj = {
      email: values?.email,
      password: values?.password,
    };
    const user = await loginAPI(userObj);
    if (user) {
      dispatch(
        handelLogin({
          token: user.jwtToken,
          model: user.studentModel,
        })
      );

      const UserData = await getItem(EStorageKeys.UserData);
      if (UserData) {
        dispatch(loadCartData(UserData[user?.studentModel?._id]?.cart));
        dispatch(loadFavData(UserData[user?.studentModel?._id]?.favorite));
      }

      Toast.show({
        type: "success",
        text1: `کاربر  ${user?.studentModel?.fullName}  عزیز خوش آمدید :)`,
      });
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: ERouteList.MyDrawer }],
        })
      );
    }
    console.log(values);
    setIsLoading(false);
  };
  return (
    <>
      <Form
        enableReinitialize
        initialValues={{ email: "", password: "" }}
        validationSchema={loginValidation}
        onSubmit={onSubmit}
      >
        {({ submitForm }) => (
          <>
            <>
              <InputText
                className="bg-white text-right fontSize-[18px] h-[45] w-[270] pr-[20]"
                name="email"
                placeholder="ایمیل"
                type="email-address"
                rightIconName="envelope-o"
                rightIconSize={20}
                rightIconStyle={{ marginRight: 20, paddingTop: 12 }}
              />
              <InputText
                className="bg-white text-right fontSize-[18px] h-[45] w-[245] pr-[20]"
                secureTextEntry={isPasswordSecure}
                name="password"
                placeholder="رمزعبور"
                rightIconName="lock"
                rightIconSize={22}
                rightIconStyle={{ marginRight: 20, paddingTop: 12 }}
                leftIconName={isPasswordSecure ? "eye" : "eye-slash"}
                onPress={() => {
                  isPasswordSecure
                    ? setIsPasswordSecure(false)
                    : setIsPasswordSecure(true);
                }}
                leftIconSize={22}
                leftIconStyle={{ padding: 10, marginLeft: 10 }}
              />
            </>
            <>
              <Link
                to={{ screen: ERouteList.ForgetPass }}
                style={{
                  color: "white",
                  textAlign: "left",
                  fontFamily: "YekanBakh",
                  fontSize: 16,
                  marginBottom: 80,
                }}
              >
                فراموشی رمز عبور ؟
              </Link>
            </>
            <>
              <CustomButton
                buttonTitle="ورود"
                isLoading={isLoading}
                loadingClassName="bg-[#0043F7] py-3.5 rounded-[30px]"
                color="white"
                onPress={submitForm}
                className="text-center font-Yekan text-[20px] bg-[#0043F7] color-white rounded-[30px] py-3 "
              />
            </>
          </>
        )}
      </Form>
      <View className="flex flex-row justify-center my-12">
        <Link
          to={{ screen: ERouteList.SignUp }}
          style={{
            color: "white",
            fontSize: 18,
            fontFamily: "YekanBakh",
            textDecorationLine: "underline",
          }}
        >
          ثبت‌ نام
        </Link>
        <Text
          style={{
            fontFamily: "YekanBakh",
            fontSize: 15,
            color: "white",
            paddingTop: 2,
          }}
        >
          در حال حاضر اکانت فعالی ندارید؟
        </Text>
      </View>
      <View className="flex flex-row justify-center mb-7">
        <View className="bg-white mt-[10] h-[1] w-[30%]" />
        <Text className="font-Yekan text-[15px] color-white px-[6] ">
          ورود از طریق
        </Text>
        <View className="bg-white mt-[10] h-[1] w-[30%] " />
      </View>
      <View className="flex flex-row justify-center">
        <Image className="mx-3" source={google} />
        <Image className="mx-3" source={twitter} />
        <Image className="mx-3" source={facebook} />
      </View>
    </>
  );
};

import { Text, View, Pressable } from "react-native";
import React, { FC, useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigation, CommonActions, useIsFocused } from "@react-navigation/native";
import StepIndicator from "react-native-step-indicator";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";

import { InputText } from "../../common/inputText";
import { Form } from "../../common/forms";
import { CustomButton } from "../../common/customButton";
import { signUp1Validation, signUp2Validation } from "../../../core/validation";
import { CustomModal } from "../../common/modal";
import { DateInput } from "../../common/dateInput";
import { RootState } from "../../../redux/store";
import { handelLogin } from "../../../redux/features/user";
import { loginAPI } from "../../../core/services/api/auth/login.api";
import { loginType, signUpType } from "../../../core/models";
import { signUpAPI } from "../../../core/services/api/auth/signUp.api";
import { ERouteList } from "../../../core/enums/route";
import { PrivacyPolicy } from "../../PrivacyPolicy";

export const SignUpForm: FC = (): JSX.Element => {
  const [step, setStep] = useState<number>(0);
  const [isPasswordSecure, setIsPasswordSecure] = useState<Boolean>(true);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [privacyModalVisible, setPrivacyModalVisible] =
    useState<boolean>(false);

  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const isFocus = useIsFocused();

  const { studentModel }: any = useSelector((state: RootState) => state.user);

  //---------- first Step---------

  const onFirstStep = ({ setTouched }: any) => {
    setStep(1);
    setTouched({});
  };

  //---------- second Step---------

  const onSecondStep = async (values: signUpType) => {
    setIsLoading(true);
    console.log(values);

    // ----------signUpAPI----------

    const userObj: signUpType = {
      fullName: values?.fullName,
      email: values?.email,
      password: values?.password,
      phoneNumber: values?.phoneNumber,
      birthDate: values?.birthDate,
      nationalId: values?.nationalId,
    };

    const user = await signUpAPI(userObj);
    if (user) {
      dispatch(
        handelLogin({
          model: user.studentModel,
        })
      );

      Toast.show({ type: "success", text1: " ثبت نام با موفقیت انجام شد 🎉" });
      console.log("fffff", studentModel);
    }

    // ----------loginAPI----------

    const userObj2: loginType = {
      email: values?.email,
      password: values?.password,
    };
    const response = await loginAPI(userObj2);
    if (response) {
      dispatch(
        handelLogin({
          token: response.jwtToken,
          model: response.studentModel,
        })
      );
      Toast.show({
        type: "success",
        text1: `کاربر ${response?.studentModel?.fullName} عزیز خوش آمدید :)`,
      });
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: ERouteList.MyDrawer }],
        })
      );
    }
    setIsLoading(false);
  };

  //-------- StepIndicator Style ---------

  const customStyles = {
    stepIndicatorSize: 70,
    currentStepIndicatorSize: 70,
    separatorStrokeWidth: 3,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: "white",
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: "rgba(255,255,255,0.5)",
    stepStrokeUnFinishedColor: "rgba(255,255,255,0.5)",
    separatorFinishedColor: "rgba(255,255,255,0.5)",
    separatorUnFinishedColor: "rgba(255,255,255,0.5)",
    stepIndicatorFinishedColor: "#3A84FF",
    stepIndicatorUnFinishedColor: "#3A84FF",
    stepIndicatorCurrentColor: "#3A84FF",
  };

  useEffect(() => {
    if(isFocus)
    setPrivacyModalVisible(true);
  }, [isFocus]);

  return (
    <>
      <View className="mb-8">
        <StepIndicator
          customStyles={customStyles}
          currentPosition={step}
          stepCount={2}
          onPress={() => {
            setStep(0);
          }}
        />
      </View>
      <Form
        enableReinitialize
        initialValues={{
          fullName: "",
          phoneNumber: "",
          nationalId: "",
          birthDate: "",
          email: "",
          password: "",
        }}
        validationSchema={step === 0 ? signUp1Validation : signUp2Validation}
        onSubmit={step === 0 ? onFirstStep : onSecondStep}
      >
        {({ submitForm, values, setFieldValue }) => (
          <>
            {step === 0 ? (
              <>
                <View>
                  <InputText
                    name="fullName"
                    placeholder="نام کاربر"
                    rightIconName="user"
                    rightIconSize={20}
                    rightIconStyle={{ marginRight: 20, paddingTop: 12 }}
                    className="bg-white text-right fontSize-[18px] h-[45] w-[270] pr-[20]"
                  />
                  <InputText
                    name="phoneNumber"
                    placeholder="شماره تماس"
                    rightIconName="phone"
                    rightIconSize={20}
                    type="number-pad"
                    rightIconStyle={{ marginRight: 20, paddingTop: 12 }}
                    className="bg-white text-right fontSize-[18px] h-[45] w-[270] pr-[20]"
                  />
                  <InputText
                    name="nationalId"
                    placeholder="شماره ملی"
                    rightIconName="id-card"
                    rightIconSize={18}
                    type="number-pad"
                    rightIconStyle={{ marginRight: 20, paddingTop: 12 }}
                    className="bg-white text-right fontSize-[18px] h-[45] w-[270] pr-[20]"
                  />
                </View>
                <View style={{ marginTop: 70 }}>
                  <CustomButton
                    buttonTitle="گام بعدی"
                    onPress={submitForm}
                    className="text-center font-Yekan text-[20px] bg-[#0043F7] color-white rounded-[30px] py-3"
                  />
                </View>
              </>
            ) : (
              <>
                <View>
                  <DateInput
                    inputWidth="w-[240]"
                    name="birthDate"
                    onPress={() => {
                      setModalVisible(true);
                    }}
                  />
                  <InputText
                    name="email"
                    placeholder="ایمیل"
                    type="email-address"
                    rightIconName="envelope-o"
                    rightIconSize={20}
                    rightIconStyle={{ marginRight: 20, paddingTop: 12 }}
                    className="bg-white text-right fontSize-[18px] h-[45] w-[270] pr-[20]"
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
                </View>
                <View className="mt-[70]">
                  <CustomButton
                    buttonTitle="ثبت نام"
                    isLoading={isLoading}
                    loadingClassName="bg-[#0043F7] py-3.5 rounded-[30px]"
                    onPress={submitForm}
                    color="white"
                    className="text-center font-Yekan text-[20px] bg-[#0043F7] color-white rounded-[30px] py-3 "
                  />
                </View>
                <CustomModal
                  animationType="fade"
                  visible={modalVisible}
                  className="pt-5 px-7"
                  className2="p-1 pb-5 rounded-[30px]"
                  onRequestClose={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <DatePicker
                    isGregorian={false}
                    mode="calendar"
                    options={{
                      defaultFont: "Shabnam-Light",
                      headerFont: "Shabnam-Medium",
                    }}
                    selected={getFormatedDate(new Date(), "jYYYY/jMM/jDD")}
                    onDateChange={(date) => {
                      setFieldValue("birthDate", date);
                      setModalVisible((old) => !old);
                    }}
                    style={{ borderRadius: 20, width: 300 }}
                  />
                  <Pressable onPress={() => setModalVisible(!modalVisible)}>
                    <Text className="border-[1.5px] font-Yekan border-[#FF0000] dark:border-white px-10 py-2 color-[#FF0000] dark:color-white text-[16px] text-center rounded-[27px]">
                      انصراف
                    </Text>
                  </Pressable>
                </CustomModal>
              </>
            )}
          </>
        )}
      </Form>
      <View className="flex flex-row justify-center my-12">
        <Link
          to={{ screen: ERouteList.LogIn }}
          style={{
            color: "white",
            fontSize: 18,
            fontFamily: "YekanBakh",
            textDecorationLine: "underline",
          }}
        >
          ورود
        </Link>
        <Text
          style={{
            fontFamily: "YekanBakh",
            fontSize: 15,
            color: "white",
            paddingTop: 2,
          }}
        >
          در حال حاضر اکانت فعالی دارید؟
        </Text>
      </View>
      <CustomModal
        animationType="fade"
        visible={privacyModalVisible}
        statusBarTranslucent
        className="pt-5 px-7 bg-blue-rgba h-full"
        className2="p-5 pb-10 rounded-[30px]"
        onRequestClose={() => {
          setPrivacyModalVisible(!privacyModalVisible);
        }}
      >
        <PrivacyPolicy
          closeOnpress={() => setPrivacyModalVisible(!privacyModalVisible)}
        />
      </CustomModal>
    </>
  );
};

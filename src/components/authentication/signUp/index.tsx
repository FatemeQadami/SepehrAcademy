import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { FC, useState } from "react";
import InputText from "../../common/inputText";
import Form from "../../common/forms";
import { Link, useNavigation } from "@react-navigation/native";
import CustomButton from "../../common/customButton";
import { signUp1Validation, signUp2Validation } from "../../../core/validation";
import StepIndicator from "react-native-step-indicator";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import CustomModal from "../../common/modal";
import DateInput from "../../common/dateInput";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { handelLogin } from "../../../redux/features/user";
import { loginAPI } from "../../../core/services/api/auth/login.api";
import { loginType, signUpType, studentModelType } from "../../../core/models";
import { signUpAPI } from "../../../core/services/api/auth/signUp.api";
import { ERouteList } from "../../../core/enums/route";

const SignUpForm: FC = (): JSX.Element => {
  const [step, setStep] = useState<number>(0);
  const [isPasswordSecure, setIsPasswordSecure] = useState<Boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const navigation = useNavigation<any>();

  const { studentModel } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const onFirstStep = ({ setTouched }: any) => {
    setStep(1);
    setTouched({});
  };

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
      Toast.show({ type: "success", text1: "خوش آمدید :)" });
      navigation.navigate(ERouteList.Courses);
    } else {
      navigation.navigate(ERouteList.LogIn);
    }
    setIsLoading(false);
  };

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
                      console.log("555555555");
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
                    onPress={submitForm}
                    color="white"
                    loadingClassName="bg-[#0043F7]"
                    className="text-center font-Yekan text-[20px] bg-[#0043F7] color-white rounded-[30px] py-3 "
                  />
                </View>
                <CustomModal
                  animationType="fade"
                  visible={modalVisible}
                  className="pt-7 px-7"
                  className2="p-1 rounded-[30px]"
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
                    selected={getFormatedDate(
                      new Date(values["birthDate"]),
                      "jYYYY/jMM/jDD"
                    )}
                    onDateChange={(date) => {
                      setFieldValue("birthDate", date);
                      setModalVisible((old) => !old);
                    }}
                    style={{ borderRadius: 20, width: 300 }}
                  />
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
    </>
  );
};

export default SignUpForm;

import { View, Text, Image, Pressable } from "react-native";
import React, { FC, useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import ImageCropPicker from "react-native-image-crop-picker";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import RNFetchBlob from "rn-fetch-blob";

import user from "../../assets/img/profile/user.png";
import { InputText } from "../common/inputText";
import { Form } from "../common/forms";
import { profileValidation } from "../../core/validation";
import { CustomButton } from "../common/customButton";
import { DateInput } from "../common/dateInput";
import { CustomModal } from "../common/modal";
import { ProfileUpload } from "../profileModal";
import { RootState } from "../../redux/store";
import { handelSelect } from "../../redux/features/selector";
import { editProfileAPI } from "../../core/services/api/editProfile.api";
import { handelLogin } from "../../redux/features/user";
import { editProfileType } from "../../core/models";
import { uploadImageAPI } from "../../core/services/api/uploadImage";

export const EditProfilePage: FC = (): JSX.Element => {
  const [modalVisible, setModalVisible] = useState<Boolean>(false);
  const [modalVisible2, setModalVisible2] = useState<Boolean>(false);
  const [profile, setProfile] = useState<String | null>("");
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [isRemoveImage, setIsRemoveImage] = useState<boolean>(false);

  const dispatch = useDispatch();
  const routeName = useRoute();
  const isFocus = useIsFocused();

  useEffect(() => {
    if (isFocus)
      dispatch(
        handelSelect({
          route: routeName.name,
        })
      );
  }, [isFocus]);

  const { studentModel }: any = useSelector((state: RootState) => state.user);

  const onSubmit = async (values: editProfileType) => {
    if (values.profile && typeof values.profile !== "string") {
      setIsLoading(true);

      const uObj = {
        name: "image",
        filename: values?.profile?.path?.split("/").pop(),
        type: values?.profile?.mime,
        data: RNFetchBlob.wrap(values?.profile?.path),
      };
      const res = uploadImageAPI(uObj)
        .then(async (res) => {
          const result = res.json().result;
          console.log("uploaded", result);
          const userObj: editProfileType = {
            fullName: values?.fullName,
            phoneNumber: values?.phoneNumber,
            birthDate: values?.birthDate,
            nationalId: studentModel?.nationalId,
            email: studentModel?.email,
            profile: result,
          };
          const user = await editProfileAPI(userObj);
          if (user) {
            dispatch(
              handelLogin({
                model: user?.result,
              })
            );
            Toast.show({
              type: "success",
              text1: "  ویرایش اطلاعات با موفقیت انجام شد 🎉",
            });
          }
          setIsLoading(false);
        })
        .catch((er) => {
          console.log(er);
          setIsLoading(false);
        });
    } else {
      const userObj: editProfileType = {
        fullName: values?.fullName,
        phoneNumber: values?.phoneNumber,
        birthDate: values?.birthDate,
        nationalId: studentModel?.nationalId,
        email: studentModel?.email,
        profile: isRemoveImage ? undefined : studentModel?.profile,
      };
      setIsLoading(true);
      const user = await editProfileAPI(userObj);
      dispatch(
        handelLogin({
          model: { ...studentModel, ...userObj },
        })
      );
      if (user) {
        Toast.show({
          type: "success",
          text1: "  ویرایش اطلاعات با موفقیت انجام شد 🎉",
        });
      }
      setIsLoading(false);
    }
  };

  // ------------takingImage------------

  const getImageFromCamera = (setFieldValue: any) => {
    ImageCropPicker.openCamera({
      cropping: true,
      cropperCircleOverlay: true,
    }).then((res) => {
      if (res) {
        setProfile(res.path);
        setFieldValue("profile", res);
      }
    });
  };

  const getImageFromGallery = (setFieldValue: any) => {
    ImageCropPicker.openPicker({
      cropping: true,
      cropperCircleOverlay: true,
    }).then((res) => {
      if (res) {
        setProfile(res.path);
        setFieldValue("profile", res);
      }
    });
  };

  return (
    <>
      <KeyboardAwareScrollView className="dark:bg-[#00216C]">
        <Pressable onPress={() => setModalVisible2(false)}>
          <View
            className="mx-8 my-5 rounded-[30px] bg-white px-9 py-7 dark:bg-[#212477] "
            style={{ elevation: 10 }}
          >
            <>
              <Form
                enableReinitialize
                initialValues={{
                  fullName: studentModel?.fullName,
                  phoneNumber: studentModel?.phoneNumber,
                  nationalId: studentModel?.nationalId || "",
                  birthDate: studentModel?.birthDate,
                  profile: null,
                }}
                validationSchema={profileValidation}
                onSubmit={onSubmit}
              >
                {({ submitForm, resetForm, setFieldValue }) => (
                  <>
                    <View className="items-center my-[20]">
                      <Image
                        source={profile ? { uri: profile } : user}
                        className="w-[125] h-[125] rounded-[80px] relative"
                      />
                      <Pressable
                        className="absolute bottom-[50] right-[70] "
                        onPress={() => {
                          setModalVisible(true);
                        }}
                      >
                        <MaterialIcons
                          name="add-photo-alternate"
                          size={20}
                          color="white"
                          style={{
                            backgroundColor: "#4F91FF",
                            borderRadius: 20,
                            padding: 8,
                          }}
                        />
                      </Pressable>
                      <Text className="font-Gab text-[30px] ">
                        {studentModel?.fullName}
                      </Text>
                    </View>
                    <View className="mt-5">
                      <>
                        <InputText
                          name="fullName"
                          placeholder="نام کاربر"
                          rightIconName="user"
                          rightIconSize={20}
                          rightIconStyle={{ marginTop: 12, marginRight: 20 }}
                          className="text-right fontSize-[18px] h-[45] w-[230] pr-[20]"
                          classView="border-2 border-[#E3E6E8]"
                        />
                        <InputText
                          name="phoneNumber"
                          placeholder="شماره تماس"
                          rightIconName="phone"
                          rightIconSize={20}
                          type="number-pad"
                          rightIconStyle={{ marginTop: 12, marginRight: 20 }}
                          className="text-right fontSize-[18px] h-[45] w-[230] pr-[20]"
                          classView="border-2 border-[#E3E6E8]"
                        />
                        <InputText
                          name="nationalId"
                          placeholder="شماره ملی"
                          rightIconName="id-card"
                          rightIconSize={18}
                          type="number-pad"
                          editable={false}
                          rightIconStyle={{ marginTop: 12, marginRight: 20 }}
                          className="text-right fontSize-[18px] h-[45] w-[230] pr-[20]"
                          classView="border-2 border-[#E3E6E8] bg-[#d4d4d4]"
                        />
                        <DateInput
                          inputWidth="w-[180]"
                          name="birthDate"
                          className="border-2 border-[#E3E6E8]"
                          onPress={() => {
                            setModalVisible2(true);
                          }}
                        />
                        <View className="flex-row items-center justify-center my-4 pt-8">
                          <CustomButton
                            buttonTitle="انصراف"
                            onPress={() => resetForm()}
                            className="border-[1.5px] font-Yekan border-[#FF0000] dark:border-white px-9 py-2 color-[#FF0000] dark:color-white text-[16px] text-center rounded-[27px] mx-5 "
                          />
                          <CustomButton
                            buttonTitle="ثبت تغییرات"
                            onPress={() => submitForm()}
                            isLoading={isLoading}
                            color="white"
                            loadingClassName="bg-[#04A641] px-10 py-2 border-[2px] border-[#04A641] mx-5 rounded-[27px] items-center "
                            className="bg-[#04A641] font-Yekan border-[1.5px] border-[#04A641] px-7 py-2 color-white text-[16px] text-center rounded-[27px] mx-5 "
                          />
                        </View>
                      </>
                    </View>
                    <CustomModal
                      animationType="fade"
                      visible={modalVisible2}
                      className="pt-7 px-7"
                      className2="pt-1 pb-6 px-5 rounded-[30px] mt-[140]"
                      onRequestClose={() => {
                        setModalVisible2(!modalVisible2);
                      }}
                    >
                      <DatePicker
                        isGregorian={false}
                        mode="calendar"
                        options={{
                          defaultFont: "Shabnam-Light",
                          headerFont: "Shabnam-Medium",
                          selectedTextColor: "#fff",
                        }}
                        current={studentModel?.birthDate}
                        selected={getFormatedDate(
                          studentModel?.birthDate.replaceAll("/", "-")
                        )}
                        // selected={studentModel?.birthDate.replaceAll("/", "-")}
                        onDateChange={(date) => {
                          setFieldValue("birthDate", date);
                          setModalVisible2((old) => !old);
                        }}
                        style={{ borderRadius: 20, width: 300 }}
                      />
                      <Pressable
                        onPress={() => setModalVisible2(!modalVisible2)}
                      >
                        <Text className="border-[1.5px] font-Yekan border-[#FF0000] dark:border-white px-10 py-2 color-[#FF0000] dark:color-white text-[16px] text-center rounded-[27px]">
                          انصراف
                        </Text>
                      </Pressable>
                    </CustomModal>

                    <CustomModal
                      animationType="slide"
                      visible={modalVisible}
                      className="mt-[601]"
                      className2="dark:bg-[#212477] px-1"
                      onRequestClose={() => {
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <ProfileUpload
                        onPress={() => setModalVisible(!modalVisible)}
                        getImageFromCamera={() => {
                          getImageFromCamera(setFieldValue);
                          setModalVisible(!modalVisible);
                        }}
                        getImageFromGallery={() => {
                          getImageFromGallery(setFieldValue);
                          setModalVisible(!modalVisible);
                        }}
                        removeProfile={() => {
                          setProfile(null);
                          setFieldValue("profile", null);
                          // dispatch(
                          //   handelLogin({
                          //     model: { ...studentModel, profile: null },
                          //   })
                          // );
                          setIsRemoveImage(true);
                          setModalVisible(!modalVisible);
                        }}
                      />
                    </CustomModal>
                  </>
                )}
              </Form>
            </>
          </View>
        </Pressable>
      </KeyboardAwareScrollView>
    </>
  );
};

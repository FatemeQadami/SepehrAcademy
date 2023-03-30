import { View, Text, Image, Pressable } from "react-native";
import React, { FC, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import user from "../../assets/img/profile/user.png";
import InputText from "../common/inputText";
import Form from "../common/forms";
import { profileValidation } from "../../core/validation";
import CustomButton from "../common/customButton";
import DateInput from "../common/dateInput";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CustomModal from "../common/modal";
import ProfileUpload from "../profileModal";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import ImageCropPicker from "react-native-image-crop-picker";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { handelSelect } from "../../redux/features/selector";
import { editProfileAPI } from "../../core/services/api/editProfile.api";
import { uploadImgAPI } from "../../core/services/api/uploadImg.api";
import { handelLogin } from "../../redux/features/user";
import { editProfileType } from "../../core/models";
import Toast from "react-native-toast-message";

const EditProfilePage: FC = (): JSX.Element => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalVisible2, setModalVisible2] = useState<boolean>(false);
  const [profile, setProfile] = useState("");

  // ------------route---------------

  const { route } = useSelector((state: RootState) => state.selector);

  console.log("reduxState", route);

  const dispatch = useDispatch();

  const routeName = useRoute();

  console.log(routeName.name);

  dispatch(
    handelSelect({
      route: routeName.name,
    })
  );

  // ------------editProfileAPI---------

  const { studentModel }: any = useSelector((state: RootState) => state.user);

  console.log("ff", studentModel);

  const onSubmit = async (values: editProfileType) => {
    // ----------uploadImage----------
    const formData: any = new FormData();
    formData.append("image", profile);

    const uploadResponse = await uploadImgAPI(formData);

    // ---------editAPI----------

    const userObj: editProfileType = {
      fullName: values?.fullName,
      phoneNumber: values?.phoneNumber,
      birthDate: values?.birthDate,
      nationalId: studentModel?.nationalId,
      profile: uploadResponse?.result,
    };

    const user = await editProfileAPI(userObj);

    if (user) {
      dispatch(
        handelLogin({
          token: user.jwtToken,
          model: user.studentModel,
        })
      );
      Toast.show({
        type: "success",
        text1: "  ویرایش اطلاعات با موفقیت انجام شد 🎉",
      });
    }
  };

  // ------------takingImage------------

  const getImageFromCamera = () => {
    ImageCropPicker.openCamera({
      cropping: true,
      cropperCircleOverlay: true,
    }).then((res) => {
      console.log(res);
      if (res) {
        setProfile(res.path);
      }
    });
  };

  const getImageFromGallery = () => {
    ImageCropPicker.openPicker({
      cropping: true,
      cropperCircleOverlay: true,
    }).then((res) => {
      console.log(res);
      if (res) {
        setProfile(res.path);
      }
    });
  };

  return (
    <KeyboardAwareScrollView>
      <View className="bg-white">
        <View
          className="mx-8 my-5 rounded-[30px] bg-white px-9 py-6"
          style={{ elevation: 10 }}
        >
          <>
            <Form
              enableReinitialize
              initialValues={{
                fullName: studentModel?.fullName,
                phoneNumber: studentModel?.phoneNumber,
                nationalId: studentModel?.nationalId,
                birthDate: studentModel?.birthDate,
              }}
              validationSchema={profileValidation}
              onSubmit={onSubmit}
            >
              {({ submitForm, values, resetForm, setFieldValue }) => (
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
                          console.log("555555555");
                        }}
                      />
                      <View className="flex-row items-center justify-center my-4 pt-8">
                        <CustomButton
                          buttonTitle="انصراف"
                          onPress={() => resetForm()}
                          className="border-[1.5px] font-Yekan border-[#FF0000] px-9 py-2 color-[#FF0000] text-[16px] text-center rounded-[27px] mx-5 "
                        />
                        <CustomButton
                          buttonTitle="ثبت تغییرات"
                          onPress={() => submitForm()}
                          className="bg-[#04A641] font-Yekan border-[1.5px] border-[#04A641] px-7 py-2 color-white text-[16px] text-center rounded-[27px] mx-5 "
                        />
                      </View>
                    </>
                  </View>
                  <CustomModal
                    animationType="fade"
                    visible={modalVisible2}
                    className="pt-7 px-7"
                    className2="py-1 px-5 rounded-[30px] mt-[195]"
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
                      }}
                      selected={getFormatedDate(
                        new Date(values["birthDate"]),
                        "jYYYY/jMM/jDD"
                      )}
                      onDateChange={(date) => {
                        setFieldValue("birthDate", date);
                        setModalVisible2((old) => !old);
                      }}
                      style={{ borderRadius: 20, width: 300 }}
                    />
                  </CustomModal>
                </>
              )}
            </Form>
          </>
        </View>
      </View>
      <CustomModal
        animationType="slide"
        visible={modalVisible}
        className="mt-[613] mx-7"
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ProfileUpload
          onPress={() => setModalVisible(!modalVisible)}
          getImageFromCamera={() => {
            getImageFromCamera();
          }}
          getImageFromGallery={() => {
            getImageFromGallery();
          }}
        />
      </CustomModal>
    </KeyboardAwareScrollView>
  );
};

export default EditProfilePage;

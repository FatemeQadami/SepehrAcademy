import { View, Text, Switch, Pressable } from "react-native";

import React, { useState, useEffect } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Octicons from "react-native-vector-icons/Octicons";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomModal from "../common/modal";
import AboutUs from "../aboutUs";
import ClearPassword from "../clearPassword";
import ContactUs from "../contactUs";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ResetPass from "../authentication/resetPass";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { handelSelect } from "../../redux/features/selector";
import { useIsFocused, useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useColorScheme } from "nativewind";

const SettingPage = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalVisible2, setModalVisible2] = useState<boolean>(false);
  const [modalVisible3, setModalVisible3] = useState<boolean>(false);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const { colorScheme, toggleColorScheme } = useColorScheme();

  const { studentModel }: any = useSelector((state: RootState) => state.user);

  // ------------route---------------

  const { route } = useSelector((state: RootState) => state.selector);

  console.log("reduxState", route);

  const dispatch = useDispatch();

  const routeName = useRoute();

  console.log(routeName.name);
  const isFocus = useIsFocused();

  useEffect(() => {
    console.log("routeName.name", routeName.name);
    if (isFocus)
      dispatch(
        handelSelect({
          route: routeName.name,
        })
      );
  }, [isFocus]);

  return (
    <>
      <KeyboardAwareScrollView>
        <View
          className="mx-8 my-6 rounded-[30px] bg-white px-9 py-7"
          style={{ elevation: 10 }}
        >
          <>
            <View>
              <View className="flex-row-reverse justify-between my-3">
                <View className="flex-row-reverse">
                  <Octicons
                    name="moon"
                    color="white"
                    size={15}
                    style={{
                      backgroundColor: "#474747",
                      paddingHorizontal: 11,
                      paddingVertical: 10,
                      borderRadius: 10,
                      alignItems: "center",
                    }}
                  />
                  <Text className="font-Yekan text-[17px] text-[#474747] pt-2 pr-3 ">
                    حالت شب
                  </Text>
                </View>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
              <View className="flex-row-reverse justify-between my-3">
                <View className="flex-row-reverse">
                  <MaterialIcons
                    name="center-focus-weak"
                    color="white"
                    size={15}
                    style={{
                      backgroundColor: "#F0A330",
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      borderRadius: 10,
                      alignItems: "center",
                    }}
                  />
                  <Text className="font-Yekan text-[17px] text-[#474747] pt-2 pr-3 ">
                    پالت رنگی
                  </Text>
                </View>
                <View className="flex-row pt-2">
                  <View className=" mx-1 w-[17] h-[17] rounded-[9px] bg-[#3A84FF] border-2 border-[#2E5D9B] "></View>
                  <View className="mx-1 w-[17] h-[17] rounded-[9px] bg-[#00C06D] "></View>
                  <View className="mx-1 w-[17] h-[17] rounded-[9px] bg-[#FF0000] "></View>
                </View>
              </View>
              <Pressable
                className="flex-row-reverse justify-between my-3"
                onPress={() => {
                  studentModel
                    ? setModalVisible(true)
                    : Toast.show({
                        type: "error",
                        text1: " شما حسابی ندارید!!!",
                      });
                }}
              >
                <View className="flex-row-reverse">
                  <MaterialIcons
                    name="lock-outline"
                    color="white"
                    size={15}
                    style={{
                      backgroundColor: "#2A8CFE",
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      borderRadius: 10,
                      alignItems: "center",
                    }}
                  />
                  <Text className="font-Yekan text-[17px] text-[#474747] pt-2 pr-3 ">
                    پاک کردن رمز ذخیره شده
                  </Text>
                </View>
                <Octicons
                  name="chevron-left"
                  color="#DDDDDD"
                  size={15}
                  style={{
                    paddingHorizontal: 11,
                    paddingVertical: 10,
                    borderRadius: 10,
                    alignItems: "center",
                  }}
                />
              </Pressable>
              <Pressable
                className="flex-row-reverse justify-between my-3"
                onPress={() => setModalVisible2(true)}
              >
                <View className="flex-row-reverse">
                  <Feather
                    name="users"
                    color="white"
                    size={15}
                    style={{
                      backgroundColor: "#2FCBA5",
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      borderRadius: 10,
                      alignItems: "center",
                    }}
                  />
                  <Text className="font-Yekan text-[17px] text-[#474747] pt-2 pr-3 ">
                    درباره ما
                  </Text>
                </View>
                <Octicons
                  name="chevron-left"
                  color="#DDDDDD"
                  size={15}
                  style={{
                    paddingHorizontal: 11,
                    paddingVertical: 10,
                    borderRadius: 10,
                    alignItems: "center",
                  }}
                />
              </Pressable>
              <Pressable
                className="flex-row-reverse justify-between my-3"
                onPress={() => setModalVisible3(true)}
              >
                <View className="flex-row-reverse">
                  <Ionicons
                    name="chatbubble-ellipses-outline"
                    color="white"
                    size={15}
                    style={{
                      backgroundColor: "#F6606C",
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      borderRadius: 10,
                      alignItems: "center",
                    }}
                  />

                  <Text className="font-Yekan text-[17px] text-[#474747] pt-2 pr-3 ">
                    ارتباط با ما
                  </Text>
                </View>
                <Octicons
                  name="chevron-left"
                  color="#DDDDDD"
                  size={15}
                  style={{
                    paddingHorizontal: 11,
                    paddingVertical: 10,
                    borderRadius: 10,
                    alignItems: "center",
                  }}
                />
              </Pressable>
            </View>
            {studentModel ? (
              <View className="mt-10">
                <Text className="font-Yekan text-[18px] color-[#1048B7] my-6 pt-3">
                  تغییر رمز عبور:
                </Text>
                <ResetPass />
              </View>
            ) : (
              <View className="h-[368]"></View>
            )}
          </>
        </View>
      </KeyboardAwareScrollView>
      <CustomModal
        visible={modalVisible}
        animationType="slide"
        className2="p-[30] rounded-[30px]"
        className="my-10 mx-7"
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ClearPassword onPress={() => setModalVisible(!modalVisible)} />
      </CustomModal>

      <CustomModal
        animationType="fade"
        visible={modalVisible2}
        className="my-10 mx-7"
        className2="p-[30] rounded-[30px]"
        onRequestClose={() => {
          setModalVisible2(!modalVisible2);
        }}
      >
        <AboutUs onPress={() => setModalVisible2(!modalVisible2)} />
      </CustomModal>
      <CustomModal
        animationType="fade"
        className="my-10 mx-7"
        className2="p-[30] rounded-[30px]"
        visible={modalVisible3}
        onRequestClose={() => {
          setModalVisible3(!modalVisible3);
        }}
      >
        <ContactUs onPress={() => setModalVisible3(!modalVisible3)} />
      </CustomModal>
    </>
  );
};

export default SettingPage;

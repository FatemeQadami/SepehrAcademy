import { View, Text, Switch, Pressable } from "react-native";
import React, { useState, useEffect, FC } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Octicons from "react-native-vector-icons/Octicons";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused, useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useColorScheme } from "nativewind";

import { CustomModal } from "../common/modal";
import { AboutUs } from "../aboutUs";
import { ClearPassword } from "../clearPassword";
import { ContactUs } from "../contactUs";
import { ResetPass } from "../authentication/resetPass";
import { RootState } from "../../redux/store";
import { handelSelect } from "../../redux/features/selector";
import { handelTheme } from "../../redux/features/theme";
import { setItem } from "../../core/services/storage/storage";
import { EStorageKeys } from "../../core/enums/storage";

export const SettingPage: FC = (): JSX.Element => {
  const [clearModalVisible, setClearModalVisible] = useState<boolean>(false);
  const [aboutModalVisible, setAboutModalVisible] = useState<boolean>(false);
  const [contactModalVisible, setContactModalVisible] =
    useState<boolean>(false);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  const { colorScheme, toggleColorScheme } = useColorScheme();

  const toggleSwitch = () => {
    toggleColorScheme();
    setIsEnabled((old) => !old);
    setItem(EStorageKeys.Mode, colorScheme === "light" ? "dark" : "light");
  };

  const { studentModel }: any = useSelector((state: RootState) => state.user);

  const { theme }: any = useSelector((state: RootState) => state.theme);

  // ------------route---------------

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
    if (colorScheme === "dark") {
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    }
  }, [isFocus, colorScheme]);

  return (
    <>
      <KeyboardAwareScrollView>
        <View className="dark:bg-[#00216C] ">
          <View
            className="mx-8 my-6 rounded-[30px] bg-white px-9 py-7 dark:bg-[#212477] "
            style={{ elevation: 10 }}
          >
            <>
              <View>
                <View className="flex-row-reverse justify-between my-3">
                  <View className="flex-row-reverse">
                    <Octicons
                      name="moon"
                      color="white"
                      size={20}
                      style={{
                        backgroundColor: "#474747",
                        paddingHorizontal: 9,
                        paddingVertical: 8,
                        borderRadius: 10,
                        alignItems: "center",
                      }}
                    />
                    <Text className="font-Yekan text-[17px] text-[#474747] pt-2 pr-3 color-[#474747] dark:color-white ">
                      حالت شب
                    </Text>
                  </View>
                  <Switch
                    trackColor={{ false: "#DDDDDD", true: "#474747" }}
                    thumbColor={isEnabled ? "#fff" : "#fff"}
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
                      size={20}
                      style={{
                        backgroundColor: "#F0A330",
                        paddingHorizontal: 8,
                        paddingVertical: 8,
                        borderRadius: 10,
                        alignItems: "center",
                      }}
                    />
                    <Text className="font-Yekan text-[17px] text-[#474747] pt-2 pr-3 color-[#474747] dark:color-white ">
                      پالت رنگی
                    </Text>
                  </View>
                  <View className="flex-row justify-around">
                    <Pressable
                      onPress={() =>
                        dispatch(
                          handelTheme({
                            theme: "blue",
                          })
                        )
                      }
                      className="py-2 px-1.5"
                    >
                      <View
                        style={{
                          borderWidth: 2,
                          borderColor:
                            theme === "blue" ? "#2E5D9B" : "transparent",
                        }}
                        className="rounded-full w-5 h-5 bg-[#3A84FF]"
                      />
                    </Pressable>
                    <Pressable
                      onPress={() =>
                        dispatch(
                          handelTheme({
                            theme: "green",
                          })
                        )
                      }
                      className="py-2 px-1.5"
                    >
                      <View
                        style={{
                          borderWidth: 2,
                          borderColor:
                            theme === "green" ? "#2E5D9B" : "transparent",
                        }}
                        className="rounded-full w-5 h-5 bg-[#00C06D] "
                      />
                    </Pressable>
                    <Pressable
                      onPress={() =>
                        dispatch(
                          handelTheme({
                            theme: "red",
                          })
                        )
                      }
                      className="py-2 px-1.5"
                    >
                      <View
                        style={{
                          borderWidth: 2,
                          borderColor:
                            theme === "red" ? "#2E5D9B" : "transparent",
                        }}
                        className="w-5 h-5 rounded-full bg-[#FF0000] "
                      />
                    </Pressable>
                  </View>
                </View>
                <Pressable
                  className="flex-row-reverse justify-between my-3"
                  onPress={() => {
                    studentModel
                      ? setClearModalVisible(true)
                      : Toast.show({
                          type: "error",
                          text2: " شما حسابی ندارید!!!",
                        });
                  }}
                >
                  <View className="flex-row-reverse">
                    <MaterialIcons
                      name="lock-outline"
                      color="white"
                      size={20}
                      style={{
                        backgroundColor: "#2A8CFE",
                        paddingHorizontal: 8,
                        paddingVertical: 8,
                        borderRadius: 10,
                        alignItems: "center",
                      }}
                    />
                    <Text className="font-Yekan text-[17px] text-[#474747] pt-2 pr-3 color-[#474747] dark:color-white ">
                      امتیاز به آکادمی سپهر
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
                  onPress={() => setAboutModalVisible(true)}
                >
                  <View className="flex-row-reverse">
                    <Feather
                      name="users"
                      color="white"
                      size={20}
                      style={{
                        backgroundColor: "#2FCBA5",
                        paddingHorizontal: 8,
                        paddingVertical:8,
                        borderRadius: 10,
                        alignItems: "center",
                      }}
                    />
                    <Text className="font-Yekan text-[17px] text-[#474747] pt-2 pr-3 color-[#474747] dark:color-white ">
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
                  onPress={() => setContactModalVisible(true)}
                >
                  <View className="flex-row-reverse">
                    <Ionicons
                      name="chatbubble-ellipses-outline"
                      color="white"
                      size={20}
                      style={{
                        backgroundColor: "#F6606C",
                        paddingHorizontal: 8,
                        paddingVertical: 8,
                        borderRadius: 10,
                        alignItems: "center",
                      }}
                    />

                    <Text className="font-Yekan text-[17px] text-[#474747] pt-2 pr-3 color-[#474747] dark:color-white ">
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
              <>
                {studentModel !== null ? (
                  <View className="mt-10">
                    <Text className="font-Yekan text-[18px] color-[#1048B7] my-6 pt-3 dark:color-white ">
                      تغییر رمز عبور:
                    </Text>
                    <ResetPass />
                  </View>
                ) : (
                  <View className="py-[185]"></View>
                )}
              </>
            </>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <CustomModal
        visible={clearModalVisible}
        animationType="slide"
        statusBarTranslucent
        className2="p-[30] rounded-[30px]"
        className="py-10 px-7 bg-blue-rgba h-full"
        onRequestClose={() => {
          setClearModalVisible(!clearModalVisible);
        }}
      >
        <ClearPassword
          onPress={() => setClearModalVisible(!clearModalVisible)}
        />
      </CustomModal>

      <CustomModal
        animationType="fade"
        visible={aboutModalVisible}
        className="my-8 mx-7"
        className2="p-[30] rounded-[30px]"
        onRequestClose={() => {
          setAboutModalVisible(!aboutModalVisible);
        }}
      >
        <AboutUs onPress={() => setAboutModalVisible(!aboutModalVisible)} />
      </CustomModal>

      <CustomModal
        animationType="fade"
        className="my-10 mx-7"
        className2="p-[30] rounded-[30px]"
        visible={contactModalVisible}
        onRequestClose={() => {
          setContactModalVisible(!contactModalVisible);
        }}
      >
        <ContactUs
          onPress={() => setContactModalVisible(!contactModalVisible)}
        />
      </CustomModal>
    </>
  );
};

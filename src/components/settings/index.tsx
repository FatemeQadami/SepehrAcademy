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
import { handelTheme } from "../../redux/features/theme";
import { setItem } from "../../core/services/storage/storage";
import { EStorageKeys } from "../../core/enums/storage";

const SettingPage = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalVisible2, setModalVisible2] = useState<boolean>(false);
  const [modalVisible3, setModalVisible3] = useState<boolean>(false);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  const { colorScheme, toggleColorScheme } = useColorScheme();

  const toggleSwitch = () => {
    toggleColorScheme();
    setIsEnabled((previousState) => !previousState);
    setItem(EStorageKeys.mode, colorScheme === "light" ? "dark" : "light");
  };

  const { studentModel }: any = useSelector((state: RootState) => state.user);

  const { theme }: any = useSelector((state: RootState) => state.theme);

  // ------------route---------------

  const {} = useSelector((state: RootState) => state.selector);

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
                      size={15}
                      style={{
                        backgroundColor: "#474747",
                        paddingHorizontal: 11,
                        paddingVertical: 10,
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
                      size={15}
                      style={{
                        backgroundColor: "#F0A330",
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        borderRadius: 10,
                        alignItems: "center",
                      }}
                    />
                    <Text className="font-Yekan text-[17px] text-[#474747] pt-2 pr-3 color-[#474747] dark:color-white ">
                      پالت رنگی
                    </Text>
                  </View>
                  <View className="flex-row pt-2 justify-around">
                    <Pressable
                      onPress={() =>
                        dispatch(
                          handelTheme({
                            theme: "blue",
                          })
                        )
                      }
                      style={{
                        borderWidth: 2,
                        borderColor: theme === "blue" ? "#2E5D9B" : "#3A84FF",
                        width: theme === "blue" ? 20 : 17,
                        height: theme === "blue" ? 20 : 17,
                      }}
                      className=" mx-1 rounded-[10px] bg-[#3A84FF]"
                    ></Pressable>
                    <Pressable
                      onPress={() =>
                        dispatch(
                          handelTheme({
                            theme: "green",
                          })
                        )
                      }
                      style={{
                        borderWidth: 2,
                        borderColor: theme === "green" ? "#2E5D9B" : "#00C06D",
                        width: theme === "green" ? 20 : 17,
                        height: theme === "green" ? 20 : 17,
                      }}
                      className="mx-1 rounded-[10px] bg-[#00C06D] "
                    ></Pressable>
                    <Pressable
                      onPress={() =>
                        dispatch(
                          handelTheme({
                            theme: "red",
                          })
                        )
                      }
                      style={{
                        borderWidth: 2,
                        borderColor: theme === "red" ? "#2E5D9B" : "#FF0000",
                        width: theme === "red" ? 20 : 17,
                        height: theme === "red" ? 20 : 17,
                      }}
                      className="mx-1 rounded-[10px] bg-[#FF0000] "
                    ></Pressable>
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
                    <Text className="font-Yekan text-[17px] text-[#474747] pt-2 pr-3 color-[#474747] dark:color-white ">
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

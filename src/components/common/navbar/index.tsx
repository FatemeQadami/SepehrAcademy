import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Pressable,
  Alert,
  Modal,
  StyleSheet,
} from "react-native";
import React, { FC, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Link, useNavigation } from "@react-navigation/native";
import CustomModal from "../modal";
import CustomButton from "../customButton";

interface INavbarProp {
  pageName?: string;
}

const Navbar: FC<INavbarProp> = ({ pageName }): JSX.Element => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const navigation = useNavigation<any>();

  return (
    <View className="bg-white">
      <View className="flex flex-row justify-center rounded-b-[35] px-7 pt-[45] bg-[#4F91FF] ">
        {pageName ? (
          <View className="flex flex-row-reverse mb-6">
            <Pressable
              onPress={() => {
                navigation.navigate("Cart");
              }}
            >
              <View
                className="bg-white pt-2 rounded-3xl items-center mt-2 w-[37] h-[37]"
                style={{ elevation: 10 }}
              >
                <Icon name="shopping-cart" size={24} color="#3A84FF" />
              </View>
            </Pressable>
            <View
              className="flex flex-row-reverse mt-2 mx-5"
              style={{ elevation: 8, height: 38 }}
            >
              <TextInput
                placeholder="جستجو ..."
                className="bg-white w-[170] h-[38] text-right pr-[10] rounded-r-[20] "
              />
              <Icon
                name="search"
                color="#3A84FF"
                size={20}
                style={{
                  backgroundColor: "#D5E4FF",
                  paddingHorizontal: 12,
                  paddingVertical: 7,
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 20,
                }}
              />
            </View>
            <Pressable onPress={() => setModalVisible(true)}>
              <View
                className="bg-white pt-2 rounded-3xl items-center mt-2 w-[37] h-[37]"
                style={{ elevation: 10 }}
              >
                <Icon name="filter" size={24} color="#3A84FF" />
              </View>
            </Pressable>
          </View>
        ) : (
          <></>
        )}
        <CustomModal
          animationType="slide"
          visible={modalVisible}
          className2="p-[30] rounded-[30px]"
          className="my-10 mx-7"
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Text>ماسماسکای فیلتر</Text>
          <View className="flex-row items-center justify-center">
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Text className="border font-Yekan border-[#FF0000] px-8 py-2 color-[#FF0000] text-[16px] text-center rounded-[27px] mx-3 ">
                بازگشت
              </Text>
            </Pressable>
            <CustomButton
              buttonTitle="فیلتر"
              onPress=""
              className="bg-[#04A641] font-Yekan border border-[#04A641] px-10 py-2 color-white text-[16px] text-center rounded-[27px] mx-3"
            />
          </View>
        </CustomModal>
      </View>
    </View>
  );
};

export default Navbar;

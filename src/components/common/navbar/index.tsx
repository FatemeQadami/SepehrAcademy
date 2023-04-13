import { View, TextInput, Pressable } from "react-native";
import React, { FC, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

import { CustomModal } from "../modal";
import { useColorTheme } from "../../../core/config/color";
import { ERouteList } from "../../../core/enums/route";
import { Filters } from "../../filter";

interface NavbarProp {
  pageName?: string;
}

export const Navbar: FC<NavbarProp> = ({ pageName }): JSX.Element => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const navigation = useNavigation<any>();

  const color = useColorTheme();

  return (
    <View className="dark:bg-[#00216C]">
      <View
        className="flex flex-row justify-center rounded-b-[35] px-7 pt-[45] bg-[#4F91FF] "
        style={{ backgroundColor: color?.navbarColor }}
      >
        {pageName && (
          <View className="flex flex-row-reverse mb-6">
            <Pressable
              onPress={() => {
                navigation.navigate(ERouteList.Cart);
              }}
            >
              <View
                className="bg-white pt-2 rounded-3xl items-center mt-2 w-[37] h-[37]"
                style={{ elevation: 10 }}
              >
                <Icon name="shopping-cart" size={24} color={color?.iconColor} />
              </View>
            </Pressable>
            <View
              className="flex flex-row-reverse mt-2 mx-5"
              style={{ elevation: 8, height: 38 }}
            >
              <TextInput
                placeholder="جستجو ..."
                // value={}
                // onChangeText={handelSearch}
                className="bg-white w-[170] h-[38] text-right pr-[10] rounded-r-[20] "
              />
              <Icon
                name="search"
                color={color?.iconColor}
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
                <Icon name="filter" size={24} color={color?.iconColor} />
              </View>
            </Pressable>
          </View>
        )}
        <CustomModal
          animationType="slide"
          visible={modalVisible}
          className2="px-8 py-9 mt-10 mb-16 rounded-[30px]"
          className="px-7 py-2 bg-blue-rgba "
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Filters
            comebackOnpress={() => {
              setModalVisible(!modalVisible);
            }}
            onPressFilter={() => {
              setModalVisible(!modalVisible);
            }}
          />
        </CustomModal>
      </View>
    </View>
  );
};

import { View, TextInput, Pressable } from "react-native";
import React, { FC, useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { CustomModal } from "../modal";
import { useColorTheme } from "../../../core/config/color";
import { ERouteList } from "../../../core/enums/route";
import { Filters } from "../../filter";
import {
  handeSearchWord,
  handleClearFilter,
} from "../../../redux/features/search_filter";

interface HeaderProp {
  pageName?: string;
}

export const Header: FC<HeaderProp> = ({ pageName }): JSX.Element => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const color = useColorTheme();

  const handelOnChange = (query: string) => {
    let val = query;
    setSearchQuery(val);
  };

  return (
    <View className="dark:bg-[#00216C]">
      <View
        className="flex flex-row justify-center rounded-b-[35] px-7 pt-[45] bg-[#4F91FF] "
        style={{ backgroundColor: color?.HeaderColor }}
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
                <FontAwesome
                  name="bookmark"
                  size={21}
                  color={color?.IconColor}
                />
              </View>
            </Pressable>
            <View
              className="flex flex-row mt-2 mx-5"
              style={{ elevation: 8, height: 38 }}
            >
              <Pressable
                onPress={() =>
                  dispatch(
                    handeSearchWord({
                      searchWord: searchQuery,
                    })
                  )
                }
              >
                <FontAwesome
                  name="search"
                  color={color?.IconColor}
                  size={20}
                  style={{
                    backgroundColor: "#D5E4FF",
                    paddingHorizontal: 12,
                    paddingVertical: 9,
                    borderTopLeftRadius: 20,
                    borderBottomLeftRadius: 20,
                  }}
                />
              </Pressable>
              <TextInput
                placeholder="جستجو ..."
                value={searchQuery}
                returnKeyType="search"
                onBlur={() =>
                  dispatch(
                    handeSearchWord({
                      searchWord: searchQuery,
                    })
                  )
                }
                onChangeText={(query) => handelOnChange(query)}
                className="bg-white font-Yekan w-[170] h-[38] text-right pr-[10] rounded-r-[20] "
              />
            </View>
            <Pressable onPress={() => setModalVisible(true)}>
              <View
                className="bg-white pt-2 rounded-3xl items-center mt-2 w-[37] h-[37]"
                style={{ elevation: 10 }}
              >
                <FontAwesome name="filter" size={24} color={color?.IconColor} />
              </View>
            </Pressable>
          </View>
        )}
        <CustomModal
          animationType="slide"
          visible={modalVisible}
          statusBarTranslucent
          className2="px-8 py-9 mt-12 mb-16 rounded-[30px]"
          className="px-7 py-2 bg-blue-rgba h-full "
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
            resetOnPress={() => {
              dispatch(handleClearFilter());
              setModalVisible(!modalVisible);
            }}
          />
        </CustomModal>
      </View>
    </View>
  );
};

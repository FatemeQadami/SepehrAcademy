import { View, Text, Platform, Pressable } from "react-native";
import React, { FC, useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

import { useColorTheme } from "../../core/config/color";
import { CustomButton } from "../common/customButton";

interface filterPropsTypes {
  comebackOnpress: Function;
  onPressFilter: Function;
}

export const Filters: FC<filterPropsTypes> = ({
  comebackOnpress,
  onPressFilter,
}): JSX.Element => {
  const data = ["مهدی اصغری", "بحر"];

  const [multiSliderValue, setMultiSliderValue] = useState([0, 100]);

  const color = useColorTheme();

  const multiSliderValuesChange = (values: React.SetStateAction<number[]>) =>
    setMultiSliderValue(values);

  return (
    <View>
      <View className="">
        <SelectDropdown
          data={data}
          defaultButtonText="مرتب سازی"
          buttonTextStyle={{
            fontFamily: "YekanBakh",
            fontSize: 15,
            textAlign: "right",
            color: "#707070",
          }}
          buttonStyle={{
            backgroundColor: "white",
            width: 280,
            borderColor: "#E3E6E8",
            borderWidth: 1,
            borderRadius: 30,
            marginVertical: 10,
          }}
          renderDropdownIcon={(isOpened) => {
            return (
              <FontAwesome
                name={isOpened ? "chevron-up" : "chevron-down"}
                color="#C6C6C6"
                size={15}
              />
            );
          }}
          dropdownIconPosition="left"
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />
        <SelectDropdown
          data={data}
          defaultButtonText="روند نمایش"
          buttonTextStyle={{
            fontFamily: "YekanBakh",
            fontSize: 15,
            color: "#707070",
            textAlign: "right",
          }}
          buttonStyle={{
            backgroundColor: "white",
            width: 280,
            borderColor: "#E3E6E8",
            borderWidth: 1,
            borderRadius: 30,
            marginVertical: 20,
          }}
          renderDropdownIcon={(isOpened) => {
            return (
              <FontAwesome
                name={isOpened ? "chevron-up" : "chevron-down"}
                color="#C6C6C6"
                size={15}
              />
            );
          }}
          dropdownIconPosition="left"
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />
        <View className="my-5 bg-[#D3D6D8] px-32 h-[1]" />
        <Text className="color-[#707070] dark:color-white font-Yekan ">
          محدوده قیمت
        </Text>
        <MultiSlider
          markerStyle={{
            ...Platform.select({
              ios: {
                height: 20,
                width: 20,
                shadowColor: "#000000",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowRadius: 1,
                shadowOpacity: 0.1,
              },
              android: {
                height: 20,
                width: 20,
                borderRadius: 30,
                backgroundColor: color?.filterColor,
              },
            }),
          }}
          pressedMarkerStyle={{
            ...Platform.select({
              android: {
                height: 22,
                width: 22,
                borderRadius: 20,
                backgroundColor: color?.filterColor,
              },
            }),
          }}
          selectedStyle={{
            backgroundColor: color?.filterColor,
          }}
          trackStyle={{
            backgroundColor: "#CECECE",
          }}
          touchDimensions={{
            height: 40,
            width: 40,
            borderRadius: 20,
            slipDisplacement: 40,
          }}
          values={[multiSliderValue[0], multiSliderValue[1]]}
          onValuesChange={multiSliderValuesChange}
          min={0}
          max={100}
          allowOverlap={false}
          minMarkerOverlapDistance={10}
        />
        <Text className="color-[#707070] dark:color-white text-right font-Yekan ">
          محدوده ظرفیت
        </Text>
        <MultiSlider
          markerStyle={{
            ...Platform.select({
              ios: {
                height: 20,
                width: 20,
                shadowColor: "#000000",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowRadius: 1,
                shadowOpacity: 0.1,
              },
              android: {
                height: 20,
                width: 20,
                borderRadius: 30,
                backgroundColor: color?.filterColor,
              },
            }),
          }}
          pressedMarkerStyle={{
            ...Platform.select({
              android: {
                height: 22,
                width: 22,
                borderRadius: 20,
                backgroundColor: color?.filterColor,
              },
            }),
          }}
          selectedStyle={{
            backgroundColor: color?.filterColor,
          }}
          trackStyle={{
            backgroundColor: "#CECECE",
          }}
          touchDimensions={{
            height: 40,
            width: 40,
            borderRadius: 20,
            slipDisplacement: 40,
          }}
          values={[multiSliderValue[0], multiSliderValue[1]]}
          onValuesChange={multiSliderValuesChange}
          min={0}
          max={100}
          allowOverlap={false}
          minMarkerOverlapDistance={10}
        />
        <View className="my-5 bg-[#D3D6D8] px-32 h-[1]" />
        <SelectDropdown
          data={data}
          defaultButtonText="مدرس دوره"
          buttonTextStyle={{
            fontFamily: "YekanBakh",
            fontSize: 15,
            textAlign: "right",
            color: "#707070",
          }}
          buttonStyle={{
            backgroundColor: "white",
            width: 280,
            borderColor: "#E3E6E8",
            borderWidth: 1,
            borderRadius: 30,
            marginVertical: 10,
          }}
          renderDropdownIcon={(isOpened) => {
            return (
              <FontAwesome
                name={isOpened ? "chevron-up" : "chevron-down"}
                color="#C6C6C6"
                size={15}
              />
            );
          }}
          dropdownIconPosition="left"
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />
        <SelectDropdown
          data={data}
          defaultButtonText="دسته بندی"
          buttonTextStyle={{
            fontFamily: "YekanBakh",
            fontSize: 15,
            textAlign: "right",
            color: "#707070",
          }}
          buttonStyle={{
            backgroundColor: "white",
            width: 280,
            borderColor: "#E3E6E8",
            borderWidth: 1,
            borderRadius: 30,
            marginVertical: 20,
          }}
          renderDropdownIcon={(isOpened) => {
            return (
              <FontAwesome
                name={isOpened ? "chevron-up" : "chevron-down"}
                color="#C6C6C6"
                size={15}
              />
            );
          }}
          dropdownIconPosition="left"
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />
      </View>
      <View className="flex-row items-center justify-center mt-16 mb-5">
        <Pressable onPress={() => comebackOnpress()}>
          <Text className="border font-Yekan border-[#FF0000] dark:border-white px-8 py-2 color-[#FF0000] dark:color-white text-[16px] text-center rounded-[27px] mx-3 ">
            بازگشت
          </Text>
        </Pressable>
        <CustomButton
          buttonTitle="فیلتر"
          onPress={() => onPressFilter()}
          className="bg-[#04A641] font-Yekan border border-[#04A641] px-10 py-2 color-white text-[16px] text-center rounded-[27px] mx-3"
        />
      </View>
    </View>
  );
};

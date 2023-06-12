import { View, Text, Platform, Pressable } from "react-native";
import React, { FC, useState, useEffect } from "react";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { useDispatch, useSelector } from "react-redux";

import { useColorTheme } from "../../core/config/color";
import { CustomButton } from "../common/customButton";
import { teachersAPI } from "../../core/services/api/teachers.api";
import { categoryAPI } from "../../core/services/api/category.api";
import {
  handelCapacityRange,
  handelCostRange,
  handelSort,
  handleTeacherFilter,
} from "../../redux/features/search_filter";
import { RootState } from "../../redux/store";
import { Styles } from "./index.css";

interface filterPropsTypes {
  comebackOnpress: Function;
  onPressFilter: Function;
  resetOnPress: Function;
}

export const Filters: FC<filterPropsTypes> = ({
  comebackOnpress,
  onPressFilter,
  resetOnPress,
}): JSX.Element => {
  const [teachers, setTeachers] = useState([]);
  const [category, setCategory] = useState([]);
  const [sort, setSort] = useState<string>("");
  const [selectedTeacher, setSelectedTeacher] = useState();
  const [selectedSorting, setSelectedSorting] = useState<number>(0);

  const data1 = [
    "بر اساس گران‌ترین",
    "بر اساس ارزان‌ترین",
    "بر اساس بیشترین لایک",
  ];
  const data2 = ["", ""];

  const dispatch = useDispatch();

  const color = useColorTheme();

  // ------------API---------

  const allTeachers = async () => {
    const result = await teachersAPI();
    setTeachers(result?.data?.result);
  };

  const allCategory = async () => {
    const result = await categoryAPI();
    setCategory(result?.data?.result);
  };

  //----------Range by multiSlider----------

  const [multiSliderPrice, setMultiSliderPrice] = useState([0, 2500000]);
  const [multiSliderCapacity, setMultiSliderCapacity] = useState([1, 100]);

  const { costRange, capacityRange, teacher, sortId }: any = useSelector(
    (state: RootState) => state.search_filter
  );

  const multiSliderPriceChange = (values: React.SetStateAction<number[]>) => {
    setMultiSliderPrice(values);
  };

  const multiSliderCapacityChange = (
    values: React.SetStateAction<number[]>
  ) => {
    setMultiSliderCapacity(values);
  };
  const handelFilter = () => {
    dispatch(
      handelCapacityRange({
        capacityRange: multiSliderCapacity,
      })
    );
    dispatch(handleTeacherFilter(selectedTeacher));
    dispatch(handelSort(selectedSorting));
    dispatch(
      handelCostRange({
        costRange: multiSliderPrice,
      })
    );
  };

  useEffect(() => {
    allTeachers();
    allCategory();
    if (costRange) {
      setMultiSliderPrice(costRange);
    }
    if (capacityRange) {
      setMultiSliderCapacity(capacityRange);
    }
  }, []);

  return (
    <View>
      <View className="">
        <SelectDropdown
          data={data1}
          defaultButtonText="مرتب سازی"
          buttonTextStyle={Styles.buttonTextStyle}
          buttonStyle={Styles.buttonStyle}
          dropdownStyle={Styles.dropdownStyle}
          rowTextStyle={Styles.rowTextStyle}
          selectedRowTextStyle={Styles.selectedRowTextStyle}
          defaultValueByIndex={sortId - 1}
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
            setSort(selectedItem);
            setSelectedSorting(index + 1);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />
        <SelectDropdown
          data={data2}
          defaultButtonText="روند نمایش"
          buttonTextStyle={Styles.buttonTextStyle}
          buttonStyle={Styles.buttonStyle}
          dropdownStyle={Styles.dropdownStyle}
          rowTextStyle={Styles.rowTextStyle}
          selectedRowTextStyle={Styles.selectedRowTextStyle}
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
        <Text className="color-[#707070] dark:color-white font-Yekan mb-2 ">
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
                backgroundColor: color?.FilterColor,
              },
            }),
          }}
          pressedMarkerStyle={{
            ...Platform.select({
              android: {
                height: 22,
                width: 22,
                borderRadius: 20,
                backgroundColor: color?.FilterColor,
              },
            }),
          }}
          selectedStyle={{
            backgroundColor: color?.FilterColor,
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
          values={[multiSliderPrice[0], multiSliderPrice[1]]}
          onValuesChange={multiSliderPriceChange}
          min={0}
          max={2500000}
          allowOverlap={false}
          minMarkerOverlapDistance={10}
          enableLabel
          customLabel={(props) => {
            return (
              <View className="flex-row ">
                <Text style={{ left: props.oneMarkerLeftPosition }}>
                  {multiSliderPrice[0]}
                </Text>
                <Text style={{ left: props.twoMarkerLeftPosition - 40 }}>
                  {multiSliderPrice[1]}
                </Text>
              </View>
            );
          }}
        />
        <Text className="color-[#707070] dark:color-white text-right font-Yekan mb-2 ">
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
                backgroundColor: color?.FilterColor,
              },
            }),
          }}
          pressedMarkerStyle={{
            ...Platform.select({
              android: {
                height: 22,
                width: 22,
                borderRadius: 20,
                backgroundColor: color?.FilterColor,
              },
            }),
          }}
          selectedStyle={{
            backgroundColor: color?.FilterColor,
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
          values={[multiSliderCapacity[0], multiSliderCapacity[1]]}
          onValuesChange={multiSliderCapacityChange}
          min={1}
          max={100}
          allowOverlap={false}
          minMarkerOverlapDistance={10}
          enableLabel
          customLabel={(props) => {
            return (
              <View className="flex-row ">
                <Text style={{ left: props.oneMarkerLeftPosition }}>
                  {multiSliderCapacity[0]}
                </Text>
                <Text style={{ left: props.twoMarkerLeftPosition - 20 }}>
                  {multiSliderCapacity[1]}
                </Text>
              </View>
            );
          }}
        />
        <View className="my-5 bg-[#D3D6D8] px-32 h-[1]" />
        {teachers.length > 0 && teacher ? (
          <SelectDropdown
            data={teachers?.map((o: any) => o?.fullName)}
            defaultButtonText="مدرس دوره"
            buttonTextStyle={Styles.buttonTextStyle}
            buttonStyle={Styles.buttonStyle}
            dropdownStyle={Styles.dropdownStyle}
            rowTextStyle={Styles.rowTextStyle}
            selectedRowTextStyle={Styles.selectedRowTextStyle}
            search
            searchInputTxtStyle={Styles.searchInputTxtStyle}
            searchPlaceHolder="جستجو نام مدرس"
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
              setSelectedTeacher(selectedItem);
            }}
            defaultValue={teacher}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
        ) : (
          <SelectDropdown
            data={teachers?.map((o: any) => o?.fullName)}
            defaultButtonText="مدرس دوره"
            buttonTextStyle={Styles.buttonTextStyle}
            buttonStyle={Styles.buttonStyle}
            dropdownStyle={Styles.dropdownStyle}
            rowTextStyle={Styles.rowTextStyle}
            selectedRowTextStyle={Styles.selectedRowTextStyle}
            search
            searchInputTxtStyle={Styles.searchInputTxtStyle}
            searchPlaceHolder="جستجو نام مدرس"
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
              setSelectedTeacher(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
        )}
        <SelectDropdown
          data={category?.map((o: any) => o?.name)}
          defaultButtonText="دسته بندی"
          buttonTextStyle={Styles.buttonTextStyle}
          buttonStyle={Styles.buttonStyle}
          dropdownStyle={Styles.dropdownStyle}
          rowTextStyle={Styles.rowTextStyle}
          selectedRowTextStyle={Styles.selectedRowTextStyle}
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
      <CustomButton
        buttonTitle="اعمال فیلتر"
        onPress={() => {
          handelFilter();
          onPressFilter();
        }}
        className="my-4 bg-[#04A641] font-Yekan border border-[#04A641] px-10 py-2.5 color-white text-[16px] text-center rounded-[27px] "
      />
      <View className="flex-row items-center justify-center my-2">
        <Pressable onPress={() => comebackOnpress()}>
          <Text className="border font-Yekan border-[#FF0000] dark:border-white px-10 py-2 color-[#FF0000] dark:color-white text-[16px] text-center rounded-[27px] mr-3 ">
            بازگشت
          </Text>
        </Pressable>
        <Pressable onPress={() => resetOnPress()}>
          <Text className="border font-Yekan border-orange-400 dark:border-white px-10 py-2 color-orange-400 dark:color-white text-[16px] text-center rounded-[27px] ml-3 ">
            بازنشانی
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

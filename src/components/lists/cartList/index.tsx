import { View, Text, FlatList } from "react-native";
import React, { useEffect, FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { RootState } from "../../../redux/store";
import { handelSelect } from "../../../redux/features/selector";
import { CourseItem } from "../../courseItem";
import { CustomButton } from "../../common/customButton";
import { ERouteList } from "../../../core/enums/route";

export const CartList: FC = (): JSX.Element => {
  const [price, setPrice] = useState<number>();

  const navigation = useNavigation<any>();

  const { studentModel }: any = useSelector((state: RootState) => state.user);
  const state: any = useSelector((state: RootState) => state.cart);

  const handelPrice = () => {
    let total = 0;
    state?.map((item: { cost: number }) => (total += item.cost));
    setPrice(total);
  };
  // ------------route---------------

  const dispatch = useDispatch();

  const routeName = useRoute();

  const isFocus = useIsFocused();

  useEffect(() => {
    handelPrice();
    if (isFocus)
      dispatch(
        handelSelect({
          route: routeName.name,
        })
      );
    if (!studentModel)
      Toast.show({
        type: "error",
        text1: " لطفا وارد حساب کاربری خود شوید !!",
      });
  }, [studentModel, isFocus, state]);

  return (
    <>
      {studentModel !== null ? (
        <View className="pt-[15] flex-1 dark:bg-[#00216C]">
          <View className="h-[73%] ">
            {state && (
              <FlatList
                data={state}
                ListEmptyComponent={
                  <View className="items-center h-full">
                    <Text className="font-Yekan px-8 py-[18] text-[20px] items-center text-center rounded-[30px] dark:text-white ">
                      لیست خالی است
                    </Text>
                  </View>
                }
                renderItem={({ item }: any) => (
                  <CourseItem
                    courseTitle={item?.title}
                    courseTeacher={item?.teacher?.fullName}
                    courseImage={item?.lesson?.image}
                    coursePrice={item?.cost}
                    item={item}
                    pageName="cart"
                  />
                )}
                // keyExtractor={item => item?._id}
                maxToRenderPerBatch={5}
              />
            )}
          </View>
          <View
            className="mx-11 p-4 bg-white rounded-[20px] dark:bg-[#212477] "
            style={{
              elevation: 8,
            }}
          >
            <View className="flex-row-reverse justify-between px-2 py-1">
              <Text className="font-Yekan text-[15px] text-center color-[#878787] dark:color-white ">
                تعداد آیتم‌ها:
              </Text>
              <View className="flex-row-reverse">
                <Text className="font-Yekan font-bold text-[14px] text-center color-[#7C7C7C] dark:color-white ">
                  {state?.length}
                </Text>
                <Text className="font-Yekan text-[15px] text-center color-[#878787] dark:color-white ">
                  عدد
                </Text>
              </View>
            </View>
            <View className="flex-row-reverse justify-between px-2 py-1">
              <Text className="font-Yekan text-[15px] text-center color-[#878787] dark:color-white ">
                تخفیف :
              </Text>
              <Text className="font-Yekan font-medium text-[15px] text-center color-[#7C7C7C] dark:color-white ">
                %0
              </Text>
            </View>
            <View className="flex-row-reverse justify-between px-2 py-1">
              <Text className="font-Yekan text-[15px] text-center color-[#878787] dark:color-white ">
                جمع کل :
              </Text>
              <View className="flex-row-reverse">
                <Text className="font-Yekan font-bold text-[15px] text-center color-[#7C7C7C] dark:color-white ">
                  {price}
                </Text>
                <Text className="font-Yekan text-[14px] text-center color-[#878787] dark:color-white ">
                  ت
                </Text>
              </View>
            </View>
            <CustomButton
              buttonTitle="پرداخت"
              onPress={() => {
                state?.length !== 0 && console.log("پرداخت شد");
              }}
              className="bg-[#03B9FF] color-white mt-5 mb-2 text-[15px] text-center font-Yekan py-3 rounded-[22px] font-bold "
            />
          </View>
        </View>
      ) : (
        <View className="h-[100%] bg-white items-center flex justify-center dark:bg-[#00216C]">
          <Text className="font-Yekan px-8 py-[18] text-[20px] text-center  dark:color-white">
            بر ای مشاهده سبد خرید لطفا وارد حساب خود شوید!!
          </Text>
          <CustomButton
            buttonTitle="ورود به حساب کاربری"
            onPress={() => {
              navigation.replace(ERouteList.LogIn);
            }}
            className="border-[1.5px] border-[#3A84FF] color-[#3A84FF] font-Yekan px-7 py-[12] text-[16px] text-center rounded-[30px] "
          />
        </View>
      )}
    </>
  );
};

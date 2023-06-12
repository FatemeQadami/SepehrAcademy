import { View, Text, FlatList } from "react-native";
import React, { FC, useEffect } from "react";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

import { CourseItem } from "../../courseItem";
import { RootState } from "../../../redux/store";
import { CustomButton } from "../../common/customButton";
import { handelSelect } from "../../../redux/features/selector";
import { ERouteList } from "../../../core/enums/route";

export const FavoritesList: FC = (): JSX.Element => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const routeName = useRoute();
  const isFocus = useIsFocused();

  const { studentModel }: any = useSelector((state: RootState) => state.user);
  const favorite: any = useSelector((state: RootState) => state.favorite);

  // ------------route---------------

  useEffect(() => {
    if (isFocus)
      dispatch(
        handelSelect({
          route: routeName.name,
        })
      );
    if (!studentModel)
      Toast.show({
        type: "error",
        text2: " لطفا وارد حساب کاربری خود شوید !!",
      });
  }, [studentModel, isFocus]);

  return (
    <>
      {studentModel !== null ? (
        <View className="pt-[15] flex-1 dark:bg-[#00216C] ">
          <FlatList
            data={favorite}
            ListEmptyComponent={
              <Text className="font-Yekan px-8 py-[18] text-[20px] text-center rounded-[30px] dark:text-white ">
                لیست خالی است
              </Text>
            }
            renderItem={({ item }: any) => (
              <CourseItem
                courseTitle={item?.title}
                courseTeacher={item?.teacher?.fullName}
                courseImage={item?.lesson?.image}
                coursePrice={item?.cost}
                item={item}
                pageName="fav"
              />
            )}
            // keyExtractor={item => item?._id}
            maxToRenderPerBatch={5}
          />
        </View>
      ) : (
        <View className="h-[100%] bg-white items-center flex justify-center dark:bg-[#00216C]">
          <Text className="font-Yekan px-8 py-[18] text-[20px] text-center rounded-[30px] dark:color-white ">
            بر ای مشاهده لیست موارد دلخواه لطفا وارد حساب خود شوید!!
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

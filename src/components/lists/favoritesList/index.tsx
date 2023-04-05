import { View, Text, FlatList } from "react-native";
import React, { FC, useState, useEffect, useMemo } from "react";
import CourseItem from "../../courseItem";
import SkeletonLoading from "../../common/skeletonLoading";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import Toast from "react-native-toast-message";
import CustomButton from "../../common/customButton";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { handelSelect } from "../../../redux/features/selector";

const FavoritesList: FC = (): JSX.Element => {
  const navigation = useNavigation<any>();

  const { studentModel }: any = useSelector((state: RootState) => state.user);
  const state: any = useSelector((state: RootState) => state.favorite);

  // const data = useMemo(() => state, [state]);

  // console.log("state", state);

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
    if (!studentModel)
      Toast.show({
        type: "error",
        text1: " لطفا وارد حساب کاربری خود شوید !!",
      });
  }, [studentModel, isFocus]);

  return (
    <>
      {studentModel ? (
        <View className="bg-white pt-[15] flex-1">
          <FlatList
            data={state}
            ListEmptyComponent={
              <Text className="font-Yekan px-8 py-[18] text-[20px] text-center rounded-[30px] ">
                {" "}
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
        <View className="h-[100%] bg-white items-center flex justify-center">
          <Text className="font-Yekan px-8 py-[18] text-[20px] text-center rounded-[30px] ">
            بر ای مشاهده لیست موارد دلخواه لطفا وارد حساب خود شوید!!
          </Text>
          <CustomButton
            buttonTitle="ورود به حساب کاربری"
            onPress={() => {
              navigation.replace("Login");
            }}
            className="border-[1.5px] border-[#3A84FF] color-[#3A84FF] font-Yekan px-7 py-[12] text-[16px] text-center rounded-[30px] "
          />
        </View>
      )}
    </>
  );
};

export default FavoritesList;

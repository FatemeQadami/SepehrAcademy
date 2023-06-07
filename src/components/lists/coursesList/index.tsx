import { View, Text, FlatList } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { CourseItem } from "../../courseItem";
import { coursesAPI } from "../../../core/services/api/courses.api";
import { SkeletonLoading } from "../../common/skeletonLoading";
import { handelSelect } from "../../../redux/features/selector";
import { Header } from "../../common/header";
import { RootState } from "../../../redux/store";

export const CoursesList: FC = (): JSX.Element => {
  const [data, setData] = useState([]);

  const mapCounter = [1, 2, 3, 4, 5];

  // ------------route---------------

  const dispatch = useDispatch();

  const routeName = useRoute();

  const isFocus = useIsFocused();

  // ------------API---------

  const loadData = async () => {
    const result = await coursesAPI();
    setData(result?.data?.result);
  };

  console.log("data", data);

  //----------search & filter---------
  const { teacher, sortId, costRange, searchWord, capacityRange }: any =
    useSelector((state: RootState) => state.search_filter);

  let filteredData = data?.filter((search: any) => {
    return teacher
      ? search?.teacher?.fullName
          ?.toLowerCase()
          .includes(teacher?.toLowerCase())
      : true &&
          (search?.title?.toLowerCase().includes(searchWord?.toLowerCase()) ||
            search?.teacher?.fullName
              ?.toLowerCase()
              .includes(searchWord?.toLowerCase()));
  });

  if (costRange) {
    filteredData = filteredData?.filter(
      (f: any) => costRange[0] <= f.cost && costRange[1] >= f.cost
    );
  }
  if (capacityRange) {
    filteredData = filteredData?.filter(
      (fc: any) =>
        capacityRange[0] <= fc.capacity && capacityRange[1] >= fc.capacity
    );
  }

  if (sortId === 1) {
    filteredData = filteredData?.sort((a: any, b: any) => {
      if (a.cost < b.cost) return 1;
      else return -1;
    });
  }

  if (sortId === 2) {
    filteredData = filteredData?.sort((a: any, b: any) => {
      if (a.cost > b.cost) return 1;
      else return -1;
    });
  }

  if (sortId === 3) {
    filteredData = filteredData?.sort((a: any, b: any) => {
      if (a.likedCount < b.likedCount) return 1;
      else return -1;
    });
  }

  useEffect(() => {
    loadData();
    if (isFocus)
      dispatch(
        handelSelect({
          route: routeName.name,
        })
      );
  }, [isFocus]);

  return (
    <>
      <Header pageName="Courses" />
      <View className="dark:bg-[#00216C] pt-[15] flex-1 ">
        {data && data?.length !== 0 ? (
          <FlatList
            data={filteredData}
            ListEmptyComponent={
              <Text className="font-Yekan text-center text-base items-center mt-20">
                داده‌ای یافت نشد!!!!!!!!
              </Text>
            }
            renderItem={({ item }: any) => (
              <CourseItem
                courseTitle={item?.title}
                courseTeacher={item?.teacher?.fullName}
                courseImage={item?.lesson?.image}
                coursePrice={item?.cost}
                item={item}
                pageName="Courses"
              />
            )}
            keyExtractor={(item: { _id: string }) => item?._id}
            maxToRenderPerBatch={5}
          />
        ) : (
          <>
            {mapCounter.map((_, index) => (
              <SkeletonLoading key={index} />
            ))}
          </>
        )}
      </View>
    </>
  );
};

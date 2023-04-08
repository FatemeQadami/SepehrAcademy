import { View, Text, FlatList } from "react-native";
import React, { FC, useEffect, useState } from "react";
import CourseItem from "../../courseItem";
import { coursesAPI } from "../../../core/services/api/courses.api";
import SkeletonLoading from "../../common/skeletonLoading";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { handelSelect } from "../../../redux/features/selector";
import { useIsFocused, useRoute } from "@react-navigation/native";

const CoursesList: FC = (): JSX.Element => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState<any>(false);

  const mapCounter = [1, 2, 3, 4, 5];

  // ------------route---------------

  const { route } = useSelector((state: RootState) => state.selector);

  console.log("reduxState", route);

  const dispatch = useDispatch();

  const routeName = useRoute();

  console.log(routeName.name);
  
  const isFocus = useIsFocused();
  // ------------API---------

  const loadData = async () => {
    const result = await coursesAPI();
    setData(result?.data?.result);
    // console.log(data);
  };



  useEffect(() => {
    loadData();
    // console.log(data);
    if (isFocus)
      dispatch(
        handelSelect({
          route: routeName.name,
        })
      );
  }, [isFocus]);

  return (
    <View className="dark:bg-[#00216C] pt-[15] flex-1 ">
      {data && data?.length !== 0 ? (
        <FlatList
          data={data}
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
          onRefresh={() => {}}
          refreshing={refreshing}
        />
      ) : (
        <>
          {mapCounter.map((_, index) => (
            <SkeletonLoading key={index} />
          ))}
        </>
      )}
    </View>
  );
};

export default CoursesList;

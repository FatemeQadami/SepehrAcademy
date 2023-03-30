import { View, Text, FlatList } from "react-native";
import React, { FC, useEffect, useState } from "react";
import CourseItem from "../../courseItem";
import { coursesAPI } from "../../../core/services/api/courses.api";
import SkeletonLoading from "../../common/skeletonLoading";

const CoursesList: FC = (): JSX.Element => {
  const [data, setData] = useState([]);

  const mapCouter = [1, 2, 3, 4, 5];

  const loadData = async () => {
    const Data = await coursesAPI();
    setData(Data?.data?.result);
    console.log(data);
  };

  useEffect(() => {
    loadData();
    console.log(data);
  }, []);

  return (
    <View className="bg-white pt-[15] ">
      {data.length !== 0 ? (
        <FlatList
          data={data}
          renderItem={({ item }: any) => (
            <CourseItem
              courseTitle={item?.title}
              courseTeacher={item?.teacher?.fullName}
              courseImage={item?.lesson?.image}
              coursePrice={item?.cost}
              item={item}
            />
          )}
          // keyExtractor={item => item?._id}
          // maxToRenderPerBatch={5}
        />
      ) : (
        <>
          {mapCouter.map((_, index) => (
            <SkeletonLoading key={index} />
          ))}
        </>
      )}
    </View>
  );
};

export default CoursesList;

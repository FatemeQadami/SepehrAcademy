import { View, Text, Image } from "react-native";
import React , {FC} from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const SkeletonLoading:FC = ():JSX.Element => {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: 270,
            height: 100,
            paddingVertical: 8,
            marginVertical: 18.5,
          }}
        >
          <Text style={{ fontSize: 14, lineHeight: 18, marginTop: 8 }}>
            Hello world
          </Text>
          <Text style={{ fontSize: 14, lineHeight: 18, marginTop: 20 }}>
            Hello world
          </Text>
          <Text style={{ fontSize: 14, lineHeight: 18, marginTop: 8 }}>
            Hello world
          </Text>
        </View>
        <View
          style={{ width: 60, height: 60, borderRadius: 50, marginLeft: 4 }}
        />
      </View>
    </SkeletonPlaceholder>
  );
};

export default SkeletonLoading;

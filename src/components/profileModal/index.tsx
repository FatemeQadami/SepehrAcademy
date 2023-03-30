import { View, Text } from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Pressable } from "react-native";

const ProfileUpload = ({ onPress, getImageFromCamera , getImageFromGallery }: any) => {
  return (
    <View className="mx-7 mt-2 w-[350] mb-8 ">
      <Pressable className="absolute top-1 right-1" onPress={onPress}>
        <FontAwesome name="close" size={20} color="red" />
      </Pressable>
      <Pressable
        onPress={() => {
          getImageFromCamera();
        }}
        className="flex-row-reverse justify-center p-3 bg-[#4F91FF] rounded-[20px] mt-10"
      >
        <FontAwesome name="camera" size={20} color="white" />
        <Text className="font-Yekan text-[15px] text-white px-5 ">دوربین</Text>
      </Pressable>
      <Pressable         onPress={() => {
          getImageFromGallery();
        }} className="flex-row-reverse justify-center p-3 bg-[#4F91FF] rounded-[20px] my-4">
        <FontAwesome name="picture-o" size={20} color="white" />
        <Text className="font-Yekan text-[15px] text-white px-6 ">گالری</Text>
      </Pressable>
      <Pressable className="flex-row-reverse justify-center bg-[#FFF4F4] p-3 rounded-[20px]">
        <Ionicons name="remove-circle-outline" size={20} color="red" />
        <Text className="font-Yekan text-[15px] text-red-500 px-6 ">حذف</Text>
      </Pressable>
    </View>
  );
};

export default ProfileUpload;

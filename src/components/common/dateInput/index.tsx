import { View, Text, Pressable } from "react-native";
import React, { FC } from "react";
import Foundation from "react-native-vector-icons/Foundation";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useFormikContext } from "formik";

interface IDateInputProp {
  className?: string;
  inputWidth: string;
  name: string;
  onPress: Function;
}

export const DateInput: FC<IDateInputProp> = ({
  className,
  inputWidth,
  name,
  onPress,
}): JSX.Element => {
  const { errors, touched, values }: any = useFormikContext<any>();
  return (
    <>
      <View className={`flex-row bg-white rounded-3xl mt-3 ${className}`}>
        <FontAwesome5
          name="calendar-plus"
          size={22}
          color="grey"
          style={{ padding: 10, marginLeft: 10 }}
        />
        <Pressable onPress={() => onPress()} className="flex-row">
          <View
            className={`bg-white text-right fontSize-[18px] h-[45] pr-[20] ${inputWidth}`}
          >
            <Text
              style={
                values[name]
                  ? {
                      color: "black",
                      textAlign: "center",
                      marginTop: 14,
                      fontSize: 15,
                    }
                  : { color: "gray", textAlign: "right", marginTop: 14 }
              }
            >
              {values[name] || "تاریخ تولد"}
            </Text>
          </View>
          <Foundation
            name="calendar"
            size={27}
            color="grey"
            style={{ marginRight: 20, paddingTop: 8 }}
          />
        </Pressable>
      </View>
      <View className="mt-[5] h-[20]">
        {errors.birthDate && touched.birthDate && (
          <Text className="font-Yekan font-bold text-[14px] color-red-600 pr-[15] ">
            {errors.birthDate}
          </Text>
        )}
      </View>
    </>
  );
};

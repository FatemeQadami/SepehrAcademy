import { View, Text, Pressable } from "react-native";
import React, { FC } from "react";
import Foundation from "react-native-vector-icons/Foundation";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useFormikContext } from "formik";

interface IDateInputProp {
  className?: string;
  inputWidth?: string;
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
      <View
        className={`flex-row bg-white rounded-3xl mt-3 ${className}`}
      >
        <Pressable onPress={() => onPress()} className="flex-row flex-1">
          <FontAwesome5
            name="calendar-plus"
            size={22}
            color="grey"
            style={{ padding: 10, marginLeft: 10 }}
          />
          <View
            className={`bg-white text-right fontSize-[18px] flex-1 h-[45]${inputWidth}`}
          >
            <Text
              style={
                values[name]
                  ? {
                      color: "black",
                      textAlign: "center",
                      marginTop: 10,
                      fontSize: 15,
                    }
                  : { color: "gray", textAlign: "right", marginTop: 14 , marginRight:20 }
              }
            >
              {values[name] || "تاریخ تولد"}
            </Text>
          </View>
        </Pressable>
        <Foundation
          name="calendar"
          size={27}
          color="grey"
          style={{ paddingTop: 8 , marginRight:20 }}
        />
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

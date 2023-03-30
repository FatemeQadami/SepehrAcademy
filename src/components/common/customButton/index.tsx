import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";

interface ICustomButtonProp {
  buttonTitle: string;
  onPress?: any;
  className: string;
  style?:any
}

const CustomButton: FC<ICustomButtonProp> = ({
  buttonTitle,
  onPress,
  className,style
}): JSX.Element => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        onPress();
      }}
    >
      <Text className={className}style = {style}>{buttonTitle} </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

import {
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { FC } from "react";

interface ICustomButtonProp {
  buttonTitle: string;
  onPress: Function;
  className: string;
  style?: any;
  isLoading?: Boolean;
  color?: string;
  loadingClassName?: string;
}

export const CustomButton: FC<ICustomButtonProp> = ({
  buttonTitle,
  onPress,
  className,
  isLoading,
  style,
  loadingClassName,
  color,
}): JSX.Element => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        onPress();
      }}
    >
      {isLoading ? (
        <View className={loadingClassName}>
          <ActivityIndicator size="small" color={color} />
        </View>
      ) : (
        <Text className={className} style={style}>
          {buttonTitle}
        </Text>
      )}
    </TouchableOpacity>
  );
};

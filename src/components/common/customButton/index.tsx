import {
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React, { FC } from "react";

interface ICustomButtonProp {
  buttonTitle: string;
  onPress: Function;
  className: string;
  style?: any;
  isLoading?: Boolean;
  color?: string;
  loadingClassName?: string;
  iconName?: string;
  TextClassName?: string;
}

export const CustomButton: FC<ICustomButtonProp> = ({
  buttonTitle,
  onPress,
  className,
  isLoading,
  style,
  loadingClassName,
  color,
  iconName,
  TextClassName,
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
      ) : iconName ? (
        <View className={`flex flex-row justify-center ${className}`} style={style}>
          <FontAwesome name={iconName} size={20} color="white" />
          <Text className={TextClassName}>{buttonTitle}</Text>
        </View>
      ) : (
        <Text className={className} style={style}>
          {buttonTitle}
        </Text>
      )}
    </TouchableOpacity>
  );
};

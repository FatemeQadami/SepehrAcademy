import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  GestureResponderEvent,
} from "react-native";
import React, { FC, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFormikContext } from "formik";

interface InputTextProp {
  placeholder: string;
  type?: any;
  name: string;
  leftIconSize?: number;
  leftIconName?: any;
  rightIconName?: string;
  rightIconSize?: number;
  leftIconStyle?: any;
  rightIconStyle?: any;
  className: string;
  classView?: string;
  secureTextEntry?: any;
  onPress?: any;
  editable?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
}

export const InputText: FC<InputTextProp> = ({
  placeholder,
  type,
  name,
  leftIconSize,
  leftIconName,
  rightIconName,
  rightIconSize,
  leftIconStyle,
  rightIconStyle,
  className,
  classView,
  secureTextEntry,
  onPress,
  editable,
  numberOfLines,
  multiline,
}): JSX.Element => {
  const { values, errors, touched, setFieldValue }: any =
    useFormikContext<any>();

  const [value, setValue] = useState<string>("");

  const onChenged = (text: string): void => {
    let val = text;
    if ((type = "number-pad")) {
      val = text.replace(/[^0-9.]/g, "");
    }
    setValue(val);
    name && setFieldValue(name, text);
  };

  return (
    <KeyboardAvoidingView>
      <>
        <View
          className={`flex flex-row-reverse rounded-3xl bg-white mt-3 ${classView}`}
        >
          {rightIconName && (
            <Icon
              name={rightIconName}
              size={rightIconSize}
              color="gray"
              style={rightIconStyle}
            />
          )}
          <TextInput
            editable={editable}
            className={className}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            placeholderTextColor="gray"
            keyboardType={type}
            multiline={multiline}
            numberOfLines={numberOfLines}
            onChangeText={(text) => onChenged(text)}
            value={name ? values[name] : value}
          />
          {leftIconName && (
            <Icon
              name={leftIconName}
              size={leftIconSize}
              color="gray"
              style={leftIconStyle}
              onPress={() => onPress()}
            />
          )}
        </View>
        <View className="mt-[5] h-[20]">
          {name && errors[name] && touched[name] && (
            <Text className="font-Yekan font-bold text-[14px] color-red-600 pr-[15] ">
              {errors[name]}
            </Text>
          )}
        </View>
      </>
    </KeyboardAvoidingView>
  );
};

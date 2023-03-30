import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import React, { FC, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFormikContext } from "formik";

interface IInputTextProp {
  placeholder: string;
  type?: any;
  name: string;
  leftIconSize?: number;
  leftIconName?: any;
  rightIconName: string;
  rightIconSize: number;
  leftIconStyle?: any;
  rightIconStyle: any;
  className: string;
  classView?: string;
  secureTextEntry?: any;
  onPress?: any;
  editable?: boolean;
}

const InputText: FC<IInputTextProp> = ({
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
          <Icon
            name={rightIconName}
            size={rightIconSize}
            color="gray"
            style={rightIconStyle}
          />
          <TextInput
            editable={editable}
            className={className}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            placeholderTextColor="gray"
            keyboardType={type}
            onChangeText={(text) => onChenged(text)}
            value={name ? values[name] : value}
          />
          <Icon
            name={leftIconName}
            size={leftIconSize}
            color="gray"
            style={leftIconStyle}
            onPress={() => onPress()}
          />
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

export default InputText;

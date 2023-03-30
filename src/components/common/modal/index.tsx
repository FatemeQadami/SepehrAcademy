import { View, Text, Pressable } from "react-native";
import React, { FC } from "react";
import { Modal } from "react-native";

interface ICustomModalProp {
  animationType: "none" | "slide" | "fade";
  onRequestClose: Function;
  visible: any;
  children: any;
  className: string;
  className2?: string;
}

const CustomModal: FC<ICustomModalProp> = ({
  animationType,
  onRequestClose,
  visible,
  children,
  className,
  className2,
}): JSX.Element => {
  return (
    <Modal
      animationType={animationType}
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onRequestClose();
      }}
    >
      <View className={`flex justify-center items-center ${className}`}>
        <View
          className={`bg-white items-center ${className2}`}
          style={{ elevation: 8 }}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

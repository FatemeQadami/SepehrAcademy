import { View, Modal } from "react-native";
import React, { FC } from "react";

interface CustomModalProp {
  animationType: "none" | "slide" | "fade";
  onRequestClose: Function;
  visible: any;
  children: any;
  className: string;
  className2?: string;
  statusBarTranslucent?: boolean;
}

export const CustomModal: FC<CustomModalProp> = ({
  animationType,
  onRequestClose,
  visible,
  children,
  className,
  statusBarTranslucent,
  className2,
}): JSX.Element => {
  return (
    <Modal
      animationType={animationType}
      transparent={true}
      statusBarTranslucent={statusBarTranslucent}
      visible={visible}
      onRequestClose={() => {
        onRequestClose();
      }}
    >
      <View className={`flex justify-center items-center ${className}`}>
        <View
          className={`bg-white items-center dark:bg-[#212477] ${className2}`}
          style={{ elevation: 8 }}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
};

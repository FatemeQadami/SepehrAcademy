import { View, Text, Pressable } from "react-native";
import React, { FC, useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { addToFavorite } from "../../../redux/features/favorite";

interface propType {
  color: string;
  size: number;
  item: any;
}

const Favorite: FC<propType> = ({ color, size, item }): JSX.Element => {
  const dispatch = useDispatch<any>();

  const state: any = useSelector((state: RootState) => state.favorite);

  const { studentModel }: any = useSelector((state: RootState) => state.user);

  console.log(state);

  return (
    <Pressable
      onPress={() => {
        studentModel
          ? dispatch(addToFavorite(item))
          : Toast.show({
              type: "error",
              text1:
                "برای افزودن به موارد دلخواه لطفا وارد حساب کاربری خود شوید !!",
            });
      }}
    >
      {state && state?.some((s: { _id: string }) => s._id === item._id) ? (
        <FontAwesome name={"heart"} color="red" size={size} />
      ) : (
        <FontAwesome name={"heart-o"} color={color} size={size} />
      )}
    </Pressable>
  );
};

export default Favorite;
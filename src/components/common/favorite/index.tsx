import { Pressable } from "react-native";
import React, { FC } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";

import { RootState } from "../../../redux/store";
import { addToFavorite } from "../../../redux/features/favorite";

interface propType {
  color: string;
  size: number;
  item: any;
}

export const Favorite: FC<propType> = ({ color, size, item }): JSX.Element => {
  const dispatch = useDispatch<any>();

  const state: any = useSelector((state: RootState) => state.favorite);

  const { studentModel }: any = useSelector((state: RootState) => state.user);

  const handelClick = state?.some((s: { _id: string }) => s._id === item._id);

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
      {handelClick ? (
        <FontAwesome name={"heart"} color="red" size={size} />
      ) : (
        <FontAwesome name={"heart-o"} color={color} size={size} />
      )}
    </Pressable>
  );
};

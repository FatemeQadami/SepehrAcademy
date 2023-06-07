import { Pressable } from "react-native";
import React, { FC } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";

import { RootState } from "../../../redux/store";
import { addToFavorite } from "../../../redux/features/favorite";
import { getItem, setItem } from "../../../core/services/storage/storage";
import { EStorageKeys } from "../../../core/enums/storage";

interface propType {
  color: string;
  size: number;
  item: any;
}

export const Favorite: FC<propType> = ({ color, size, item }): JSX.Element => {
  const dispatch = useDispatch<any>();

  const favorite: any = useSelector((state: RootState) => state.favorite);
  const cart: any = useSelector((state: RootState) => state.cart);
  const { studentModel }: any = useSelector((state: RootState) => state.user);

  //---------- add to favorite ----------

  const handelAddToFavorite = async () => {
    const userData = {
      [studentModel?._id]: {
        cart: cart,
        favorite: [...favorite, item],
      },
    };
    if (studentModel) {
      dispatch(addToFavorite(item));
      const get = await getItem(EStorageKeys.UserData);
      console.log({ ...get, ...userData }, studentModel?._id);
      setItem(EStorageKeys.UserData, { ...get, ...userData });
    } else {
      Toast.show({
        type: "error",
        text1: "برای افزودن به موارد دلخواه لطفا وارد حساب کاربری خود شوید !!",
      });
    }
  };

  const handelClick = favorite?.some(
    (s: { _id: string }) => s._id === item._id
  );

  return (
    <Pressable onPress={() => handelAddToFavorite()}>
      {handelClick ? (
        <FontAwesome name={"heart"} color="red" size={size} />
      ) : (
        <FontAwesome name={"heart-o"} color={color} size={size} />
      )}
    </Pressable>
  );
};

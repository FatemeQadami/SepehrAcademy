import { View, Text, Pressable } from "react-native";
import React, { FC, useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import { getItem, setItem } from "../../../core/services/storage/storage";
import { EStorageKeys } from "../../../core/enums/storage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { addToCart, removeItemFromCart } from "../../../redux/features/cart";
import { CustomModal } from "../modal";
import { Awareness } from "../../Awareness";

interface bookMarkPropsType {
  item: any;
}
export const BookMark: FC<bookMarkPropsType> = ({ item }): JSX.Element => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<Boolean>(false);

  const { studentModel }: any = useSelector((state: RootState) => state.user);
  const cart: any = useSelector((state: RootState) => state.cart);
  const favorite: any = useSelector((state: RootState) => state.favorite);

  const dispatch = useDispatch();

  //---------- add to cart---------

  const handelBuy = async () => {
    const userData = {
      [studentModel?._id]: {
        cart: [...cart, item],
        favorite: favorite,
      },
    };

    if (studentModel) {
      const getShowModal = await getItem(EStorageKeys.ShowModal);
      console.log("getShowModal", getShowModal, typeof getShowModal);
      if (getShowModal !== true) {
        setShowModal(true);
        setModalVisible(true);
        setItem(EStorageKeys.ShowModal, true);
      }
      dispatch(addToCart(item));
      const get = await getItem(EStorageKeys.UserData);
      setItem(EStorageKeys.UserData, { ...get, ...userData });
    } else {
      Toast.show({
        type: "error",
        text2: "برای رزرو کردن درس لطفا وارد حساب کاربری خود شوید !!",
      });
    }
  };

  //---------- remove from cart ----------

  const handelRemove = async () => {
    dispatch(removeItemFromCart(item));
    const filtered = cart.filter(
      (item: { _id: string }) => item?._id !== item?._id
    );
    const userData = {
      [studentModel?._id]: {
        cart: filtered,
        favorite: favorite,
      },
    };
    const get = await getItem(EStorageKeys.UserData);
    setItem(EStorageKeys.UserData, { ...get, ...userData });
  };

  const handelClick = () => {
    return cart?.some((it: { _id: string }) => it?._id === item?._id);
  };

  return (
    <View>
      {handelClick() ? (
        <Pressable 
          onPress={() => {
            handelRemove();
          }}
        >
          <FontAwesome name="bookmark" size={20} color="gray" />
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            handelBuy();
          }}
        >
          <FontAwesome name="bookmark-o" size={20} color="gray" />
        </Pressable>
      )}
      <CustomModal
        visible={modalVisible}
        animationType="slide"
        statusBarTranslucent
        className2="p-5 rounded-[30px]"
        className="px-8 bg-blue-rgba h-full"
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Awareness
          closeOnpress={() => {
            setModalVisible(!modalVisible);
          }}
        />
      </CustomModal>
    </View>
  );
};

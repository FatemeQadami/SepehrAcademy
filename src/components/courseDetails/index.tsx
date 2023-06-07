import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { FC, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";

import { useColorTheme } from "../../core/config/color";
import { EStorageKeys } from "../../core/enums/storage";
import { idType } from "../../core/models";
import { commentsAPI } from "../../core/services/api/comment.api";
import { countLikeDislikeAPI, likeAPI } from "../../core/services/api/like.api";
import { getItem, setItem } from "../../core/services/storage/storage";
import { addToCart, removeItemFromCart } from "../../redux/features/cart";
import { RootState } from "../../redux/store";
import { Awareness } from "../Awareness";
import { Comment } from "../comment";
import { CommentItem } from "../commentItem";
import { CustomButton } from "../common/customButton";
import { Favorite } from "../common/favorite";
import { CustomModal } from "../common/modal";

export const CourseDetailsPage: FC = (): JSX.Element => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [commentModal, setCommentModal] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<Boolean>(false);
  const [reFetch, setReFetch] = useState<Boolean>(false);
  const [data, setData] = useState<any>([]);
  const [refresh, setRefresh] = useState<Boolean>(false);
  const [isLike, setIsLike] = useState<Boolean>(false);
  const [isDisLike, setIsDisLike] = useState<Boolean>(false);
  const [like, setLike] = useState<number>();
  const [disLike, setDisLike] = useState<number>();

  const { studentModel }: any = useSelector((state: RootState) => state.user);
  const cart: any = useSelector((state: RootState) => state.cart);
  const favorite: any = useSelector((state: RootState) => state.favorite);

  const isFocused = useIsFocused();
  const color = useColorTheme();
  const dispatch = useDispatch();
  const route = useRoute<any>();
  const navigation = useNavigation();

  const { item } = route.params;

  //---------comment----------

  const loadComments = async () => {
    const comment: any = await commentsAPI();
    const result = comment?.filter(
      (it: { postId: string }) => it?.postId === item?._id
    );
    setData(result);
  };

  //---------- search in state ----------

  const handelClick = () => {
    return cart?.some((it: { _id: string }) => it?._id === item?._id);
  };

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
        text1: "برای رزرو کردن درس لطفا وارد حساب کاربری خود شوید !!",
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

  //----------like ----------

  const handelLike = async () => {
    const likeObj: idType = {
      courseId: item?._id,
      userId: studentModel?._id,
    };
    const response = await likeAPI(likeObj);
    setIsLike((old) => !old);
    setIsDisLike(false);
    setRefresh((old) => !old);
  };

  //----------dislike----------

  const handelDisLike = async () => {
    const disLikeObj: idType = {
      courseId: item?._id,
      userId: studentModel?._id,
    };
    const response = await likeAPI(disLikeObj);
    setIsDisLike((old) => !old);
    setIsLike(false);
    setRefresh((old) => !old);
  };

  //----------like & dislike count----------

  const countLikeDislike = async () => {
    const id = item?._id;
    const response = await countLikeDislikeAPI(id);
    setLike(response?.result?.like);
    setDisLike(response?.result?.dislike);
  };

  useEffect(() => {
    if (isFocused) {
      setIsLike(item?.isLiked);
      setIsDisLike(item?.isDisLiked);
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      loadComments();
      countLikeDislike();
    }
  }, [reFetch, isFocused, refresh]);

  return (
    <>
      <View className="dark:bg-[#00216C] relative ">
        <View
          className="w-[100%] h-[260] rounded-b-[40px] z-0 absolute top-0 "
          style={{ backgroundColor: color?.HeaderColor }}
        />
        {item && (
          <View className="px-10 relative">
            <Pressable className="mt-8" onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" color="white" size={22} />
            </Pressable>
            <View className="flex-row justify-between">
              <View className="mr-1 mt-4">
                <Favorite color="white" size={24} item={item} />
              </View>
              <View className="mt-2">
                <View className="flex-row my-[0.5px]">
                  <AntDesign name="like2" size={15} color="white" />
                  <Text className="color-white text-[14px] font-Yekan pt-[2] ml-1 ">
                    {like}
                  </Text>
                </View>
                <View className="flex-row my-[0.5px]">
                  <AntDesign name="dislike2" size={15} color="white" />
                  <Text className="color-white text-[14px] font-Yekan ml-1 ">
                    {disLike}
                  </Text>
                </View>
              </View>
            </View>
            <View
              className="bg-white mt-5 p-5 mx-4 rounded-t-[50px] rounded-b-[35px] dark:bg-[#212477] z-10"
              style={{ elevation: 10 }}
            >
              <View className="flex-row justify-between">
                <Pressable className="pb-2 pr-2" onPress={() => handelLike()}>
                  <AntDesign
                    name="like1"
                    size={20}
                    color={isLike ? "#00CA4C" : "#B2B2B2"}
                  />
                </Pressable>
                <Image
                  className="rounded-[90px] w-[125] h-[125] mx-auto absolute left-16 top-[-70]"
                  source={{ uri: item?.lesson?.image }}
                />
                <Pressable className="pb-2 pl-2" onPress={handelDisLike}>
                  <AntDesign
                    name="dislike1"
                    size={20}
                    color={isDisLike ? "#00CA4C" : "#B2B2B2"}
                    style={{ transform: [{ scaleX: -1 }] }}
                  />
                </Pressable>
              </View>
              <Text className="text-right color-[#002D85] text-[20px] font-Yekan font-bold mt-7 dark:color-white ">
                {item?.title}
              </Text>
              <Text className="text-right color-[#777777] text-[15px] font-Yekan mt-2 dark:color-white">
                {item?.teacher?.fullName}
              </Text>
              <View className="border-t border-dashed border-[#C8C8C8] mt-3 pt-3">
                <View className="flex-row justify-between">
                  <View className="py-[3] bg-[#F6F9FF] border border-[#B6C7E7] rounded-[18px] flex-row-reverse justify-between w-[49%] px-2 ">
                    <Text className="text-right color-[#8F8F8F] text-[16px] font-Yekan my-1">
                      دانشجو:
                    </Text>
                    <Text className="text-right color-[#3D5FA2] text-[16px] font-Yekan my-1">
                      {item?.students?.length} نفر
                    </Text>
                  </View>
                  <View className="py-[3] bg-[#F6F9FF] border border-[#B6C7E7] rounded-[18px] flex-row-reverse justify-between w-[49%] px-2">
                    <Text className="text-right color-[#8F8F8F] text-[16px] font-Yekan my-1">
                      ظرفیت:
                    </Text>
                    <Text className="text-right color-[#3D5FA2] text-[16px] font-Yekan my-1">
                      {item?.capacity} نفر
                    </Text>
                  </View>
                </View>
                <View className="py-[3] my-3 bg-[#F6F9FF] border border-[#B6C7E7] rounded-[18px] px-2 flex-row-reverse justify-between">
                  <Text className="text-right color-[#8F8F8F] text-[16px] font-Yekan my-1">
                    قیمت:
                  </Text>
                  <View className="flex-row-reverse">
                    <Text className="color-[#E00000] font-Yekan text-[16px] font-bold my-1">
                      {item?.cost}
                    </Text>
                    <Text className="font-Yekan color-[#696969] text-[16px] my-1 pr-0.5">
                      ت
                    </Text>
                  </View>
                </View>
                <View className="py-[3] px-2 bg-[#F6F9FF] border border-[#B6C7E7] rounded-[18px] flex-row-reverse justify-between ">
                  <Text className="text-right color-[#8F8F8F] text-[16px] font-Yekan my-1">
                    تاریخ شروع:
                  </Text>
                  <Text className="text-right color-[#3D5FA2] text-[16px] font-Yekan my-1">
                    {item?.startDate.replaceAll("-", "/").substr(0, 10)}
                  </Text>
                </View>
              </View>
            </View>
            <ScrollView className="px-2 mt-[-70] pt-20 h-[49.5%] z-0">
              <>
                <Text className="text-right color-[#002D85] mt-2 text-[20px] font-Yekan dark:color-white">
                  توضیحات دوره:
                </Text>
                <Text className="color-[#818181] text-[14px] font-Yekan text-right mt-3 mx-4 dark:color-white">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                  با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
                  تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و
                  آینده، شناخت فراوان جامعه و متخصصان را می طلبد،تا با
                  نرم‌افزارها شناخت
                </Text>
              </>
              <View className="mt-6">
                <View className="flex-row-reverse justify-between my-2 ">
                  <Text className="text-right color-[#002D85] text-[20px] font-Yekan dark:color-white">
                    نظرات کاربران:
                  </Text>
                  <Pressable
                    className="flex-row-reverse"
                    onPress={() => {
                      studentModel
                        ? setCommentModal(true)
                        : Toast.show({
                            type: "error",
                            text1:
                              "برای ثبت نظر لطفا وارد حساب کاربری خود شوید !!",
                          });
                    }}
                  >
                    <Text className="text-right color-[#009EDA] text-[15px] font-Yekan px-0.5 pt-1.5">
                      نظر جدید
                    </Text>
                    <AntDesign
                      name="pluscircle"
                      size={30}
                      color="#03B9FF"
                      style={{
                        backgroundColor: "white",
                        borderRadius: 20,
                        marginLeft: 15,
                      }}
                    />
                  </Pressable>
                </View>
                <View className="flex-1 pb-[90] mt-1">
                  {data ? (
                    data?.length !== 0 ? (
                      <>
                        {data?.map(
                          (
                            item: { username: string; comment: string },
                            index: React.Key | null | undefined
                          ) => (
                            <CommentItem
                              key={index}
                              userName={item?.username}
                              comment={item?.comment}
                            />
                          )
                        )}
                      </>
                    ) : (
                      <Text className="font-Yekan color-[#818181] text-center text-[15px] mt-5 ">
                        تاکنون نظری ثبت نشده است
                      </Text>
                    )
                  ) : (
                    <ActivityIndicator
                      size="large"
                      color={color?.ActivityIndicatorColor}
                    />
                  )}
                </View>
              </View>
            </ScrollView>
          </View>
        )}
        <View className="pb-2">
          {handelClick() ? (
            <CustomButton
              iconName="trash-o"
              buttonTitle="حذف از رزرو شده‌ها "
              onPress={() => {
                handelRemove();
              }}
              className="px-8 py-[16] bg-[#9ca3af] rounded-[30px] mx-5 "
              TextClassName="font-Yekan text-[20px] color-white ml-1"
            />
          ) : (
            <CustomButton
              buttonTitle="رزرو کردن"
              onPress={() => handelBuy()}
              className="font-Yekan bg-[#04A641] px-8 py-[16] color-white text-[20px] text-center rounded-[30px] mx-5 "
            />
          )}
        </View>
        <CustomModal
          visible={commentModal}
          animationType="slide"
          statusBarTranslucent
          className2="p-[25] rounded-[30px] h-[94%]"
          className="py-10 bg-blue-rgba h-full"
          onRequestClose={() => {
            setCommentModal(!commentModal);
          }}
        >
          <Comment
            postId={item?._id}
            closeModal={() => {
              setCommentModal(!commentModal);
            }}
            ReFetch={() => {
              setReFetch((old) => !old);
            }}
            comeback={() => {
              setCommentModal(!commentModal);
            }}
          />
        </CustomModal>
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
    </>
  );
};

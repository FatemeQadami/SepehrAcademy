import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";
import React, { FC, useState, useEffect } from "react";
import { useIsFocused, useRoute } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";

import { Favorite } from "../common/favorite";
import { CustomButton } from "../common/customButton";
import {
  commentsAPI,
  addCommentsAPI,
} from "../../core/services/api/comment.api";
import { CustomModal } from "../common/modal";
import { RootState } from "../../redux/store";
import { commentType } from "../../core/models";
import { addToCart, removeItemFromCart } from "../../redux/features/cart";
import { useColorTheme } from "../../core/config/color";
import user from "../../assets/img/comment/user.png";
import { CommentItem } from "../commentItem";

export const CourseDetailsPage: FC = (): JSX.Element => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [reFetch, setReFetch] = useState<Boolean>(false);
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [value, setValue] = useState<any>();

  const { studentModel }: any = useSelector((state: RootState) => state.user);
  const isFocused = useIsFocused();
  const state: any = useSelector((state: RootState) => state.cart);

  const color = useColorTheme();

  const dispatch = useDispatch();

  const route = useRoute<any>();

  const { item } = route.params;

  const onChangeText = (text: string) => {
    let val = text;
    setValue(val);
  };

  const loadComments = async () => {
    const comment: any = await commentsAPI();
    const result = comment?.filter(
      (it: { postId: string }) => it?.postId === item?._id
    );
    setData(result);
  };
  const addComment = async (value: string) => {
    setIsLoading(true);

    const commentObj: commentType = {
      postId: item?._id,
      email: studentModel?.email,
      username: studentModel?.fullName,
      comment: value,
    };
    const response: any = await addCommentsAPI(commentObj);

    setReFetch((old) => !old);

    Toast.show({
      type: "success",
      text1: "نظر شما با موفقیت ثبت شد :)",
      text2: "ممنون از همکاری شما :)",
    });

    setIsLoading(false);

    setModalVisible(!modalVisible);
  };

  const handelClick = () => {
    return state?.some((s: { _id: string }) => s._id === item._id);
  };

  useEffect(() => {
    if (isFocused) loadComments();
  }, [reFetch, isFocused]);

  return (
    <View className="dark:bg-[#00216C] ">
      <View
        className="bg-[#4F91FF] w-[100%] h-[260] rounded-b-[40px] z-0 "
        style={{ backgroundColor: color?.HeaderColor }}
      ></View>
      {item && (
        <View className="top-[-190] z-10 px-10">
          <View className="flex-row justify-between z-40">
            <View className="mr-1 mt-4">
              <Favorite color="white" size={24} item={item} />
            </View>
            <Image
              className="rounded-[90px] w-[125] h-[125] mx-auto"
              source={{ uri: item?.lesson?.image }}
            />
            <View className="mt-2">
              <View className="flex-row my-[0.5px]">
                <AntDesign name="like2" size={15} color="white" />
                <Text className="color-white text-[14px] font-Yekan pt-[2] ml-1 ">
                  {item?.likedCount}
                </Text>
              </View>
              <View className="flex-row my-[0.5px]">
                <AntDesign name="dislike2" size={15} color="white" />
                <Text className="color-white text-[14px] font-Yekan ml-1 ">
                  {item?.disLikedCount}
                </Text>
              </View>
            </View>
          </View>
          <View
            className="bg-white p-5 mx-4 rounded-t-[50px] rounded-b-[35px] absolute top-14 left-10 dark:bg-[#212477] z-20 "
            style={{ elevation: 10 }}
          >
            <View className="flex-row justify-between">
              <AntDesign name="like1" size={20} color="#00CA4C" />
              <AntDesign
                name="dislike1"
                size={20}
                color="#B2B2B2"
                style={{ transform: [{ scaleX: -1 }] }}
              />
            </View>
            <Text className="text-right color-[#002D85] text-[20px] font-Yekan font-bold mt-7 dark:color-white ">
              {item?.title}
            </Text>
            <Text className="text-right color-[#777777] text-[15px] font-Yekan my-1 dark:color-white">
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
                  {item?.startDate.substr(0, 10)}
                </Text>
              </View>
            </View>
          </View>
          <ScrollView className="px-2 mt-28 mb-2 h-[46%] z-0">
            <View className=" py-16" />
            <>
              <Text className="text-right color-[#002D85] text-[20px] font-Yekan dark:color-white">
                توضیحات دوره:
              </Text>
              <Text className="color-[#818181] text-[14px] font-Yekan text-right mt-3 mx-4 dark:color-white">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
                کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
                جامعه و متخصصان را می طلبد،تا با نرم‌افزارها شناخت
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
                      ? setModalVisible(true)
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
              <View className="mt-1">
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
              </View>
            </View>
          </ScrollView>
          <View className="">
            <CustomButton
              buttonTitle={
                handelClick() ? "حذف از سبد خرید" : "افزودن به سبد خرید"
              }
              onPress={() => {
                studentModel
                  ? handelClick()
                    ? dispatch(removeItemFromCart(item))
                    : dispatch(addToCart(item))
                  : Toast.show({
                      type: "error",
                      text1:
                        "برای افزودن به سبد خرید لطفا وارد حساب کاربری خود شوید !!",
                    });
              }}
              className="font-Yekan px-8 py-[16] color-white text-[20px] text-center rounded-[30px] "
              style={{
                backgroundColor: handelClick() ? "#E00000" : "#04A641",
              }}
            />
          </View>
        </View>
      )}
      <CustomModal
        visible={modalVisible}
        animationType="slide"
        className2="p-[25] rounded-[30px] h-[94%]"
        className="pt-2"
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ScrollView className="mx-2">
          <View className="items-center my-[70]">
            <Image
              source={
                studentModel && studentModel.profile
                  ? { uri: studentModel.profile }
                  : user
              }
              className="w-[153] h-[153] rounded-[80px]"
            />
            <Text className="font-Gab text-[25px] mt-4 dark:color-white ">
              {studentModel && studentModel.fullName}
            </Text>
          </View>
          <View>
            <TextInput
              className="border border-[#E3E6E8] bg-[#FCFCFC] rounded-[25px] text-right font-Yekan text-[15px] pb-[150] px-5"
              placeholder="متن نظر"
              placeholderTextColor="#707070"
              multiline
              numberOfLines={5}
              onChangeText={(text) => {
                onChangeText(text);
              }}
              value={value}
            />
          </View>
          <View className="flex-row items-center justify-center mt-14">
            <CustomButton
              buttonTitle="بازگشت"
              onPress={() => setModalVisible(!modalVisible)}
              className="border font-Yekan border-[#FF0000] dark:border-white text-center px-10 py-2 color-[#FF0000] dark:color-white text-[16px] rounded-[27px] mx-3 "
            />
            <CustomButton
              buttonTitle="ثبت نظر"
              isLoading={isLoading}
              onPress={() => {
                addComment(value);
                setModalVisible(!modalVisible);
              }}
              className="bg-[#04A641] font-Yekan border border-[#04A641] px-10 py-2 text-center color-white text-[16px] rounded-[27px] mx-3 "
            />
          </View>
        </ScrollView>
      </CustomModal>
    </View>
  );
};

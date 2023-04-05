import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  Pressable,
} from "react-native";
import React, { FC, useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Favorite from "../common/favorite";
import CustomButton from "../common/customButton";
import user from "../../assets/img/comment/user.png";
import {
  commentsAPI,
  addCommentsAPI,
} from "../../core/services/api/comment.api";
import CustomModal from "../common/modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Toast from "react-native-toast-message";
import { commentType } from "../../core/models";
import { addToCart, removeItemFromCart } from "../../redux/features/cart";

interface commentProp {
  userName: string;
  comment: string;
}

const CommentItem: FC<commentProp> = ({ userName, comment }): JSX.Element => {
  console.log("first", comment);
  return (
    <View
      className=" bg-white p-5 rounded-[20px] mx-4 my-2"
      style={{ elevation: 8 }}
    >
      <View className="flex-row-reverse">
        <Image className="rounded-[20px] w-[30] h-[30]" source={user} />
        <Text className="font-Yekan color-[#002D85]">{userName} </Text>
      </View>
      <Text className="font-Yekan color-[#999999] text-[13px] pt-1 pr-1">
        {comment}
      </Text>
    </View>
  );
};

const CourseDetailsPage: FC = (): JSX.Element => {
  const { studentModel }: any = useSelector((state: RootState) => state.user);

  const state: any = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch();

  const route = useRoute<any>();

  const { item } = route.params;

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [data, setData] = useState<any>([]);

  const [value, setValue] = useState<any>();

  const loadComments = async () => {
    const comment: any = await commentsAPI();
    const result = comment?.filter(
      (it: { postId: string }) => it?.postId === item?._id
    );
    setData(result);
    console.log(data);
  };
  const addComment = async (value: string) => {
    const commentObj: commentType = {
      postId: item?._id,
      email: studentModel?.email,
      username: studentModel?.fullName,
      comment: value,
    };
    const response: any = await addCommentsAPI(commentObj);

    setData([...data, response]);
    Toast.show({
      type: "success",
      text1: "نظر شما با موفقیت ثبت شد :)",
      text2: "ممنون از همکاری شما :)",
    });
    console.log(data);
  };

  const handelClick = () => {
    return state?.some((s: { _id: string }) => s._id === item._id);
  };

  useEffect(() => {
    loadComments();
    console.log(data);
  }, []);


  console.log('gbg',state)

  return (
    <>
      <View className="bg-[#4F91FF] w-[100%] h-[260] rounded-b-[40px] z-0 relative "></View>
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
            className="bg-white p-5 mx-4 rounded-t-[50px] rounded-b-[35px] top-[-65] "
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
            <Text className="text-right color-[#002D85] text-[20px] font-Yekan font-bold mt-7 ">
              {item?.title}
            </Text>
            <Text className="text-right color-[#777777] text-[15px] font-Yekan my-1">
              {item?.teacher?.fullName}
            </Text>
            <View className="border-t border-dashed border-[#C8C8C8] mt-3 pt-3">
              <View className="flex-row justify-between">
                <View className="py-[3] bg-[#F6F9FF] border border-[#B6C7E7] rounded-[18px] flex-row-reverse justify-between w-[49%] px-2 ">
                  <Text className="text-right color-[#8F8F8F] text-[16px] font-Yekan my-1">
                    دانشجو:
                  </Text>
                  <Text className="text-right color-[#3D5FA2] text-[16px] font-Yekan my-1">
                    23 نفر
                  </Text>
                </View>
                <View className="py-[3] bg-[#F6F9FF] border border-[#B6C7E7] rounded-[18px] flex-row-reverse justify-between w-[49%] px-2">
                  <Text className="text-right color-[#8F8F8F] text-[16px] font-Yekan my-1">
                    ظرفیت:
                  </Text>
                  <Text className="text-right color-[#3D5FA2] text-[16px] font-Yekan my-1">
                    95نفر
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
          <View className="top-[-40]">
            <>
              <Text className="text-right color-[#002D85] text-[20px] font-Yekan">
                توضیحات دوره:
              </Text>
              <Text className="color-[#818181] text-[14px] font-Yekan text-right mt-3 mx-4">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
                کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
                جامعه و متخصصان را می طلبد،تا با نرم‌افزارها شناخت
              </Text>
            </>
            <View className="mt-10">
              <View className="flex-row-reverse justify-between mb-2 ">
                <Text className="text-right color-[#002D85] text-[20px] font-Yekan">
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
              <View className="h-[85]">
                <FlatList
                  data={data}
                  renderItem={({ item }: any) => (
                    <CommentItem
                      userName={item?.username}
                      comment={item?.comment}
                    />
                  )}
                />
              </View>
            </View>
          </View>
          <View className="top-[-35]">
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
        className2="p-[25] rounded-[30px]"
        className="p-9 blur-3xl"
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="mx-2">
          <View className="items-center my-[70]">
            <Image
              source={
                studentModel && studentModel.profile
                  ? { uri: studentModel.profile }
                  : user
              }
              className="w-[153] h-[153] rounded-[80px]"
            />
            <Text className="font-Gab text-[25px] mt-4 ">
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
              value={value}
            />
          </View>
          <View className="flex-row items-center justify-center mt-10 mb-5">
            <CustomButton
              buttonTitle="بازگشت"
              onPress={() => setModalVisible(!modalVisible)}
              className="border font-Yekan border-[#FF0000] text-center px-10 py-2 color-[#FF0000] text-[16px] rounded-[27px] mx-3 "
            />
            <CustomButton
              buttonTitle="ثبت نظر"
              onPress={() => {
                addComment(value);
                setModalVisible(!modalVisible);
              }}
              className="bg-[#04A641] font-Yekan border border-[#04A641] px-10 py-2 text-center color-white text-[16px] rounded-[27px] mx-3 "
            />
          </View>
        </View>
      </CustomModal>
    </>
  );
};

export default CourseDetailsPage;

import { View, Text, Image } from "react-native";
import React, { FC, useState } from "react";
import { Form } from "../common/forms";
import { InputText } from "../common/inputText";
import user from "../../assets/img/comment/user.png";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { CustomButton } from "../common/customButton";
import { commentValidation } from "../../core/validation";
import { addCommentsAPI } from "../../core/services/api/comment.api";
import { commentType } from "../../core/models";
import Toast from "react-native-toast-message";

interface commentPropsType {
  comeback: Function;
  closeModal: Function;
  ReFetch: Function;
  postId: string;
}

export const Comment: FC<commentPropsType> = ({
  comeback,
  closeModal,
  ReFetch,
  postId,
}): JSX.Element => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const { studentModel }: any = useSelector((state: RootState) => state.user);

  const onSubmit = async (value: any) => {
    setIsLoading(true);

    const commentObj: commentType = {
      postId: postId,
      email: studentModel?.email,
      username: studentModel?.fullName,
      comment: value?.comment,
    };
    const response: any = await addCommentsAPI(commentObj);

    ReFetch();
    // setReFetch((old) => !old);

    Toast.show({
      type: "success",
      text1: "نظر شما با موفقیت ثبت شد :)",
      text2: "ممنون از همکاری شما :)",
    });

    setIsLoading(false);
    closeModal();
  };
  return (
    <View>
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
      <Form
        initialValues={{ comment: "" }}
        onSubmit={onSubmit}
        enableReinitialize
        validationSchema={commentValidation}
      >
        {({ submitForm }) => (
          <>
            <View>
              <InputText
                name="comment"
                className="border border-[#E3E6E8] bg-[#FCFCFC] rounded-[25px] text-right font-Yekan text-[15px] pb-[150] px-5 w-72"
                placeholder="متن نظر"
                multiline
                numberOfLines={5}
              />
            </View>
            <View className="flex-row items-center justify-center mt-14 mb-1">
              <CustomButton
                buttonTitle="بازگشت"
                onPress={() => comeback()}
                // setModalVisible(!modalVisible)

                className="border font-Yekan border-[#FF0000] dark:border-white text-center px-10 py-2 color-[#FF0000] dark:color-white text-[16px] rounded-[27px] mx-3 "
              />
              <CustomButton
                buttonTitle="ثبت نظر"
                isLoading={isLoading}
                color="white"
                onPress={() => {
                  submitForm();
                  // value && addComment(value);
                }}
                className="bg-[#04A641] border-[#04A641] font-Yekan border px-10 py-2 text-center color-white text-[16px] rounded-[27px] mx-3 "
                loadingClassName="bg-[#04A641] border border-[#04A641] px-12 py-2 rounded-[27px] mx-3 "
              />
            </View>
          </>
        )}
      </Form>
    </View>
  );
};

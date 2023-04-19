import { useNavigation } from "@react-navigation/native";
import React, { useEffect, FC } from "react";
import { Text, View, Image, ImageBackground, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useColorScheme } from "nativewind";

import logo from "../../assets/img/startingPage/logo.png";
import bgBottom from "../../assets/img/startingPage/bgBot.png";
import bgTop from "../../assets/img/startingPage/bgTop.png";
import { getItem } from "../../core/services/storage/storage";
import { EStorageKeys } from "../../core/enums/storage";
import { ERouteList } from "../../core/enums/route";
import { RootState } from "../../redux/store";
import { handelLogin } from "../../redux/features/user";
import { handelTheme } from "../../redux/features/theme";
import { loadCartData } from "../../redux/features/cart";
import { loadFavData } from "../../redux/features/favorite";

const { width, height } = Dimensions.get("screen");

export const SplashScreenPage: FC = (): JSX.Element => {
  const navigation = useNavigation<any>();

  const { setColorScheme } = useColorScheme();

  const { studentModel } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const handelGetItems = async () => {
    const token = await getItem(EStorageKeys.Token);
    const user = await getItem(EStorageKeys.User);
    const theme = await getItem(EStorageKeys.Theme);
    const selectedFav = await getItem(EStorageKeys.SelectedFav);
    const selectedCourse = await getItem(EStorageKeys.SelectedCourse);
    const mode = await getItem(EStorageKeys.Mode);

    setColorScheme(mode);

    dispatch(
      handelLogin({
        token: token,
        model: user,
      })
    );
    theme &&
      dispatch(
        handelTheme({
          theme: theme,
        })
      );
    dispatch(loadCartData(selectedCourse));
    dispatch(loadFavData(selectedFav));
  };

  useEffect(() => {
    handelGetItems();
    setTimeout(() => {
      if (studentModel) {
        navigation.replace(ERouteList.Courses);
      } else {
        navigation.replace(ERouteList.Start);
      }
    }, 4000);
  }, []);

  return (
    <View className="flex justify-content bg-white dark:bg-[#00216C] ">
      <ImageBackground
        source={bgTop}
        style={{
          width: "95%",
          height: "95%",
          position: "absolute",
          top: -height / 2,
          right: -width / 3.1,
        }}
        resizeMode="contain"
      />
      <ImageBackground
        source={bgBottom}
        style={{
          position: "absolute",
          width: "123%",
          height: "123%",
          bottom: -height / 6,
          left: -width / 1.32,
        }}
        resizeMode="contain"
      />
      <View style={{ height: 880, marginTop: 250 }}>
        <View className="flex justify-center justify-between">
          <Image className="border mx-auto mt-14 mb-1" source={logo} />
          <Text className="text-3xl font-Yekan font-light text-center pt-5 color-[#00469A] dark:color-white">
            آکادمی کدنویسی بحر
          </Text>
        </View>
      </View>
    </View>
  );
};

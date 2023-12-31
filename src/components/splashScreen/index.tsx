import { useNavigation } from "@react-navigation/native";
import React, { useEffect, FC } from "react";
import { Text, View, Image, ImageBackground, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useColorScheme } from "nativewind";
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

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
  const dispatch = useDispatch();
  const { setColorScheme } = useColorScheme();

  const glowAnimation = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withRepeat(
          withSequence(
            withTiming(1.1, { duration: 1500 }),
            withTiming(0.8, { duration: 1500 })
          ),
          -1,
          true
        ),
      },
    ],
  }));

  const handelGetItems = async () => {
    const token = await getItem(EStorageKeys.Token);
    const user = await getItem(EStorageKeys.User);
    const UserData = await getItem(EStorageKeys.UserData);
    const theme = await getItem(EStorageKeys.Theme);
    const mode = await getItem(EStorageKeys.Mode);

    setColorScheme(mode);
    console.log("user", user);

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
    if (UserData) {
      dispatch(loadCartData(UserData[user?._id]?.cart));
      dispatch(loadFavData(UserData[user?._id]?.favorite));
    }
    setTimeout(() => {
      if (user) {
        navigation?.replace(ERouteList?.MyDrawer, {
          screen: ERouteList?.DrawerTab,
          params: { screen: ERouteList?.CourseTab },
        });
      } else {
        navigation?.replace(ERouteList?.Start);
      }
    }, 4000);
  };

  useEffect(() => {
    handelGetItems();
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
        <View className="flex justify-center ">
          <Animated.View
            className="justify-center items-center"
            style={[glowAnimation]}
          >
            <Image className="border mx-auto mt-14 mb-1" source={logo} />
          </Animated.View>
          <Text className="text-3xl font-Yekan font-light text-center pt-5 color-[#00469A] dark:color-white">
            آکادمی کدنویسی بحر
          </Text>
        </View>
      </View>
    </View>
  );
};

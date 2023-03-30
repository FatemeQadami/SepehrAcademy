import { Link, useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Text, View, Image, ImageBackground, Dimensions } from "react-native";
import logo from "../../assets/img/startingPage/logo.png";
import bgBottom from "../../assets/img/startingPage/bgBot.png";
import bgTop from "../../assets/img/startingPage/bgTop.png";

const { width, height } = Dimensions.get("screen");

const StartPage = (props: any) => {
  const navigation = useNavigation<any>();
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("PreStart");
    }, 3000);
  }, []);

  return (
    <View className="flex justify-content bg-white">
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
          <Text className="text-3xl font-Yekan font-light text-center pt-5 color-[#00469A]">
            آکادمی کدنویسی بحر
          </Text>
        </View>
      </View>
    </View>
  );
};

export default StartPage;

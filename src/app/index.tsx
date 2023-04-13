import { StatusBar } from "expo-status-bar";
import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { Provider } from "react-redux";

import { Navigation } from "../navigation";
import { store } from "../redux/store";

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderColor: "green", borderRightWidth: 6, borderLeftWidth: 0 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
        fontFamily: "YekanBakh",
      }}
      text2Style={{
        fontSize: 15,
        fontWeight: "400",
        fontFamily: "YekanBakh",
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderColor: "red", borderRightWidth: 6, borderLeftWidth: 0 }}
      text1Style={{
        fontWeight: "400",
        fontSize: 15,
        fontFamily: "YekanBakh",
      }}
    />
  ),
};

const App: FC = (): JSX.Element => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar />
        <Navigation />
      </NavigationContainer>
      <Toast config={toastConfig} />
    </Provider>
  );
};
export default App;

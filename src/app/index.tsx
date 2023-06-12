import { StatusBar } from "expo-status-bar";
import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { Provider } from "react-redux";
import { I18nManager} from 'react-native';

import { Navigation } from "../navigation";
import { store } from "../redux/store";

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderColor: "green", borderRightWidth: 6, borderLeftWidth: 0 }}
      text1Style={{
        fontSize: 13,
        fontWeight: "400",
        fontFamily: "YekanBakh",
        color:"black"
      }}
      text2Style={{
        fontSize: 13,
        fontWeight: "400",
        fontFamily: "YekanBakh",
        color:"black"
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderColor: "red", borderRightWidth: 6, borderLeftWidth: 0 }}
      text1Style={{
        fontWeight: "400",
        fontSize: 13,
        fontFamily: "YekanBakh",
        color:"black"
      }}
      text2Style={{
        fontSize: 13,
        fontWeight: "400",
        fontFamily: "YekanBakh",
        color:"black"
      }}
    />
  ),
};

const App: FC = (): JSX.Element => {
  try { 
    I18nManager.allowRTL(false);
} 
catch (e) {
    console.log(e);
}
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

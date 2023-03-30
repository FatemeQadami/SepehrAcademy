import React, { FC } from "react";

import { Text, View } from "react-native";
import AuthLayout from "../../../components/authentication";

const Login: FC = (): JSX.Element => {
  return (
    <View>
      <AuthLayout pageTitle="ورود" formBox="login" />
    </View>
  );
};

export default Login;

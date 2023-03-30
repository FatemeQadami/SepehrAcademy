import React, { FC } from "react";
import { Text } from "react-native";
import Navbar from "../../components/common/navbar";
import SettingPage from "../../components/settings";

const Settings: FC = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <SettingPage />
    </>
  );
};

export default Settings;

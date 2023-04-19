import React, { FC } from "react";

import { Header } from "../../components/common/header";
import { SettingPage } from "../../components/settings";

const Settings: FC = (): JSX.Element => {
  return (
    <>
      <Header />
      <SettingPage />
    </>
  );
};

export default Settings;

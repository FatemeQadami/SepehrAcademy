import React, { FC } from "react";

import { Navbar } from "../../components/common/navbar";
import { SettingPage } from "../../components/settings";

const Settings: FC = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <SettingPage />
    </>
  );
};

export default Settings;

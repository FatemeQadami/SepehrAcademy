import React, { FC } from "react";

import { Header } from "../../components/common/header";
import { EditProfilePage } from "../../components/editProfile";

const EditProfile: FC = (): JSX.Element => {
  return (
    <>
      <Header />
      <EditProfilePage />
    </>
  );
};

export default EditProfile;

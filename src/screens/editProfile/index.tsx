import React, { FC } from "react";

import { Navbar } from "../../components/common/navbar";
import { EditProfilePage } from "../../components/editProfile";

const EditProfile: FC = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <EditProfilePage />
    </>
  );
};

export default EditProfile;

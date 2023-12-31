import React, { FC } from "react";

import { AuthLayout } from "../../../components/authentication";

const Forgetpass: FC = (): JSX.Element => {
  return <AuthLayout pageTitle="بازیابی رمز عبور" formBox="forgetpass" />;
};

export default Forgetpass;

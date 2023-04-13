import React, { FC } from "react";

import { AuthLayout } from "../../../components/authentication";

const SignUp: FC = (): JSX.Element => {
  return <AuthLayout pageTitle="ثبت نام" formBox="signUp" />;
};

export default SignUp;

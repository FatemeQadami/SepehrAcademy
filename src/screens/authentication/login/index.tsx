import React, { FC } from "react";

import { AuthLayout } from "../../../components/authentication";

const Login: FC = (): JSX.Element => {
  return (
    <>
      <AuthLayout pageTitle="ورود" formBox="login" />
    </>
  );
};

export default Login;

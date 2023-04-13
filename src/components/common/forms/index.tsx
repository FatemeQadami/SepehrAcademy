import { View } from "react-native";
import React, { FC } from "react";
import { Formik } from "formik";
import { FormikProps } from "formik/dist/types";

interface IFormProp {
  initialValues: any;
  onSubmit: (values: any) => void | Promise<any>;
  enableReinitialize: boolean;
  validationSchema: any;
  children: (form: FormikProps<any>) => JSX.Element;
}

export const Form: FC<IFormProp> = ({
  initialValues,
  onSubmit,
  enableReinitialize,
  validationSchema,
  children,
}): JSX.Element => {
  return (
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={enableReinitialize}
        validationSchema={validationSchema}
      >
        {children}
      </Formik>
    </View>
  );
};

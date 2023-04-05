import * as Yup from "yup";

function isValidIranianNationalId(input: any) {
  if (!/^\d{10}$/.test(input)) return false;

  var check = +input[9];
  var sum = 0;
  var i;
  for (i = 0; i < 9; ++i) {
    sum += +input[i] * (10 - i);
  }
  sum %= 11;

  return (sum < 2 && check === sum) || (sum >= 2 && check + sum === 11);
}

export const LoginValidation = Yup.object().shape({
  email: Yup.string()
    .email("ایمیل به درستی وارد نشده‌است!!!")
    .required("پر کردن فیلد الزامیست"),

  password: Yup.string()
    .required("پر کردن فیلد الزامیست")
    .min(8, "تعداد کراکتر پسورد کافی نیست")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "پسورد باید شامل A-Z,a-z,0-9 و @$!%*?& باشد"
    ),
});

export const forgetpassValidation = Yup.object().shape({
  email: Yup.string()
    .email("ایمیل به درستی وارد نشده‌است!!!")
    .required("پر کردن فیلد الزامیست"),
});

export const signUp1Validation = Yup.object().shape({
  fullName: Yup.string()
    .required("پر کردن فیلد الزامیست")
    .min(3, "تعدادکاراکترهای نام صحیح نمیباشد")
    .matches(/^[a-zA-Z\s\u0600-\u06FF]+$/, "لطفا نام خود را صحیح وارد کنید!!!"),

  nationalId: Yup.string()
    .required("پر کردن فیلد الزامیست")
    .test("nationalId", "کدملی وارد شده نامعتبر است!!!", (value) =>
      isValidIranianNationalId(value)
    )
    .typeError("لطفا کدملی را صحیح وارد کنید"),
  phoneNumber: Yup.string()
    .required("پر کردن فیلد الزامیست")
    .matches(
      /09(1[0-9]|3[1-9])-?[0-9]{3}-?[0-9]{4}/,
      "لطفا شماره خود را صحیح وارد کنید"
    ),
});

export const signUp2Validation = Yup.object().shape({
  email: Yup.string()
    .email("ایمیل به درستی وارد نشده‌است!!!")
    .required("پر کردن فیلد الزامیست"),

  birthDate: Yup.string().required("پر کردن فیلد الزامیست"),

  password: Yup.string()
    .required("پر کردن فیلد الزامیست")
    .min(8, "تعداد کراکتر پسورد کافی نیست")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "پسورد باید شامل A-Z,a-z,0-9 و @$!%*?& باشد"
    ),
});

export const validationReset = Yup.object().shape({
  password: Yup.string()
    .required("پر کردن فیلد الزامیست")
    .min(8, "تعداد کراکتر پسورد کافی نیست")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "پسورد باید شامل A-Z,a-z,0-9 و @$!%*?& باشد"
    ),
  passwordConfirm: Yup.string()
    .required("پر کردن فیلد الزامیست")
    .min(8, "تعداد کراکتر پسورد کافی نیست")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "پسورد باید شامل A-Z,a-z,0-9 و @$!%*?& باشد"
    )
    .test("password", "رمز عبور مطابقت ندارد!!!", function (item) {
      return this.parent.password === item;
    }),
});

export const profileValidation = Yup.object().shape({
  fullName: Yup.string()
    .required("پر کردن فیلد الزامیست")
    .min(3, "تعدادکاراکترهای نام صحیح نمیباشد")
    .matches(/^[a-zA-Z\s\u0600-\u06FF]+$/, "لطفا نام خود را صحیح وارد کنید!!!"),

  // NationalCode: Yup.string()
  //   .required("پر کردن فیلد الزامیست")
  //   .test("NationalCode", "کدملی وارد شده نامعتبر است!!!", (value) =>
  //   isValidIranianNationalCode(value)
  //   )
  //   .typeError("لطفا کدملی را صحیح وارد کنید"),

  birthDate: Yup.string().required("پر کردن فیلد الزامیست"),

  phoneNumber: Yup.string()
    .required("پر کردن فیلد الزامیست")
    .matches(
      /09(1[0-9]|3[1-9])-?[0-9]{3}-?[0-9]{4}/,
      "لطفا شماره خود را صحیح وارد کنید"
    ),

  upload: Yup.mixed().nullable().optional(),
});

export interface loginType {
  email: string;
  password: string;
}
export interface signUpType {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: number | string;
  birthDate: string;
  nationalId: number | string | undefined;
}

export interface forgetPassType {
  email: string;
}

export interface editProfileType {
  fullName: string;
  phoneNumber: number | string;
  birthDate: string;
  nationalId: number | string | undefined;
  email: string | undefined;
  profile?: any | null | undefined;
}

export interface resetPassType {
  password: string;
}

export interface commentType {
  postId: string;
  email: string;
  username: string;
  comment: string;
}

export interface idType {
  courseId: number;
  userId: number;
}

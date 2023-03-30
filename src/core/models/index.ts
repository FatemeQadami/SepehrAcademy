export interface loginType {
  email: string;
  password: string;
}

export interface signUpType {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: number;
  birthDate: string;
  nationalId: number;
}

export interface forgetPassType {
  email: string;
}

export interface editProfileType {
  fullName: string;
  phoneNumber: number;
  birthDate: string;
  nationalId: number;
  profile?: string | undefined;
}

export interface resetPassType {
  password: string;
}


export interface commentType {
  postId:string
  email: string;
  username: string;
  comment: string;
}
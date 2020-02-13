import { RememberMeOption, UserProfile } from "userbase-js";

export interface ISignupDto {
  username: string;
  password: string;
  email: string;
  profile?: UserProfile;
  rememberMe?: RememberMeOption
}
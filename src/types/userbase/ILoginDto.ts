import { RememberMeOption } from "userbase-js";

export interface ILoginDto {
  username: string;
  password: string;
  rememberMe: RememberMeOption;
}
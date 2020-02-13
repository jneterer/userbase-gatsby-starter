import { UserProfile } from "userbase-js";

export interface IUpdateAccountInfoDto {
  username: string;
  currentPassword?: string;
  newPassword?: string;
  email?: string;
  profile?: UserProfile;
}
const userbase = typeof window !== 'undefined' ? require('userbase-js').default : null;

export interface IUpdateAccountInfoDto {
  username: string;
  currentPassword?: string;
  newPassword?: string;
  email?: string;
  profile?: userbase.UserProfile;
}
const userbase = typeof window !== 'undefined' ? require('userbase-js').default : null;

export interface ISignupDto {
  username: string;
  password: string;
  email: string;
  profile?: userbase.UserProfile;
  rememberMe?: userbase.RememberMeOption
}
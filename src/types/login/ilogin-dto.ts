const userbase = typeof window !== 'undefined' ? require('userbase-js').default : null;

export interface ILoginDto {
  username: string;
  password: string;
  rememberMe: userbase.RememberMeOption;
}
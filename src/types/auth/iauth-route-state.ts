import { ComponentClass } from "react"
const userbase = typeof window !== 'undefined' ? require('userbase-js').default : null;

export interface IAuthRouteState {
  user: userbase.UserResult;
  isLoading: boolean;
  page: ComponentClass;
}
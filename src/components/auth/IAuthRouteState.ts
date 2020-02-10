import { ComponentClass } from "react"
import { UserResult } from "userbase-js"

export interface IAuthRouteState {
  user: UserResult;
  isLoading: boolean;
  page: ComponentClass;
}
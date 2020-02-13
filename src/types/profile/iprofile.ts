import { UserResult } from "userbase-js";
import { Form } from "../forms/Form";

export interface IProfileState {
  user: UserResult
  accountInfoForm: Form;
  accountInfoFormSuccess: boolean;
  accountInfoFormError: string;
  changePasswordForm: Form;
  changePasswordFormSuccess: boolean;
  changePasswordFormError: string;
  deleteAccountRequested: boolean;
  deleteAccountSuccess: boolean;
  deleteAccountError: string;
}
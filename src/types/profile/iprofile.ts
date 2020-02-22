const userbase = typeof window !== 'undefined' ? require('userbase-js').default : null;
import { Form } from "../forms/Form";

export interface IProfileState {
  user: userbase.UserResult
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
import { UserResult } from "userbase-js";
import { Form } from "../../types/forms/Form";

export interface IProfileForms {
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
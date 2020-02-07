import { IForm } from "../../types/iform";
import { IFormField } from "../../types/iform-field";

export interface IForgotPasswordForm extends IForm {
  formFields: {
    email: IFormField;
  };
}
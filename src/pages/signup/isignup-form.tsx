import { IForm } from "../../types/iform";
import { IFormField } from "../../types/iform-field";

export interface ISignupForm extends IForm {
  formFields: {
    firstName: IFormField;
    lastName: IFormField;
    email: IFormField;
    password: IFormField;
    confirmPassword: IFormField;
  };
}
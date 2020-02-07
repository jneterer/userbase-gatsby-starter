import { IForm } from "../../types/iform";
import { IFormField } from "../../types/iform-field";

export interface ILoginForm extends IForm {
  formFields: {
    email: IFormField;
    password: IFormField;
  };
}
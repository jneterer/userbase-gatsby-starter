import { Form } from "../../types/forms/Form";

export interface IForgotPasswordForm {
  forgotPasswordForm: Form;
  emailSent: boolean;
  submissionError: string;
}
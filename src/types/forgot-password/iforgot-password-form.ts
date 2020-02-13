import { Form } from "../forms/Form";

export interface IForgotPasswordState {
  forgotPasswordForm: Form;
  emailSent: boolean;
  submissionError: string;
}
import { Validators } from "./Validators";

export interface IFormField {
  name: string;
  value: string;
  changed: boolean;
  touched: boolean;
  error: Validators;
  matchFormField: string;
  validators: Validators[];
  valid: boolean;
}
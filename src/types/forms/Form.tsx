import { FormField } from "./FormField";
import { Validators } from "./Validators";

export class Form {
  private formFields: object = {};
  private submitted: boolean;

  constructor(formFields: FormField[]) {
    formFields.forEach((formField: FormField) => this.formFields[formField.getName()] = formField );
    this.submitted = false;
  }

  /**
   * Sets the submitted property on the form given the new value.
   * Also checks all the form fields' validity and updates accordingly.
   * @param {boolean} value The value we wish to set the submitted property on the form.
   */
  setSubmitted(value: boolean): void {
    this.submitted = value;
    Object.keys(this.formFields).forEach((formFieldName: string) => {
      this.checkFormFieldValidity(formFieldName);
    });
  }

  /**
   * Gets a form field from the form given the form field name.
   * @param {string} formFieldName The name of the form field we wish to retrieve.
   * @returns {FormField}
   */
  getFormField(formFieldName: string): FormField {
    if (this.formFields.hasOwnProperty(formFieldName)) {
      return this.formFields[formFieldName];
    }
    throw TypeError(`No form field exists on the form named ${formFieldName}.`);
  }

  /**
   * Sets a new value for a form field given the form field name and new value.
   * Also checks the form field's validity and updates accordingly.
   * @param {string} formFieldName The name of the form field we wish to set a new value to.
   * @param {string} value The value we wish to set the form field's value property to.
   */
  setFormFieldValue(formFieldName: string, value: string): void {
      this.getFormField(formFieldName).setValue(value);
      this.checkFormFieldValidity(formFieldName);
  }

  /**
   * Sets a new touched value for a form field given the form field name and new value.
   * Also checks the form field's validity and updates accordingly.
   * @param {string} formFieldName The name of the form field we wish to set a new touched value to.
   * @param {boolean} value The value we wish to set the form field's touched property to.
   */
  setFormFieldTouched(formFieldName: string, value: boolean): void {
    this.getFormField(formFieldName).setTouched(value);
    this.checkFormFieldValidity(formFieldName);
  }

  /**
   * Checks the validity of a form field given the form field name.
   * @param {string} formFieldName The name of the form field we wish to check its validity.
   */
  checkFormFieldValidity(formFieldName: string): void {
    let formField: FormField = this.getFormField(formFieldName);
    const includesRequired: boolean = formField.getValidators().includes(Validators.required);
    const includesMatchForField: boolean = formField.getValidators().includes(Validators.matchFormField);
    if (includesRequired && includesMatchForField) {
      formField.checkFormFieldValidity(this.submitted, this.getFormField(formField.getMatchFormField()).getValue());
    } else if (includesRequired) {
      formField.checkFormFieldValidity(this.submitted);
    } else if (includesMatchForField) {
      formField.checkFormFieldValidity(null, this.getFormField(formField.getMatchFormField()).getValue());
    } else {
      formField.checkFormFieldValidity();
    }
  }

}
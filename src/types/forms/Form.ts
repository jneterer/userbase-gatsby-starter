import { FormField } from "./FormField";
import { IForm } from "./IForm";
import { Validators } from "./Validators";

export class Form {
  private formFields: object = {};
  private properties: IForm = {
    changed: false,
    valid: true,
    submitted: false
  };

  constructor(formFields: FormField[]) {
    formFields.forEach((formField: FormField) => this.formFields[formField.name] = formField );
  }

  /**
   * Gets and returns the changed property of the form.
   * @returns {boolean} Returns true if any of the form fields have changed.
   */
  get changed(): boolean {
    return this.properties.changed;
  }

  /**
   * Gets and returns the valid property of the form.
   * @returns {boolean} Returns true if the form is valid and false if the form is invalid.
   */
  get valid(): boolean {
    return this.properties.valid;
  }

  /**
   * Gets and returns the submitted property of the form.
   * @returns {boolean} Returns true if the form has been submitted.
   */
  get submitted(): boolean {
    return this.properties.submitted;
  }

  /**
   * Sets the submitted property on the form given the new value.
   * Also checks all the form fields' validity and updates accordingly.
   * @param {boolean} value The value we wish to set the submitted property on the form.
   */
  setSubmitted(value: boolean): void {
    this.properties.submitted = value;
    Object.keys(this.formFields).forEach((formFieldName: string) => {
      this.checkFormFieldValidity(formFieldName);
    });
    this.checkFormIsValid();
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
    this.properties.changed = true;
    this.getFormField(formFieldName).setValue(value);
    this.checkFormFieldValidity(formFieldName);
    this.checkFormIsValid();
  }

  /**
   * Sets a new touched value for a form field given the form field name and new value.
   * Also checks the form field's and form's validity and updates accordingly.
   * @param {string} formFieldName The name of the form field we wish to set a new touched value to.
   * @param {boolean} value The value we wish to set the form field's touched property to.
   */
  setFormFieldTouched(formFieldName: string, value: boolean): void {
    this.getFormField(formFieldName).setTouched(value);
    this.checkFormFieldValidity(formFieldName);
    this.checkFormIsValid();
  }

  /**
   * Checks the validity of a form field given the form field name.
   * @param {string} formFieldName The name of the form field we wish to check its validity.
   */
  private checkFormFieldValidity(formFieldName: string): void {
    let formField: FormField = this.getFormField(formFieldName);
    const includesRequired: boolean = formField.validators.includes(Validators.required);
    const includesMatchForField: boolean = formField.validators.includes(Validators.matchFormField);
    if (includesRequired && includesMatchForField) {
      formField.checkFormFieldValidity(this.submitted, this.getFormField(formField.matchFormFieldProperty).value);
    } else if (includesRequired) {
      formField.checkFormFieldValidity(this.submitted);
    } else if (includesMatchForField) {
      formField.checkFormFieldValidity(null, this.getFormField(formField.matchFormFieldProperty).value);
    } else {
      formField.checkFormFieldValidity();
    }
  }

  /**
   * Filters the form fields for any that may be invalid. Sets the valid property accordingly.
   */
  private checkFormIsValid() {
    this.properties.valid = Object.keys(this.formFields).filter((formFieldName: string) => {
      return !this.getFormField(formFieldName).valid
    }).length === 0;
  }

  /**
   * Resets the form back to its original state.
   */
  resetForm(): void {
    Object.keys(this.formFields).forEach((formFieldName: string) => {
      this.getFormField(formFieldName).resetFormField();
    });
    this.properties = {
      changed: false,
      valid: true,
      submitted: false
    };
  }

}
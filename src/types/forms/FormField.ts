import { IFormField } from './IFormField';
import { Validators } from "./Validators";

export class FormField {
  private properties: IFormField = {
    name: '',
    value: '',
    changed: false,
    touched: false,
    error: Validators.none,
    matchFormField: null,
    validators: [Validators.none],
    valid: true
  };

  constructor(name: string, value: string, validators: Validators[] = [Validators.none], matchFormField: string = null, changed: boolean = false, touched: boolean = false, error: Validators = Validators.none, valid: boolean = true) {
    this.properties.name = name;
    this.properties.value = value;
    this.properties.changed = changed;
    this.properties.touched = touched;
    this.properties.error = error;
    this.properties.matchFormField = matchFormField;
    this.properties.validators = validators;
    this.properties.valid = valid;
  }

  /**
   * Gets the name property from the form field.
   * @returns {string}
   */
  get name(): string {
    return this.properties.name;
  }

  /**
   * Gets the value property from the form field.
   * @returns {string}
   */
  get value(): string {
    return this.properties.value;
  }

  /**
   * Gets the error property from the form field.
   * @returns {Validators}
   */
  get error(): Validators {
    return this.properties.error;
  }

  /**
   * Gets the matchFormField property from the form field.
   * @returns {string}
   */
  get matchFormFieldProperty(): string {
    return this.properties.matchFormField;
  }

  /**
   * Get the validators property from the form field.
   * @returns {Validators[]}
   */
  get validators(): Validators[] {
    return this.properties.validators;
  }

  /**
   * Gets and returns the valid property of the form field.
   * @returns {boolean} Returns true if the form field is valid and false if the form field is invalid.
   */
  get valid(): boolean {
    return this.properties.valid;
  }

  /**
   * Updates the value of the form field and also the changed property since the form field has changed.
   * @param {string} value The new value of the form field.
   */
  public setValue(value: string): void {
    this.updateFormFieldProperty('value', value);
    this.updateFormFieldProperty('changed', true);
  }

  /**
   * Updates the touched property of the form field.
   * @param value The new value for the touched property of the form field.
   */
  public setTouched(value: boolean): void {
    this.updateFormFieldProperty('touched', value);
  }

  /**
   * Updates a property on the form field with a given value.
   * @param {keyof IFormFIeld} property The property name we would like to update on the form field
   * @param value The value we would like to update for the property on the form field.
   */
  private updateFormFieldProperty(property: keyof IFormField, value: (string | boolean )): void {
    this.properties = Object.assign({}, {
      ...this.properties,
      [property]: value
    });
  }

  /**
   * Checks the validity of the form field.
   * @param formSubmitted Whether the form has been submitted or not.
   * @param matchFormFieldValue The value of the form this form field must match, if that is a required validator for this form field.
   */
  checkFormFieldValidity(formSubmitted?: boolean, matchFormFieldValue?: string): void {
    this.properties.validators.some((validator: Validators) => {
      if (validator === Validators.none) {
        this.setFormFieldValidity(true, Validators.none);
        return true;
      } else if (validator === Validators.required) {
        const requiredValid: boolean = this.checkRequiredValid(formSubmitted);
        if (!requiredValid) {
          this.setFormFieldValidity(false, Validators.required);
          return true;
        } else {
          this.setFormFieldValidity(true, Validators.none);
        }
      } else if (validator === Validators.email) {
        const emailValid: boolean = this.checkEmailValid();
        if (!emailValid) {
          this.setFormFieldValidity(false, Validators.email);
          return true;
        } else {
          this.setFormFieldValidity(true, Validators.none);
        }
      }
      else if (validator === Validators.matchFormField) {
        const matchValid: boolean = this.checkMatchValid(matchFormFieldValue);
        if (!matchValid) {
          this.setFormFieldValidity(false, Validators.matchFormField);
          return true;
        } else {
          this.setFormFieldValidity(true, Validators.none);
        }
      }
      this.properties.valid = true;
      return false;
    });
  }

  /**
   * Checks if a required form field is valid.
   * @param {boolean} formSubmitted Whether the form has been submitted or not.
   * @returns {boolean} Returns true if the form field's required validator is valid.
   */
  private checkRequiredValid(formSubmitted: boolean): boolean {
    return !formSubmitted || (formSubmitted && this.properties.value !== '');
  }

  /**
   * Checks if the form field of type email is valid.
   * @returns {boolean} Returns true if the form field's email validator is valid.
   */
  private checkEmailValid(): boolean {
    return (!this.properties.touched && !this.properties.changed) || 
      (this.properties.touched && !this.properties.changed) || 
      (!this.properties.touched && this.properties.changed && !this.properties.value.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) !== null) ||
      (this.properties.touched && this.properties.changed && this.properties.value.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) !== null);
  }

  /**
   * Checks if the form field matches the form field it should equal.
   * @param {string} matchFormFieldValue The value of the form field that this form field must match.
   * @returns {boolean} Returns true if the form field matches the form field it should equal.
   */
  private checkMatchValid(matchFormFieldValue: string): boolean {
    return !(this.properties.touched && this.properties.changed && this.properties.value !== matchFormFieldValue);
  }

  /**
   * 
   * @param {boolean} valid The new value for the valid property on the form field.
   * @param {Validators} error The new value for the error property on the form field.
   */
  private setFormFieldValidity(valid: boolean, error: Validators): void {
    this.properties.valid = valid;
    this.properties.error = error;
  }

  /**
   * Resets the form field back to its original state. This will overwrite any initial default
   * value for the form field but persist the validators and name.
   */
  resetFormField(): void {
    this.properties = {
      ...this.properties,
      value: '',
      changed: false,
      touched: false,
      error: Validators.none,
      valid: true
    };
  }

}
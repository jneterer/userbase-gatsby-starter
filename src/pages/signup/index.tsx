import React, { SyntheticEvent, FormEvent, ChangeEvent } from "react";
import { Link } from "gatsby";

// Components
import Layout from "../../components/layout";
import SEO from "../../components/seo";

// Types
import { IFormField } from "../../types/iform-field";
import { ISignupForm } from "./isignup-form";

class Signup extends React.Component<{}, ISignupForm> {
  constructor(props) {
    super(props);
    this.state = {
      formFields: {
        firstName: {
          name: 'firstName',
          value: ''
        },
        lastName: {
          name: 'lastName',
          value: ''
        },
        email: {
          name: 'email',
          value: ''
        },
        password: {
          name: 'password',
          value: ''
        },
        confirmPassword: {
          name: 'confirmPassword',
          value: ''
        }
      },
      submitted: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBlurEvent = this.handleBlurEvent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Gets a property value of a form field given its name.
   * @param {string} formFieldName The name of the form field.
   * @param {string} [property=value] The property we want to retrieve from the form field by default set as value.
   * @returns {string}
   */
  getFormFieldProperty(formFieldName: string, property: keyof IFormField = 'value') {
    return this.state.formFields[formFieldName][property];
  }

  /**
   * Checks if a required form field is invalid given its name.
   * @param {string} formFieldName The name of the form field.
   * @returns {boolean} Returns true if the form has been submitted and the form field is still blank.
   */
  checkRequiredInvalid(formFieldName: string) {
    return this.state.submitted && this.getFormFieldProperty(formFieldName) === '';
  }

  /**
   * Checks if a form field of type email is invalid given its name.
   * @param {string} formFieldName The name of the form field.
   * @returns {boolean} Returns true if the form field is not already invalid, has been touched (focused on and then blurred), changed, and does not match the email regex pattern.
   */
  checkEmailInvalid(formFieldName: string) {
    return !this.checkRequiredInvalid(formFieldName) && this.getFormFieldProperty(formFieldName, 'touched') && this.getFormFieldProperty(formFieldName, 'changed') && !this.getFormFieldProperty(formFieldName).match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
  }

  /**
   * Checks if the confirm password form field matches the password form field.
   * @param {string} formFieldName The name of the form field.
   * @returns {boolean} Returns true if the form field field is not currently invalid, has been touched (focused on and then blurred), changed, and does not equal the password form field.
   */
  checkPasswordsMatch(passFormFieldName: string, confirmPass2FormFieldName) {
    return !this.checkRequiredInvalid(confirmPass2FormFieldName) && (this.getFormFieldProperty(confirmPass2FormFieldName, 'touched') && this.getFormFieldProperty(confirmPass2FormFieldName, 'changed') && this.getFormFieldProperty(passFormFieldName) !== this.getFormFieldProperty(confirmPass2FormFieldName));
  }

  /**
   * Updates the form value in the state.
   * @param {React.FormEvent<HTMLInputElement>} event 
   */
  handleInputChange(event: React.FormEvent<HTMLInputElement>) {
    event.persist();
    const formField: string = event.currentTarget.id;
    const newFormFieldValue: string = event.currentTarget.value;
      this.setState((state: ISignupForm) => {
        return {
          ...state,
          formFields: {
            ...state.formFields,
            [formField]: {
              ...state.formFields[formField],
              changed: true,
              value: newFormFieldValue
            }
          }
        }
      });
  }

  /**
   * Updates the touch attribute for a form field.
   * @param {React.FocusEvent} event 
   */
  handleBlurEvent(event: React.FocusEvent) {
    event.persist();
    this.setState((state: ISignupForm) => {
      const formField: string = event.target.id;
      return {
        ...state,
        formFields: {
          ...state.formFields,
          [formField]: {
            ...state.formFields[formField],
            touched: true
          }
        }
      }
    });
  }

  /**
   * Signs the user up.
   * @param {React.FormEvent<HTMLFormElement>} event 
   */
  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.setState((state: ISignupForm) => {
      return {
        ...state,
        submitted: true
      }
    });
  }

  render() {
    return (
      <Layout>
        <SEO title="Signup" />
        <div className="w-full max-w-sm mx-auto">
          <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4" onSubmit={this.handleSubmit}>
            <div className="flex justify-center mb-6">
              <h1 className="text-2xl">Sign up for an account</h1>
            </div>
            <div className="mb-4">
              <label htmlFor="firstName">
                First Name
              </label>
              <input id="firstName" type="text" placeholder="First Name" value={this.getFormFieldProperty('firstName')} onChange={this.handleInputChange} />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName">
                Last Name
              </label>
              <input id="lastName" type="text" placeholder="Last Name" value={this.getFormFieldProperty('lastName')} onChange={this.handleInputChange} />
            </div>
            <div className="mb-4">
              <label htmlFor="email">
                Email *
              </label>
              <input id="email" type="text" placeholder="Email" value={this.getFormFieldProperty('email')} onChange={this.handleInputChange} onBlur={this.handleBlurEvent} />
              <p className={`error-msg ${this.checkRequiredInvalid('email') || this.checkEmailInvalid('email') ? 'show' : ''}`}>
                { this.checkRequiredInvalid('email') ? 'This field is required.' : '' }
                { this.checkEmailInvalid('email') ? 'Please provide a valid email address.' : '' }
              </p>
            </div>
            <div className="mb-4">
              <label htmlFor="password">
                Password
              </label>
              <input id="password" type="password" placeholder="******************" value={this.getFormFieldProperty('password')} onChange={this.handleInputChange} />
              <p className={`error-msg ${this.checkRequiredInvalid('password') ? 'show' : ''}`}>This field is required.</p>
            </div>
            <div className="mb-6">
              <label htmlFor="password">
                Confirm Password
              </label>
              <input id="confirmPassword" type="password" placeholder="******************" value={this.getFormFieldProperty('confirmPassword')} onChange={this.handleInputChange} onBlur={this.handleBlurEvent} />
              <p className={`error-msg ${this.checkRequiredInvalid('confirmPassword') || this.checkPasswordsMatch('password', 'confirmPassword') ? 'show' : ''}`}>
                { this.checkRequiredInvalid('confirmPassword') ? 'This field is required.' : '' }
                { this.checkPasswordsMatch('password', 'confirmPassword') ? 'Your passwords do not match.' : '' }
              </p>
            </div>
            <div className="flex justify-center mb-6">
              <button className="btn-primary w-full" type="submit">
                Sign up
              </button>
            </div>
            <hr className="mb-6"/>
            <div className="flex justify-center">
              <Link to="/login" className="link">
                Already have an account? Log in
              </Link>
            </div>
          </form>
        </div>
      </Layout>
    );
  }
}

export default Signup;
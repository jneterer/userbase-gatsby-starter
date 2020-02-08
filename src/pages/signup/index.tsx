import React, { FormEvent } from "react";
import { Link } from "gatsby";

// Components
import Layout from "../../components/layout";
import SEO from "../../components/seo";

// Types
import { Form } from "../../types/forms/Form";
import { FormField } from "../../types/forms/FormField";
import { ISignupForm } from "./isignup-form";
import { Validators } from "../../types/forms/Validators";

class Signup extends React.Component<{}, ISignupForm> {
  constructor(props) {
    super(props);
    this.state = {
      signupForm: new Form([
        new FormField('firstName', ''),
        new FormField('lastName', ''),
        new FormField('email', '', [Validators.required, Validators.email]),
        new FormField('password', '', [Validators.required]),
        new FormField('confirmPassword', '', [Validators.required, Validators.matchFormField], 'password')
      ])
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBlurEvent = this.handleBlurEvent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Sets the form value in the state.
   * @param {React.FormEvent<HTMLInputElement>} event 
   */
  handleInputChange(event: React.FormEvent<HTMLInputElement>) {
    event.persist();
    const formFieldName: string = event.currentTarget.id;
    const newFormFieldValue: string = event.currentTarget.value;
    let signupForm: Form = this.state.signupForm;
    signupForm.setFormFieldValue(formFieldName, newFormFieldValue);
    this.setState((state: ISignupForm) => {
      return {
        signupForm: signupForm
      }
    });
  }

  /**
   * Sets the touched attribute for a form field.
   * @param {React.FocusEvent} event 
   */
  handleBlurEvent(event: React.FocusEvent) {
    event.persist();
    const formFieldName: string = event.target.id;
    let signupForm: Form = this.state.signupForm;
    signupForm.setFormFieldTouched(formFieldName, true);
    this.setState((state: ISignupForm) => {
      return {
        signupForm: signupForm
      }
    });
  }

  /**
   * Signs the user up and sets the form to submitted.
   * @param {React.FormEvent<HTMLFormElement>} event 
   */
  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let signupForm: Form = this.state.signupForm;
    signupForm.setSubmitted(true);
    this.setState((state: ISignupForm) => {
      return {
        signupForm: signupForm
      }
    });
  }

  render() {
    return (
      <Layout>
        <SEO title="Sign up" />
        <div className="w-full max-w-sm mx-auto">
          <form className="auth-form" onSubmit={this.handleSubmit}>
            <div className="flex justify-center mb-6">
              <h1 className="text-2xl">Sign up for an account</h1>
            </div>
            <div className="mb-4">
              <label htmlFor="firstName">
                First Name
              </label>
              <input id="firstName" type="text" placeholder="First Name" value={this.state.signupForm.getFormField('firstName').getValue()} onChange={this.handleInputChange} />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName">
                Last Name
              </label>
              <input id="lastName" type="text" placeholder="Last Name" value={this.state.signupForm.getFormField('lastName').getValue()} onChange={this.handleInputChange} />
            </div>
            <div className="mb-4">
              <label htmlFor="email">
                Email *
              </label>
              <input id="email" type="text" placeholder="Email" value={this.state.signupForm.getFormField('email').getValue()} onChange={this.handleInputChange} onBlur={this.handleBlurEvent} />
              <p className={`error-msg ${this.state.signupForm.getFormField('email').getError() === Validators.required || this.state.signupForm.getFormField('email').getError() === Validators.email ? 'show' : ''}`}>
                { this.state.signupForm.getFormField('email').getError() === Validators.required ? 'This field is required.' : '' }
                { this.state.signupForm.getFormField('email').getError() === Validators.email ? 'Please provide a valid email address.' : '' }
              </p>
            </div>
            <div className="mb-4">
              <label htmlFor="password">
                Password *
              </label>
              <input id="password" type="password" placeholder="******************" value={this.state.signupForm.getFormField('password').getValue()} onChange={this.handleInputChange} />
              <p className={`error-msg ${this.state.signupForm.getFormField('password').getError() === Validators.required ? 'show' : ''}`}>This field is required.</p>
            </div>
            <div className="mb-6">
              <label htmlFor="password">
                Confirm Password *
              </label>
              <input id="confirmPassword" type="password" placeholder="******************" value={this.state.signupForm.getFormField('confirmPassword').getValue()} onChange={this.handleInputChange} onBlur={this.handleBlurEvent} />
              <p className={`error-msg ${this.state.signupForm.getFormField('confirmPassword').getError() === Validators.required || this.state.signupForm.getFormField('confirmPassword').getError() === Validators.matchFormField ? 'show' : ''}`}>
                { this.state.signupForm.getFormField('confirmPassword').getError() === Validators.required ? 'This field is required.' : '' }
                { this.state.signupForm.getFormField('confirmPassword').getError() === Validators.matchFormField ? 'Your passwords do not match.' : '' }
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
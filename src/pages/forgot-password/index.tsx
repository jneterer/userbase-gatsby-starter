import React, { FormEvent } from "react";
import { Link } from "gatsby";

// Components
import Layout from "../../components/layout";
import SEO from "../../components/seo";

// Types
import { Form } from "../../types/forms/Form";
import { FormField } from "../../types/forms/FormField";
import { IForgotPasswordForm } from "./iforgot-password-form";
import { Validators } from "../../types/forms/Validators";

class ForgotPassword extends React.Component<{}, IForgotPasswordForm> {
  constructor(props) {
    super(props);
    this.state = {
      forgotPasswordForm: new Form([
        new FormField('email', '', [Validators.required, Validators.email])
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
    let forgotPasswordForm: Form = this.state.forgotPasswordForm;
    forgotPasswordForm.setFormFieldValue(formFieldName, newFormFieldValue);
    this.setState((state: IForgotPasswordForm) => {
      return {
        forgotPasswordForm: forgotPasswordForm
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
    let forgotPasswordForm: Form = this.state.forgotPasswordForm;
    forgotPasswordForm.setFormFieldTouched(formFieldName, true);
    this.setState((state: IForgotPasswordForm) => {
      return {
        forgotPasswordForm: forgotPasswordForm
      }
    });
  }

  /**
   * Submits a request for password recovery.
   * @param {React.FormEvent<HTMLFormElement>} event 
   */
  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let forgotPasswordForm: Form = this.state.forgotPasswordForm;
    forgotPasswordForm.setSubmitted(true);
    this.setState((state: IForgotPasswordForm) => {
      return {
        forgotPasswordForm: forgotPasswordForm
      }
    });
  }

  render() {
    return (
      <Layout>
        <SEO title="Forgot Password" />
        <div className="w-full max-w-sm mx-auto">
          <form className="auth-form" onSubmit={this.handleSubmit}>
            <div className="flex justify-center mb-6">
              <h1 className="text-2xl">Forgot Password</h1>
            </div>
            <div className="mb-6">
              <label htmlFor="email">
                Email
              </label>
              <input id="email" type="text" placeholder="Email" value={this.state.forgotPasswordForm.getFormField('email').getValue()} onChange={this.handleInputChange} onBlur={this.handleBlurEvent} />
              <p className={`error-msg ${this.state.forgotPasswordForm.getFormField('email').getError() === Validators.required || this.state.forgotPasswordForm.getFormField('email').getError() === Validators.email ? 'show' : ''}`}>
                { this.state.forgotPasswordForm.getFormField('email').getError() === Validators.required ? 'This field is required.' : '' }
                { this.state.forgotPasswordForm.getFormField('email').getError() === Validators.email ? 'Please provide a valid email address.' : '' }
              </p>
            </div>
            <div className="flex justify-center mb-6">
              <button className="btn-primary w-full" type="submit">
                Submit recovery request
              </button>
            </div>
            <hr className="mb-6"/>
            <div className="flex justify-center">
              <Link to="/login" className="link">
                Back to log in
              </Link>
            </div>
          </form>
        </div>
      </Layout>
    );
  }
}

export default ForgotPassword;
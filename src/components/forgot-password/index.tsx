import React, { FormEvent, FocusEvent } from "react";
import { Link } from "gatsby";
const userbase = typeof window !== 'undefined' ? require('userbase-js').default : null;

// Components
import Layout from "../layout";
import SEO from "../../components/seo";

// Types
import { Form } from "../../types/forms/Form";
import { FormField } from "../../types/forms/FormField";
import { IError } from "../../types/userbase/IError";
import { IForgotPasswordState } from "../../types/forgot-password/iforgot-password-form";
import { Validators } from "../../types/forms/Validators";

class ForgotPassword extends React.Component<{}, IForgotPasswordState> {
  constructor(props) {
    super(props);
    this.state = {
      forgotPasswordForm: new Form([
        new FormField('username', '', [Validators.required])
      ]),
      emailSent: false,
      submissionError: null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBlurEvent = this.handleBlurEvent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Sets the form value in the state.
   * @param {FormEvent<HTMLInputElement>} event 
   */
  handleInputChange(event: FormEvent<HTMLInputElement>) {
    event.persist();
    const formFieldName: string = event.currentTarget.id;
    const newFormFieldValue: string = event.currentTarget.value;
    let forgotPasswordForm: Form = this.state.forgotPasswordForm;
    forgotPasswordForm.setFormFieldValue(formFieldName, newFormFieldValue);
    this.setState((state: IForgotPasswordState) => {
      return {
        ...state,
        forgotPasswordForm: forgotPasswordForm
      };
    });
  }

  /**
   * Sets the touched attribute for a form field.
   * @param {FocusEvent} event 
   */
  handleBlurEvent(event: FocusEvent) {
    event.persist();
    const formFieldName: string = event.target.id;
    let forgotPasswordForm: Form = this.state.forgotPasswordForm;
    forgotPasswordForm.setFormFieldTouched(formFieldName, true);
    this.setState((state: IForgotPasswordState) => {
      return {
        ...state,
        forgotPasswordForm: forgotPasswordForm
      };
    });
  }

  /**
   * Submits a request for password recovery.
   * @param {FormEvent<HTMLFormElement>} event 
   */
  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let forgotPasswordForm: Form = this.state.forgotPasswordForm;
    forgotPasswordForm.setSubmitted(true);
    this.setState((state: IForgotPasswordState) => {
      return {
        ...state,
        forgotPasswordForm: forgotPasswordForm
      };
    });
    if (this.state.forgotPasswordForm.valid) {
      userbase.forgotPassword({ 
        username: this.state.forgotPasswordForm.getFormField('username').value
      })
      .then((user) => {
        this.setState((state) => {
          return {
            ...state,
            emailSent: true,
            submissionError: null
          };
        });
      })
      .catch((error: IError) => {
        this.setState((state) => {
          return {
            ...state,
            emailSent: false,
            submissionError: error.message
          };
        });
      });
    }
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
              <label htmlFor="username">
                Username
              </label>
              <input id="username" type="text" placeholder="Username" value={this.state.forgotPasswordForm.getFormField('username').value} onChange={this.handleInputChange} onBlur={this.handleBlurEvent} />
              <p className={`error-msg ${this.state.forgotPasswordForm.getFormField('username').error !== Validators.none ? 'show' : ''}`}>
                This field is required.
              </p>
            </div>
            <div className="flex justify-center mb-6">
              <button className="btn-primary w-full" type="submit">
                Submit recovery request
              </button>
            </div>
            {
              this.state.emailSent &&
                <p className="success text-center mb-6">Your forgot password request was submitted, please check your email.</p>
            }
            {
              this.state.submissionError &&
                <p className="error text-center mb-6">{this.state.submissionError}</p>
            }
            <hr className="mb-6"/>
            <div className="flex justify-center">
              <Link to="/app/login" className="link">
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
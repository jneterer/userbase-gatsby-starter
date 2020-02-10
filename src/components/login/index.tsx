import React, { FormEvent } from "react";
import { Link, navigate } from "gatsby";
import userbase from "userbase-js"

// Components
import SEO from "../../components/seo";

// Types
import { Form } from "../../types/forms/Form";
import { FormField } from "../../types/forms/FormField";
import { ILoginForm } from "./ilogin-form";
import { Validators } from "../../types/forms/Validators";
import Layout from "../layout";

class Login extends React.Component<{}, ILoginForm> {
  constructor(props) {
    super(props);
    this.state = {
      loginForm: new Form([
        new FormField('email', '', [Validators.required, Validators.email]),
        new FormField('password', '', [Validators.required])
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
    let loginForm: Form = this.state.loginForm;
    loginForm.setFormFieldValue(formFieldName, newFormFieldValue);
    this.setState((state: ILoginForm) => {
      return {
        loginForm: loginForm
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
    let loginForm: Form = this.state.loginForm;
    loginForm.setFormFieldTouched(formFieldName, true);
    this.setState((state: ILoginForm) => {
      return {
        loginForm: loginForm
      }
    });
  }

  /**
   * Logs the user into the web app.
   * @param {React.FormEvent<HTMLFormElement>} event 
   */
  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let loginForm: Form = this.state.loginForm;
    loginForm.setSubmitted(true);
    this.setState({ loginForm: loginForm });
    const username = this.state.loginForm.getFormField('email').getValue();
    const password = this.state.loginForm.getFormField('password').getValue();
    userbase.signIn({ username, password, rememberMe: 'session' })
      .then((user) => {
        navigate('/app/todo');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    return (
      <Layout>
        <SEO title="Log in" />
        <div className="w-full max-w-sm mx-auto">
          <form className="auth-form" onSubmit={this.handleSubmit}>
            <div className="flex justify-center mb-6">
              <h1 className="text-2xl">Log in to your account</h1>
            </div>
            <div className="mb-4">
              <label htmlFor="email">
                Email
              </label>
              <input id="email" type="text" placeholder="Email" value={this.state.loginForm.getFormField('email').getValue()} onChange={this.handleInputChange} onBlur={this.handleBlurEvent} />
              <p className={`error-msg ${this.state.loginForm.getFormField('email').getError() === Validators.required || this.state.loginForm.getFormField('email').getError() === Validators.email ? 'show' : ''}`}>
                { this.state.loginForm.getFormField('email').getError() === Validators.required ? 'This field is required.' : '' }
                { this.state.loginForm.getFormField('email').getError() === Validators.email ? 'Please provide a valid email address.' : '' }
              </p>
            </div>
            <div className="mb-4">
              <label htmlFor="password">
                Password
              </label>
              <input id="password" type="password" placeholder="******************" value={this.state.loginForm.getFormField('password').getValue()} onChange={this.handleInputChange} />
              <p className={`error-msg ${this.state.loginForm.getFormField('password').getError() === Validators.required ? 'show' : ''}`}>This field is required.</p>
            </div>
            <div className="flex justify-end mb-6">
              <Link to="/app/forgot-password" className="link">
                Forgot password?
              </Link>
            </div>
            <div className="flex justify-center mb-6">
              <button className="btn-primary w-full" type="submit">
                Log in
              </button>
            </div>
            <hr className="mb-6"/>
            <div className="flex justify-center">
              <Link to="/app/signup" className="link">
                Sign up for an account
              </Link>
            </div>
          </form>
        </div>
      </Layout>
    );
  }
}

export default Login;
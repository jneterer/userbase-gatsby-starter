import React, { FormEvent, FocusEvent } from "react";
import { Link, navigate } from "gatsby";
const userbase = typeof window !== 'undefined' ? require('userbase-js').default : null;

// Components
import Layout from "../layout";
import SEO from "../../components/seo";

// Types
import { Form } from "../../types/forms/Form";
import { FormField } from "../../types/forms/FormField";
import { IError } from "../../types/userbase/IError";
import { ILoginDto } from "../../types/login/ilogin-dto";
import { ILoginState } from "../../types/login/ilogin-form";
import { Validators } from "../../types/forms/Validators";

class Login extends React.Component<{}, ILoginState> {
  constructor(props) {
    super(props);
    this.state = {
      loginForm: new Form([
        new FormField('username', '', [Validators.required]),
        new FormField('password', '', [Validators.required])
      ]),
      loginError: null
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
    let loginForm: Form = this.state.loginForm;
    loginForm.setFormFieldValue(formFieldName, newFormFieldValue);
    this.setState((state: ILoginState) => {
      return {
        ...state,
        loginForm: loginForm
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
    let loginForm: Form = this.state.loginForm;
    loginForm.setFormFieldTouched(formFieldName, true);
    this.setState((state: ILoginState) => {
      return {
        ...state,
        loginForm: loginForm
      };
    });
  }

  /**
   * Logs the user into the web app.
   * @param {FormEvent<HTMLFormElement>} event 
   */
  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let loginForm: Form = this.state.loginForm;
    loginForm.setSubmitted(true);
    this.setState({ loginForm: loginForm });
    if (this.state.loginForm.valid) {
      const loginDto: ILoginDto = {
        username: this.state.loginForm.getFormField('username').value,
        password: this.state.loginForm.getFormField('password').value,
        rememberMe: 'local'
      };
      userbase.signIn(loginDto)
      .then((user: userbase.UserResult) => {
        navigate(user['usedTempPassword'] ? '/app/profile/changePasswordNeeded' : '/app/todo');
      })
      .catch((error: IError) => {
        this.setState((state) => {
          return {
            ...state,
            loginError: error.message
          }
        });
      });
    }
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
              <label htmlFor="username">
                Username
              </label>
              <input id="username" type="text" placeholder="Username" value={this.state.loginForm.getFormField('username').value} onChange={this.handleInputChange} onBlur={this.handleBlurEvent} />
              <p className={`error-msg ${this.state.loginForm.getFormField('username').error !== Validators.none ? 'show' : ''}`}>
                This field is required.
              </p>
            </div>
            <div className="mb-4">
              <label htmlFor="password">
                Password
              </label>
              <input id="password" type="password" placeholder="******************" value={this.state.loginForm.getFormField('password').value} onChange={this.handleInputChange} />
              <p className={`error-msg ${this.state.loginForm.getFormField('password').error !== Validators.none ? 'show' : ''}`}>
                This field is required.
              </p>
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
            {
              this.state.loginError &&
                <p className="error text-center mb-6">{this.state.loginError}</p>
            }
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
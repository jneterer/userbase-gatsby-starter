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
import { ISignupDto } from "../../types/userbase/isignup-dto";
import { ISignupState } from "../../types/signup/isignup-state";
import { Validators } from "../../types/forms/Validators";

class Signup extends React.Component<{}, ISignupState> {
  constructor(props) {
    super(props);
    this.state = {
      signupForm: new Form([
        new FormField('firstName', ''),
        new FormField('lastName', ''),
        new FormField('email', '', [Validators.required, Validators.email]),
        new FormField('username', '', [Validators.required]),
        new FormField('password', '', [Validators.required]),
        new FormField('confirmPassword', '', [Validators.required, Validators.matchFormField], 'password')
      ]),
      signupError: null
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
    let signupForm: Form = this.state.signupForm;
    signupForm.setFormFieldValue(formFieldName, newFormFieldValue);
    this.setState((state: ISignupState) => {
      return {
        ...state,
        signupForm: signupForm
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
    let signupForm: Form = this.state.signupForm;
    signupForm.setFormFieldTouched(formFieldName, true);
    this.setState((state: ISignupState) => {
      return {
        ...state,
        signupForm: signupForm
      };
    });
  }

  /**
   * Signs the user up and sets the form to submitted.
   * @param {FormEvent<HTMLFormElement>} event 
   */
  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let signupForm: Form = this.state.signupForm;
    signupForm.setSubmitted(true);
    this.setState((state: ISignupState) => {
      return {
        ...state,
        signupForm: signupForm
      };
    });
    if (this.state.signupForm.valid) {
      let signupDto: ISignupDto = {
        username: this.state.signupForm.getFormField('username').value,
        password: this.state.signupForm.getFormField('password').value,
        email: this.state.signupForm.getFormField('email').value,
        profile: {
          firstName: null,
          lastName: null
        },
        rememberMe: 'local'
      };
      const firstName: string = this.state.signupForm.getFormField('firstName').value;
      const lastName: string = this.state.signupForm.getFormField('lastName').value;
      if (firstName && lastName) {
        signupDto.profile.firstName = firstName;
        signupDto.profile.lastName = lastName;
      } else if (firstName) {
        delete signupDto.profile.lastName;
        signupDto.profile.firstName = firstName;
      } else if (lastName) {
        delete signupDto.profile.firstName;
        signupDto.profile.lastName = lastName;
      } else {
        signupDto.profile = null;
      }
      userbase.signUp(signupDto)
      .then((user: userbase.UserResult) => {
        navigate('/app/dashboard');
      })
      .catch((error: IError) => {
        this.setState((state) => {
          return {
            ...state,
            loginError: error.message
          };
        });
      });
    } 
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
              <input id="firstName" type="text" placeholder="First Name" value={this.state.signupForm.getFormField('firstName').value} onChange={this.handleInputChange} />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName">
                Last Name
              </label>
              <input id="lastName" type="text" placeholder="Last Name" value={this.state.signupForm.getFormField('lastName').value} onChange={this.handleInputChange} />
            </div>
            <div className="mb-4">
              <label htmlFor="email">
                Email *
              </label>
              <input id="email" type="text" placeholder="Email" value={this.state.signupForm.getFormField('email').value} onChange={this.handleInputChange} onBlur={this.handleBlurEvent} />
              <p className={`error-msg ${this.state.signupForm.getFormField('email').error !== Validators.none ? 'show' : ''}`}>
                { this.state.signupForm.getFormField('email').error === Validators.required ? 'This field is required.' : '' }
                { this.state.signupForm.getFormField('email').error === Validators.email ? 'Please provide a valid email address.' : '' }
              </p>
            </div>
            <div className="mb-4">
              <label htmlFor="lastName">
                Username *
              </label>
              <input id="username" type="text" placeholder="Username" value={this.state.signupForm.getFormField('username').value} onChange={this.handleInputChange} />
              <p className={`error-msg ${this.state.signupForm.getFormField('username').error !== Validators.none ? 'show' : ''}`}>
                { this.state.signupForm.getFormField('username').error === Validators.required ? 'This field is required.' : '' }
              </p>
            </div>
            <div className="mb-4">
              <label htmlFor="password">
                Password *
              </label>
              <input id="password" type="password" placeholder="******************" value={this.state.signupForm.getFormField('password').value} onChange={this.handleInputChange} />
              <p className={`error-msg ${this.state.signupForm.getFormField('password').error !== Validators.none ? 'show' : ''}`}>This field is required.</p>
            </div>
            <div className="mb-6">
              <label htmlFor="confirmPassword">
                Confirm Password *
              </label>
              <input id="confirmPassword" type="password" placeholder="******************" value={this.state.signupForm.getFormField('confirmPassword').value} onChange={this.handleInputChange} onBlur={this.handleBlurEvent} />
              <p className={`error-msg ${this.state.signupForm.getFormField('confirmPassword').error !== Validators.none ? 'show' : ''}`}>
                { this.state.signupForm.getFormField('confirmPassword').error === Validators.required ? 'This field is required.' : '' }
                { this.state.signupForm.getFormField('confirmPassword').error === Validators.matchFormField ? 'Your passwords do not match.' : '' }
              </p>
            </div>
            <div className="flex justify-center mb-6">
              <button className="btn-primary w-full" type="submit">
                Sign up
              </button>
            </div>
            {
              this.state.signupError &&
                <p className="error text-center mb-6">{this.state.signupError}</p>
            }
            <hr className="mb-6"/>
            <div className="flex justify-center">
              <Link to="/app/login" className="link">
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
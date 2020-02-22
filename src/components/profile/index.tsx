import React, { MouseEvent, FormEvent, FocusEvent } from "react";
import { navigate } from "gatsby";
import { Match } from "@reach/router";
const userbase = typeof window !== 'undefined' ? require('userbase-js').default : null;

// Components
import Layout from "../layout";
import SEO from "../seo";

// Types
import { Form } from "../../types/forms/Form";
import { FormField } from "../../types/forms/FormField";
import { IError } from "../../types/userbase/IError";
import { IProfileState } from "../../types/profile/iprofile";
import { IUpdateAccountInfoDto } from "../../types/profile/iupdate-account-info-dto";
import { Validators } from "../../types/forms/Validators";

class Profile extends React.Component<{ user: userbase.UserResult }, IProfileState> {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      accountInfoForm: new Form([
        new FormField('firstName', this.props.user.profile?.firstName),
        new FormField('lastName', this.props.user.profile?.lastName),
        new FormField('email', this.props.user.email, [Validators.required, Validators.email])

      ]),
      accountInfoFormSuccess: false,
      accountInfoFormError: null,
      changePasswordForm: new Form([
        new FormField('currentPassword', '', [Validators.required]),
        new FormField('newPassword', '', [Validators.required]),
        new FormField('confirmPassword', '', [Validators.required, Validators.matchFormField], 'newPassword')
      ]),
      changePasswordFormSuccess: false,
      changePasswordFormError: null,
      deleteAccountRequested: false,
      deleteAccountSuccess: false,
      deleteAccountError: null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBlurEvent = this.handleBlurEvent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
  }

  /**
   * Sets the form value in the state.
   * @param {FormEvent<HTMLInputElement>} event
   * @param {string} formName
   */
  handleInputChange(event: FormEvent<HTMLInputElement>, formName: string) {
    event.persist();
    const formFieldName: string = event.currentTarget.id;
    const newFormFieldValue: string = event.currentTarget.value;
    let profileForm: Form = this.state[formName];
    profileForm.setFormFieldValue(formFieldName, newFormFieldValue);
    this.setState((state: IProfileState) => {
      return {
        ...state,
        [formName]: profileForm
      };
    });
  }

  /**
   * Sets the touched attribute for a form field.
   * @param {FocusEvent} event
   * @param {string} formName
   */
  handleBlurEvent(event: FocusEvent, formName: string) {
    event.persist();
    const formFieldName: string = event.target.id;
    let profileForm: Form = this.state[formName];
    profileForm.setFormFieldTouched(formFieldName, true);
    this.setState((state: IProfileState) => {
      return {
        ...state,
        [formName]: profileForm
      };
    });
  }

  /**
   * Signs the user up and sets the form to submitted.
   * @param {FormEvent<HTMLFormElement>} event
   * @param {string} formName
   */
  handleSubmit(event: FormEvent<HTMLFormElement>, formName: string) {
    event.preventDefault();
    let profileForm: Form = this.state[formName];
    profileForm.setSubmitted(true);
    this.setState((state: IProfileState) => {
      return {
        ...state,
        [formName]: profileForm
      };
    });
    if (formName === 'accountInfoForm') {
      if (this.state.accountInfoForm.valid && this.state.accountInfoForm.changed) {
        const firstName: string = this.state.accountInfoForm.getFormField('firstName').value;
        const lastName: string = this.state.accountInfoForm.getFormField('lastName').value;
        let updateAccountInfoDto: IUpdateAccountInfoDto = {
          username: this.state.user.username,
          email: this.state.accountInfoForm.getFormField('email').value,
          profile: {
            firstName: null,
            lastName: null
          }
        };
        if (firstName && lastName) {
          updateAccountInfoDto.profile.firstName = firstName;
          updateAccountInfoDto.profile.lastName = lastName;
        } else if (firstName) {
          delete updateAccountInfoDto.profile.lastName;
          updateAccountInfoDto.profile.firstName = firstName;
        } else if (lastName) {
          delete updateAccountInfoDto.profile.firstName;
          updateAccountInfoDto.profile.lastName = lastName;
        } else {
          updateAccountInfoDto.profile = null;
        }
        userbase.updateUser(updateAccountInfoDto)
        .then(() => {
          this.setState((state) => {
            return {
              ...state,
              accountInfoFormSuccess: true,
              accountInfoFormError: null
            };
          });
        })
        .catch((error: IError) => {
          this.setState((state) => {
            return {
              ...state,
              accountInfoFormSuccess: false,
              accountInfoFormError: error.message
            };
          });
        });
      }
    } else {
      if (this.state.changePasswordForm.valid && this.state.changePasswordForm.changed) {
        const updateAccountInfoDto: IUpdateAccountInfoDto = {
          username: this.state.user.username,
          currentPassword: this.state.changePasswordForm.getFormField('currentPassword').value,
          newPassword: this.state.changePasswordForm.getFormField('newPassword').value
        };
        userbase.updateUser(updateAccountInfoDto)
        .then(() => {
          let changePasswordForm: Form = this.state.changePasswordForm;
          changePasswordForm.resetForm();
          this.setState((state) => {
            return {
              ...state,
              changePasswordForm: changePasswordForm,
              changePasswordFormSuccess: true,
              changePasswordFormError: null
            };
          });
        })
        .catch((error: IError) => {
          this.setState((state) => {
            return {
              ...state,
              changePasswordFormSuccess: false,
              changePasswordFormError: error.message
            };
          });
        });
      }
    }
  }

  /**
   * Deletes a user's account and sends them to the home page upon deletion.
   * @param {MouseEvent<HTMLButtonElement>} event 
   */
  deleteAccount(event: MouseEvent<HTMLButtonElement>) {
    userbase.deleteUser()
    .then(() => {
      this.setState((state) => {
        return {
          ...state,
          deleteAccountSuccess: true,
          deleteAccountError: null
        };
      });
      navigate('/');
    })
    .catch((error: IError) => {
      this.setState((state) => {
        return {
          ...state,
          deleteAccountSuccess: false,
          deleteAccountError: error.message
        };
      });
    });
  }

  render() {
    return (
      <Layout user={this.props.user}>
        <SEO title="Profile" />
        <div className="max-w-2xl rounded overflow-hidden shadow-lg mx-auto mb-4">
          <Match path="/app/profile/changePasswordNeeded">
            {
              props => (props.match && !this.state.changePasswordFormSuccess) ? 
                <div className="bg-red-600 text-white text-center p-4">
                  <p>
                    Please change your password before continuing. The temporary password you used
                    is only valid for 24 hours after you submitted your forgot password request.
                  </p>
                </div> :
                ''
            }
          </Match>
          <div className="px-10 py-5">
            <h1 className="text-4xl mb-4">Profile</h1>
            <h2 className="text-2xl mb-4">Account Info</h2>
            <form className="max-w-sm mx-auto mb-8" onSubmit={(e) => this.handleSubmit(e, 'accountInfoForm')}>
              <div className="mb-4">
                <label htmlFor="firstName">
                  First Name
                </label>
                <input id="firstName" type="text" placeholder="First Name" value={this.state.accountInfoForm.getFormField('firstName').value} onChange={(e) => this.handleInputChange(e, 'accountInfoForm')} />
              </div>
              <div className="mb-4">
                <label htmlFor="lastName">
                  Last Name
                </label>
                <input id="lastName" type="text" placeholder="Last Name" value={this.state.accountInfoForm.getFormField('lastName').value} onChange={(e) => this.handleInputChange(e, 'accountInfoForm')} />
              </div>
              <div className="mb-6">
                <label htmlFor="email">
                  Email *
                </label>
                <input id="email" type="text" placeholder="Email" value={this.state.accountInfoForm.getFormField('email').value} onChange={(e) => this.handleInputChange(e, 'accountInfoForm')} onBlur={(e) => this.handleBlurEvent(e, 'accountInfoForm')} />
                <p className={`error-msg ${this.state.accountInfoForm.getFormField('email').error !== Validators.none ? 'show' : ''}`}>
                  { this.state.accountInfoForm.getFormField('email').error === Validators.required ? 'This field is required.' : '' }
                  { this.state.accountInfoForm.getFormField('email').error === Validators.email ? 'Please provide a valid email address.' : '' }
                </p>
              </div>
              <button className="btn-primary w-full" type="submit">
                Update Account Info
              </button>
              {
                this.state.accountInfoFormSuccess &&
                  <p className="success text-center mt-4">Your account info was successfully updated!</p>
              }
              {
                this.state.accountInfoFormError &&
                  <p className="error text-center mt-4">{this.state.accountInfoFormError}</p>
              }
            </form>
            <hr className="mb-4" />
            <h2 className="text-2xl mb-4">Change Password</h2>
            <form className="max-w-sm mx-auto mb-8" onSubmit={(e) => this.handleSubmit(e, 'changePasswordForm')}>
              <div className="mb-4">
                <label htmlFor="currentPassword">
                  Current Password *
                </label>
                <input id="currentPassword" type="password" placeholder="******************" value={this.state.changePasswordForm.getFormField('currentPassword').value} onChange={(e) => this.handleInputChange(e, 'changePasswordForm')} />
                <p className={`error-msg ${this.state.changePasswordForm.getFormField('currentPassword').error !== Validators.none ? 'show' : ''}`}>This field is required.</p>
              </div>
              <div className="mb-4">
                <label htmlFor="newPassword">
                  Password *
                </label>
                <input id="newPassword" type="password" placeholder="******************" value={this.state.changePasswordForm.getFormField('newPassword').value} onChange={(e) => this.handleInputChange(e, 'changePasswordForm')} />
                <p className={`error-msg ${this.state.changePasswordForm.getFormField('newPassword').error !== Validators.none ? 'show' : ''}`}>This field is required.</p>
              </div>
              <div className="mb-6">
                <label htmlFor="confirmPassword">
                  Confirm Password *
                </label>
                <input id="confirmPassword" type="password" placeholder="******************" value={this.state.changePasswordForm.getFormField('confirmPassword').value} onChange={(e) => this.handleInputChange(e, 'changePasswordForm')} onBlur={(e) => this.handleBlurEvent(e, 'changePasswordForm')} />
                <p className={`error-msg ${this.state.changePasswordForm.getFormField('confirmPassword').error !== Validators.none ? 'show' : ''}`}>
                  { this.state.changePasswordForm.getFormField('confirmPassword').error === Validators.required ? 'This field is required.' : '' }
                  { this.state.changePasswordForm.getFormField('confirmPassword').error === Validators.matchFormField ? 'Your passwords do not match.' : '' }
                </p>
              </div>
              <button className="btn-primary w-full" type="submit">
                Change Password
              </button>
              {
                this.state.changePasswordFormSuccess &&
                  <p className="success text-center  mt-4">Your password was successfully changed!</p>
              }
              {
                this.state.changePasswordFormError &&
                  <p className="error text-center  mt-4">{this.state.changePasswordFormError}</p>
              }
            </form>
            <hr className="mb-4" />
            <h2 className="text-2xl mb-2 error">Danger Zone</h2>
            <p className="mb-6">Be advised that by performing the action, your account is not recoverable.</p>
            <div className="max-w-sm mx-auto mb-8">
              <button disabled={this.state.deleteAccountRequested} className="btn-error w-full" type="button" onClick={() => this.setState(state => {return {...state, deleteAccountRequested: true }})}>
                Delete Account
              </button>
              {
                this.state.deleteAccountRequested &&
                <button className="btn-error w-full mt-4" type="button" onClick={this.deleteAccount}>
                  Confirm Delete Account
                </button>
              }
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Profile
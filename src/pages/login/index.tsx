import React from "react"
import { Link } from "gatsby";

// Components
import Layout from "../../components/layout";
import SEO from "../../components/seo";

export interface ILogicForm {
  username: string;
  password: string;
  submitted: boolean;
}

class Login extends React.Component<{}, ILogicForm> {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      submitted: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    event.persist();
    this.setState((state: ILogicForm) => {
      return {
        ...state,
        [event.target.id]: event.target.value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(event);
    this.setState((state: ILogicForm) => {
      return {
        ...state,
        submitted: true
      }
    });
  }

  render() {
    return <Layout>
      <SEO title="Login" />
      <div className="w-full max-w-sm mx-auto">
        <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4" onSubmit={this.handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input id="username" type="text" placeholder="Username" value={this.state.username} onChange={this.handleInputChange} />
            {
              (this.state.submitted && this.state.username === '') &&
                <p className="error-msg">This field is required.</p>
            }
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input id="password" type="password" placeholder="******************" value={this.state.password} onChange={this.handleInputChange} />
            {
              (this.state.submitted && this.state.password === '') &&
                <p className="error-msg">This field is required.</p>
            }
          </div>
          <div className="flex justify-end mb-6">
            <Link to="/forgot-password" className="link">
              Forgot Password?
            </Link>
          </div>
          <div className="flex justify-center mb-6">
            <button className="btn-primary" type="submit">
              Sign In
            </button>
          </div>
          <hr className="mb-6"/>
          <div className="flex justify-center">
            <Link to="/register" className="link">
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </Layout>;
  }
}

export default Login;
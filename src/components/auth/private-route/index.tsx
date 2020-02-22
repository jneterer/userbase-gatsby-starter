import React from "react";
import { Redirect } from "@reach/router";
const userbase = typeof window !== 'undefined' ? require('userbase-js').default : null;

// Components
import Layout from "../../layout";

// Types
import { IAuthRouteProps } from "../../../types/auth/iauth-route-props";
import { IAuthRouteState } from "../../../types/auth/iauth-route-state";

class PrivateRoute extends React.Component<IAuthRouteProps, IAuthRouteState> {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isLoading: true,
      page: this.props.component
    }
  }

  componentDidMount() {
    // Check the user's session.
    userbase.init({ appId: process.env.GATSBY_REACT_APP_USERBASE_APP_ID as string })
    .then(session => {
      this.setState((state) => {
        return {
          ...state,
          isLoading: false,
          user: session.user ? session.user : null
        }
      });
    });
  }

  render() {
    const Page = this.state.page;
    // If the page is loading, indicate we are still performing our session check.
    if (this.state.isLoading) {
      return <Layout><h1>LOADING...</h1></Layout>
    } else if (this.state.user) {
      // If we have completed our session check and the user is logged in, send them to the requested page.
      return <Page {...{user: this.state.user}} />
    }
    // Otherwise, redirect to the login page.
    return <Redirect to="/app/login" noThrow />
  }
  
}

export default PrivateRoute
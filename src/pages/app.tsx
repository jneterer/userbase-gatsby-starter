import React from "react"
import { Router, RouteComponentProps, Redirect } from "@reach/router"

// Auth
import PrivateRoute from "../components/auth/private-route"
import PublicRoute from "../components/auth/public-route"

// Components
import Todo from "../components/todo"
import ForgotPassword from "../components/forgot-password"
import Login from "../components/login"
import Signup from "../components/signup"

// Pages
import IndexPage from "."

class App extends React.Component<{}> {
  render() {
    return (
      <Router>
        <RouterPage path="/" pageComponent={<IndexPage />} />
        <PublicRoute path="/app/login" component={Login} />
        <PublicRoute path="/app/forgot-password" component={ForgotPassword} />
        <PublicRoute path="/app/signup" component={Signup} />
        <PrivateRoute path="/app/todo" component={Todo} />
        <RouterPage default={true} pageComponent={<Redirect to="/app/login" noThrow />} />
      </Router>
    )
  }
}

export default App

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent;
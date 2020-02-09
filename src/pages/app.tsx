import React from "react"
import { Router, RouteComponentProps, Redirect } from "@reach/router"

// Components
import ForgotPassword from "../components/forgot-password"
import Layout from "../components/layout"
import Login from "../components/login"
import Signup from "../components/signup"

// Pages
import IndexPage from "."

class App extends React.Component<{}> {
  componentDidMount() {
  }

  render() {
    return (
      <Layout>
        <Router>
          <RouterPage path="/" pageComponent={<IndexPage />} />
          <RouterPage path="/app/login" pageComponent={<Login />} />
          <RouterPage path="/app/forgot-password" pageComponent={<ForgotPassword />} />
          <RouterPage path="/app/signup" pageComponent={<Signup />} />
          <RouterPage default={true} pageComponent={<Redirect to="/app/login" noThrow />} />
        </Router>
      </Layout>
    )
  }

}

export default App

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent;
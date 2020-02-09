import React from "react"
import { Router, RouteComponentProps, Redirect } from "@reach/router"

// Components
import ForgotPassword from "../components/forgot-password"
import Layout from "../components/layout"
import Login from "../components/login"
import Signup from "../components/signup"

const Auth = () => (
  <Layout>
    <Router>
      <RouterPage path="/auth/login" pageComponent={<Login />} />
      <RouterPage path="/auth/forgot-password" pageComponent={<ForgotPassword />} />
      <RouterPage path="/auth/signup" pageComponent={<Signup />} />
      <RouterPage default={true} pageComponent={<Redirect to="/auth/login" noThrow />} />
    </Router>
  </Layout>
)

export default Auth

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent;
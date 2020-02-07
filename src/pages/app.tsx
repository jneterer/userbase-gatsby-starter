import React from "react"
import { Router, RouteComponentProps } from "@reach/router"

// Components
import Layout from "../components/layout"

// Pages
import IndexPage from ".";
import Login from "./login";
import NotFoundPage from "./404";
import Signup from "./signup";

const App = () => (
  <Layout>
    <Router>
      <RouterPage path="/" pageComponent={<IndexPage />} />
      <RouterPage path="/app/login" pageComponent={<Login />} />
      <RouterPage path="/app/signup" pageComponent={<Signup />} />
      <RouterPage pageComponent={<NotFoundPage />} default={true} />
    </Router>
  </Layout>
)

export default App

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent;
import React from "react";

// Components
import Layout from "../components/layout";
import SEO from "../components/seo";

// Styles
import '../styles/site.scss';
import '../styles/layout.scss';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1 className="m-0 text-4xl text-center">
      Another Todo 
    </h1>
    <p>
      Built using the exciting new serverless JavaScript
      {` `}SDK <a className="link" href="https://userbase.com/" target="_blank" rel="noopener noreferrer">Userbase</a>.
    </p>
    <p>You can read how to set up this Userbase Gatsby Starter here: <a className="link" href="https://github.com/jneterer/userbase-gatsby-starter/blob/master/README.md" target="_blank" rel="noopener noreferrer">README</a>.</p>
  </Layout>
)

export default IndexPage

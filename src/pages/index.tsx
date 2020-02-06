import React from "react"

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
      Just another todo application built on the exciting new serverless JavaScript
      {` `}SDK <a className="link" href="https://userbase.com/" target="_blank" rel="noopener noreferrer">Userbase</a>.
    </h1>
  </Layout>
)

export default IndexPage

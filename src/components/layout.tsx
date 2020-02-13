import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

// Components
import Header from "./header";
import Footer from "./footer";

const Layout = ({ children, ...rest }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} {...rest} />
      <div className="top-20 relative sm:px-20 px-10 py-10">
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.object,
}

Layout.defaultProps = {
  user: null
}

export default Layout

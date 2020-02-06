import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

// Styles
import './header.scss';

const Header = ({ siteTitle }) => (
  <header className="fixed w-full bg-orange.400 h-20 z-50 flex justify-between items-center px-20">
    <h1 className="m-0 text-4xl">
      <Link
        to="/"
        style={{
          color: `white`,
          textDecoration: `none`,
        }}
      >
        {siteTitle}
      </Link>
    </h1>
    <Link to="/login">
      <button className="btn-secondary">
        Login
      </button>
    </Link>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

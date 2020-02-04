import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

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
    <button className="login-btn bg-white hover:bg-black text-black hover:text-white font-semibold py-2 px-10 rounded">
      Login
    </button>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

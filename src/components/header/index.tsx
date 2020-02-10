import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import userbase from "userbase-js";

// Styles
import './header.scss';
import { navigate } from "@reach/router";

const Header = ({ siteTitle, user }) => (
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
    {
      user ?
        <button className="btn-secondary" onClick={signOut}>
          Sign out
        </button> :
        <Link to="/app/login">
          <button className="btn-secondary">
            Login
          </button>
        </Link>
    }
  </header>
)

const signOut = () => {
  userbase.signOut()
  .then(() => {
    navigate('/app/login')
  })
  .catch((e) => console.error(e))
}

Header.propTypes = {
  siteTitle: PropTypes.string,
  user: PropTypes.object,
}

Header.defaultProps = {
  siteTitle: ``,
  user: null
}

export default Header
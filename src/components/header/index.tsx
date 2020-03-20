import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { navigate } from "@reach/router";
const userbase = typeof window !== 'undefined' ? require('userbase-js').default : null;

const Header = ({ siteTitle, user }) => (
  <header className="fixed w-full bg-purple-800 sm:h-20 z-50 flex sm:flex-row flex-wrap justify-around sm:justify-between items-center px-1 sm:px-20">
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
        <nav className="sm:pb-0 pb-3">
          <Link to="/app/todo" className="mr-2">
            <button className="btn-secondary">
              Todos
            </button>
          </Link>
          <Link to="/app/profile" className="mr-2">
            <button className="btn-secondary">
            Profile
            </button>
          </Link>
          <button className="btn-accent" onClick={signOut}>
            Sign out
          </button>
        </nav> :
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

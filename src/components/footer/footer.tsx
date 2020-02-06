import React from "react"

// Styles
import './footer.scss';

const Footer = () => (
  <footer className="text-center">
    © {new Date().getFullYear()}, Built by
    {` `}
    <a className="link" href="https://jacobneterer.com/" target="_blank" rel="noopener noreferrer">Jacob Neterer</a>
  </footer>
)

export default Footer

import React from "react";
import { Link } from "react-router-dom";

function Header({ isLoggedIn, onLogout }) {

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <nav className="navbar-nav">
        <Link className="navbar-brand" to="/" >
            Mi App React Flask
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
          <Link to="/contact" className="nav-link">
            Contact
          </Link>
            {isLoggedIn && (
              <li>
                <button onClick={onLogout} className="nav-link">Logout</button>
              </li>
            )}
        </nav>
      </div>
    </header>
  );
}

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Asset Management</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link to="/" className="nav-link">DASHBOARD</Link>
              </li>
              <li className="nav-item">
                <Link to="/assets" className="nav-link">ASSETS</Link>
              </li>
              <li className="nav-item">
                <Link to="/dealers" className="nav-link">DEALERS</Link>
              </li>
              <li className="nav-item">
                <Link to="/maintainence" className="nav-link">MAINTAINENCE</Link>
              </li>
              <li className="nav-item">
                <Link to="/transactions" className="nav-link">TRANSACTIONS</Link>
              </li>
            </ul>
            {/* Icons Section */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/contact" className="nav-link">
                  contact us
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/aboutus" className="nav-link">
                  About us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;


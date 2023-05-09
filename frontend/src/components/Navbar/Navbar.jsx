import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';

const Navbar = () => {
  const location=useLocation().pathname

  return (
    <div className='homepage'>
      <nav className="navbar navbar-expand-lg bg-body-tertiary rounded">
        <div className="container-fluid">
          <Logo/>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location === '/getstarted' ? 'active' : ''}`} to="/getstarted">Get Started</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location==="/login" ? 'active' : ''} `} to="/login">Login</Link>
              </li>
              <li className="nav-item dropdown">
                <div className="nav-link dropdown-toggle" id="action-dropdown" data-bs-toggle="dropdown">Dropdown</div>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/action">Action</Link></li>
                  <li><Link className="dropdown-item" to="/action">Action</Link></li>
                  <li><Link className="dropdown-item" to="/action">Action</Link></li>
                </ul>
              </li>
            </ul>
            <form role="search">
              <input className="form-control" id="searchbar" type="search" placeholder="Search" aria-label="Search"/>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
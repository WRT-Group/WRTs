import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import { Context } from '../Context/Context';
import "./Navbar.css"
import Balance from '../Balance/Balance';

const Navbar = () => {
  const location = useLocation().pathname
  const { currentUser,logout }=useContext(Context)
  return (
    <div className='homepage'>
      <nav className="navbar navbar-expand-lg bg-body-tertiary rounded">
        <div className="container-fluid">
          <Logo />
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {!currentUser && <> <li className="nav-item">
                <Link className={`nav-link ${location === '/getstarted' ? 'active' : ''}`} to="/getstarted">Get Started</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location === "/login" ? 'active' : ''} `} to="/login">Login</Link>
              </li>
              </>}
              <li className="nav-item">
                <Link className={`nav-link ${location === "/contact" ? 'active' : ''} `} to="/contact">Contact Us</Link>
              </li>
              {currentUser && <Balance/>}
            </ul>
              {currentUser && currentUser.isAdmin && 
              <div className="nav-item" style={{marginRight: "30px"}}>
                <Link className={`nav-link`} to="/admin">Admin Dashboard</Link>
              </div>}
              {currentUser && 
              <div className="nav-item" style={{marginRight: "30px"}}>
                <Link className={`nav-link`} to="/" onClick={logout}>Logout</Link>
              </div>}
            <Search />
            {currentUser && <Link to={`/profile/${currentUser.id}`}>
            <img src='https://thumbs.dreamstime.com/b/nft-non-fungible-token-tokens-icon-covering-concept-high-tech-technology-symbol-logo-vector-225921227.jpg' alt='profile' className='pr' />
            </Link>}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
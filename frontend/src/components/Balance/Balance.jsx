import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import "./Balance.css"
import { Context } from '../Context/Context';

const Balance = () => {
  const { currentUser }=useContext(Context)

  return (
    <li className="nav-item">
      <Link className={`nav-link ${location === "/balance" ? 'active' : ''} `} to="/balance">Balance: {currentUser.balance}</Link>
    </li>
  );
};

export default Balance;
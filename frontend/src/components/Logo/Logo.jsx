import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Logo.css"

const Logo = () => {
  const navigate=useNavigate()

  return (
    <div className="navbar-brand" onClick={()=>navigate("/")}>WRTs</div>
  );
};

export default Logo;
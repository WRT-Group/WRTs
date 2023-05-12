import React, { useEffect } from 'react';
import "./Banned.css"
import RedAlert from '../Alerts/RedAlert';
import { useNavigate } from 'react-router-dom';

const Banned = () => {

  const navigate=useNavigate()

  useEffect(()=>{
    setTimeout(() => {
      navigate("/")
    }, 4000);
  })

  return (
    <div>
      <RedAlert text={"You are banned."}/>
      <div id="banned-text">
        you are banned
      </div>
    </div>
  );
};

export default Banned;
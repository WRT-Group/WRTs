import React, { useContext, useEffect } from 'react';
import "./Home.css"
import AllNfts from '../NFTs/AllNfts';
import GreenAlert from '../Alerts/GreenAlert';
import { Context } from '../Context/Context';

const Home = () => {
  const { loginSuccess, setLoginSuccess }=useContext(Context)

  useEffect(()=>{
    if(loginSuccess){
      setTimeout(()=>setLoginSuccess(false),2000)
    }
  },[])

  return (
    <>
      {loginSuccess && <GreenAlert text={"Logged in."}/>}
      <AllNfts/>
    </>
  );
};

export default Home;
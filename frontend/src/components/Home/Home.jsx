import React, { useContext, useEffect } from 'react';
import "./Home.css"
import AllNfts from '../NFTs/AllNfts';
import GreenAlert from '../Alerts/GreenAlert';
import { Context } from '../Context/Context';
import Spinner from '../Spinner/Spinner';

const Home = () => {
  const { loginSuccess, setLoginSuccess, isLoading }=useContext(Context)

  useEffect(()=>{
    if(loginSuccess){
      setTimeout(()=>setLoginSuccess(false),2000)
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  },[])

  return (
    <>
      {loginSuccess && <GreenAlert text={"Logged in."}/>}
      <AllNfts/>
      {isLoading && <Spinner/>}
    </>
  );
};

export default Home;
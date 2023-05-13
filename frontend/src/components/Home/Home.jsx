import React, { useContext, useEffect } from 'react';
import "./Home.css"
import AllNfts from '../NFTs/AllNfts';
import GreenAlert from '../Alerts/GreenAlert';
import YellowAlert from '../Alerts/YellowAlert';
import RedAlert from '../Alerts/RedAlert';
import { Context } from '../Context/Context';
import Spinner from '../Spinner/Spinner';

const Home = () => {
  const { loginSuccess, setLoginSuccess, isLoading, isGreen, isYellow, isRed, alertText }=useContext(Context)

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
      {isRed && <RedAlert text={alertText} />}
      {isYellow && <YellowAlert text={alertText} />}
      {isGreen && <GreenAlert text={alertText} />}
      {loginSuccess && <GreenAlert text={"Logged in."}/>}
      <AllNfts/>
      {isLoading && <Spinner/>}
    </>
  );
};

export default Home;
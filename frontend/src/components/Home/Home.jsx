import React from 'react';
import "./Home.css"
import AllNfts from '../NFTs/AllNfts';
import Navbar from '../Navbar/Navbar';

const Home = () => {

  return (
    <>
      <Navbar/>
      <AllNfts/>
    </>
  );
};

export default Home;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../NFTs/OneNfts.css'
import Navbar from "../Navbar/Navbar";
const BuyNFT=()=>{
    const {id}=useParams()
    console.log(id)
    const [buyData,setBuyData]=useState([])
    const getOne=async ()=>{
        const res =await axios.get(`http://localhost:3001/NFT/getOne/${id}`)
        setBuyData(res.data)
    }
    useEffect(()=>{
        getOne()
    },[])
    console.log(buyData)
    return (
        <>
        <Navbar/>
        <div className="nft">
    {buyData.length>0 && <div className='main'>
      <img className='tokenImage' src={buyData[0].image} alt="NFT"/>
      <h2 style={{color:"white"}}>{buyData[0].nftName} #42</h2>
      <p className='description'>{buyData[0].description}</p>
      <hr />
      <div className='tokenInfo'>
        <div className="price">
          <ins>◘{buyData[0].price} ETH</ins>
        </div>
        <div className="duration">
          <ins>◷ 11 days left</ins>
        </div>
      </div>
    </div>}
    <br />
  </div>
        </>
       
    )
}
export default BuyNFT;
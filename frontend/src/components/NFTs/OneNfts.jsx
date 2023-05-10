import React ,{useContext}from "react";
import { Link } from "react-router-dom";
import './OneNfts.css'
import { Context } from "../Context/Context";
const OneNfts=(props)=>{
    const { currentUser }=useContext(Context)
    
    return(
        
    <div className="nft">
    <div className='main'>
      <img className='tokenImage' src={props.one.image} alt="NFT"/>
      <h2>{props.one.nftName} #42</h2>
      <p className='description'>{props.one.description}</p>
      <hr />
      <div className='tokenInfo'>
        <div className="price">
          <ins>◘{props.one.price} ETH</ins>
        </div>
        <div className="duration">
          <ins>◷ 11 days left</ins>
        </div>
      </div>
    </div>
    <button ><Link to={`/BuyNFT/${props.one._id}`}>Buy</Link></button><br />
    <br />
  </div>
    )
};

export default OneNfts;

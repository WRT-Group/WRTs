import React from "react";
import './OneNfts.css'
const OneNfts=(props)=>{
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
  </div>
    )
};

export default OneNfts;

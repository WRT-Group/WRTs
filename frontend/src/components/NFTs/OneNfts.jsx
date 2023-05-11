import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./OneNfts.css";
import { Context } from "../Context/Context";
import UpdateNFT from "../MyNFTs/UpdateNFT/UpdateNFT";
import DeleteNFT from "../MyNFTs/DeleteNFT/DeleteNFT";

const OneNfts = (props) => {
  const location = useLocation().pathname;
  const { currentUser } = useContext(Context);

  const Button = () => {
    if (location === "/profile") {
      return (
        <div className="buttons">
          <UpdateNFT nft={props.one} />
          <DeleteNFT id={props.one._id} />
        </div>
      );
    }
    if (!currentUser) {
      return (
        <button className="buy-btn">
          <Link to={/BuyNFT/${props.one._id}}>Buy</Link>
        </button>
      );
    } else {
      if (currentUser.id !== props.one.owner) {
        return (
          <button className="buy-btn">
            <Link to={/BuyNFT/${props.one._id}}>Buy</Link>
          </button>
        );
      } else return <></>;
    }
  };
          

const OneNfts=(props)=>{
    const { currentUser }=useContext(Context)
    
    return(
        
    <div className="nft">
    <div className='main'>
      <img className='tokenImage' src={props.one.image} alt="NFT"/>
      <h2>{props.one.nftName}</h2>
      <p className='description'>{props.one.description}</p>
      <hr />
      <div className='tokenInfo'>
        <div className="price">
          <ins>◘{props.one.price} ETH</ins>
          </div>
        </div>
      </div>
      {Button()}
      <br />
    </div>
  );
};

export default OneNfts;

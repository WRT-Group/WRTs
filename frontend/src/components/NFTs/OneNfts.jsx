import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./OneNfts.css";
import { Context } from "../Context/Context";
import UpdateNFT from "../MyNFTs/UpdateNFT/UpdateNFT";
import DeleteNFT from "../MyNFTs/DeleteNFT/DeleteNFT";

const OneNfts = (props) => {
  const { currentUser } = useContext(Context);

  const Button = () => {
    if (!currentUser) {
      return (
        <button className="buy-btn">
          <Link to={`/BuyNFT/${props.one._id}`}>Buy</Link>
        </button>
      );
    } else {
      if (currentUser.id === props.one.owner) {
        return (
          <div className="buttons">
            <UpdateNFT nft={props.one} />
            <DeleteNFT id={props.one._id} />
          </div>
        );
      } else {
        return (
          <button className="buy-btn">
            <Link to={`/BuyNFT/${props.one._id}`}>Buy</Link>
          </button>
        );
      }
    }
  };

  return (
    <div className="nft">
      <div className="main">
        <img className="tokenImage" src={props.one.image} alt="NFT" />
        <h2>{props.one.nftName}</h2>
        <p className="description">{props.one.description}</p>
        <hr />
        <div className="tokenInfo">
          <div className="price">
            <ins>◘{props.one.price} ETH</ins>
          </div>
        </div>
      </div>
      {Button()}
      <hr />
      <div className="creator">
        <div className="wrapper">
          <img
            src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
            alt="Creator"
          />
        </div>
        <p>
          <ins>Creation of</ins> Kiberbash
        </p>
      </div>
    </div>
  );
};

export default OneNfts;

import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./OneNfts.css";
import { Context } from "../Context/Context";
import UpdateNFT from "../MyNFTs/UpdateNFT/UpdateNFT";
import DeleteNFT from "../MyNFTs/DeleteNFT/DeleteNFT";
import axios from "axios";

const OneNfts = (props) => {
  const { currentUser } = useContext(Context);
  const [owner, setOwner] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3001/user/owner/${props.one.owner}`)
      .then(async (res) => setOwner(res.data));
  }, []);

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
      {owner && (
        <div className="creator">
          <div className="wrapper">
            <img src="{owner.image}" alt="Creator" />
          </div>
          <p>
            <ins>Creation of</ins>
            <Link to={`/profile/${owner._id}`}> {owner.username}</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default OneNfts;

import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./OneNfts.css";
import { Context } from "../Context/Context";
import UpdateNFT from "../MyNFTs/UpdateNFT/UpdateNFT";
import DeleteNFT from "../MyNFTs/DeleteNFT/DeleteNFT";
import axios from "axios";

import moment from 'moment'
const OneNfts = (props) => {
  
  const { currentUser, setIsLoading } = useContext(Context);
  const [owner, setOwner] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`http://localhost:3001/user/owner/${props.one.owner}`)
      .then((res) => setOwner(res.data));
  }, []);

  const Button = () => {
    if (!currentUser) {
      return (
        <button className="buy-btn" onClick={()=>navigate(`/login`)}><span>Purchase</span></button>
      );
    } else {
      if (currentUser._id === props.one.owner) {
        return (
          <div className="buttons">
            <UpdateNFT nft={props.one} />
            <DeleteNFT id={props.one._id} />
          </div>
        );
      } else {
        return (
          <button className="buy-btn" onClick={()=>{navigate(`/BuyNFT/${props.one._id}`)}}><span>Purchase</span></button>
        );
      }
    }
  };

  return (
    <div className="nft" >
      <div className="main" onClick={currentUser ? ()=>navigate(`/BuyNFT/${props.one._id}`) : ()=>navigate(`/login`)}>
        <img className="tokenImage" src={props.one.image} alt="NFT" />
        <h2 className="nftName">{props.one.nftName}</h2>
        <p className="description" style={{height:"39px"}}>{props.one.description}</p>
        <hr />
        <div className="tokenInfo">
          <div className="price">
            <ins>◘{props.one.price} ETH</ins>
          </div>
          <div className="duration">
            <ins>◷{moment(props.one.updatedAt).fromNow()}</ins>
          </div>
        </div>
      </div>
      {Button()}
      {owner && (
        <div className="creator">
          <hr />
          <div className="wrapper">
            <img src={owner.image} alt="Creator" />
          </div>
          <p><ins>Creation of</ins><Link to={`/profile/${owner._id}`} className="nav-link">{owner.username}</Link></p>
        </div>
      )}
    </div>
  );
};

export default OneNfts;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import './Buy.css'

const BuyNFT = () => {
  const { id } = useParams();
  console.log(id);
  const [buyData, setBuyData] = useState([]);
  const getOne = async () => {
    const res = await axios.get(`http://localhost:3001/NFT/getOne/${id}`);
    setBuyData(res.data);
  };
  useEffect(() => {
    getOne();
  }, []);
  console.log(buyData);
  return (
    <>
      <div className= "nft-box">
        {buyData.length > 0 && (
          <div className="allinfo">
            <br />
            <br />
            <img className="image" src={buyData[0].image} alt="NFT" />
            <br />
            <br />
            <div className="info1">
            <br />
            <br />
            <h2 style={{ color: "white" }}>{buyData[0].nftName} #42</h2>
            <br />
            <br />
            <p className="description">{buyData[0].description}</p>
            <hr />
            <div className="info">
              <div className="price">
                <ins>◘{buyData[0].price} ETH</ins>
              </div>
              <div className="duration">
                <ins>◷ {moment(buyData.created_at).format("MMM Do YY")}</ins>
              </div>
            </div>
            <button>Buy</button>
            </div>
            
          </div>
        )}
        <br />
      </div>
    </>
  );
};
export default BuyNFT;

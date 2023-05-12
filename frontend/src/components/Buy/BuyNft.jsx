import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import './Buy.css'
import { Context } from "../Context/Context";
import Spinner from "../Spinner/Spinner";

const BuyNFT = () => {
  const { currentUser, isLoading, setIsLoading }=useContext(Context)
  const { id } = useParams();
  const [buyData, setBuyData] = useState([]);
  const navigate=useNavigate()
  const getOne = async () => {
    const res = await axios.get(`http://localhost:3001/NFT/getOne/${id}`);
    setBuyData(res.data);
    setIsLoading(false)
  };
  useEffect(() => {
    if(currentUser){
      if(currentUser.NFTs.includes(id)){
        navigate("/")
      }
    }
    getOne();
  }, []);

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
            <h2 style={{ color: "white" }}>{buyData[0].nftName}</h2>
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
      {isLoading && <Spinner/>}
    </>
  );
};
export default BuyNFT;

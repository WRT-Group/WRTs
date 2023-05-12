import React, { useEffect, useState } from "react";
import axios from "axios";
import OneNfts from "../../NFTs/OneNfts";
import AddNFT from "../AddNFT/AddNFT";
import { useParams } from "react-router-dom";
import "./MyNFTs.css";

const MyNFTs = () => {
  const { id } = useParams();
  const [userNFTs, setUserNFTs] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/NFT/${id}`)
      .then((res) => setUserNFTs(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="my-nfts">
        {userNFTs.map((e, i) => (
          <div className="one" key={i}>
            <OneNfts one={e} />
          </div>
        ))}
      </div>
      <AddNFT />
    </>
  );
};

export default MyNFTs;

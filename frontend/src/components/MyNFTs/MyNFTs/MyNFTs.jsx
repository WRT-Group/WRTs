import React, { useEffect, useState } from "react";
import "./MyNFTs.css";
import axios from "axios";
import OneNfts from "../../NFTs/OneNfts";
import AddNFT from "../AddNFT/AddNFT";
import { useParams } from "react-router-dom";

const MyNFTs = (props) => {
  const { id } = useParams();
  const [userNFTs, setUserNFTs] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/NFT/${id}`)
      .then((res) => setUserNFTs(res.data))
      .catch((err) => console.log(err));
  }, [props.id]);
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

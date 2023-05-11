import React, { useEffect, useState } from "react";
import "./MyNFTs.css";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../Context/Context";
import OneNfts from "../../NFTs/OneNfts";
import AddNFT from "../AddNFT/AddNFT";
import Navbar from "../../Navbar/Navbar";
const MyNFTs = () => {
  const { currentUser } = useContext(Context);
  const [userNFTs, setUserNFTs] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/NFT/${currentUser.id}`)
      .then((res) => setUserNFTs(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="my-nfts">
        {userNFTs.map((e, i) => (
          <div className="one">
            <OneNfts key={i} one={e} />
          </div>
        ))}
      </div>
      <AddNFT />
    </>
  );
};

export default MyNFTs;

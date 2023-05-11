import React, { useEffect, useState } from "react";
import "./MyNFTs.css";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../Context/Context";
import OneNfts from "../../NFTs/OneNfts";
import AddNFT from "../AddNFT/AddNFT";

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
          <>
            <OneNfts key={i} one={e} />
          </>
        ))}
      </div>
      <AddNFT />
    </>
  );
};

export default MyNFTs;

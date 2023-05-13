import React, { useEffect, useState } from "react";
import axios from "axios";
import OneNfts from "../../NFTs/OneNfts";
import { useParams } from "react-router-dom";
import "./MyNFTs.css";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";

const MyNFTs = (props) => {
  const { id } = useParams();
  const [userNFTs, setUserNFTs] = useState([]);

  useEffect(() => {
    fetchData()
  }, [props.id]);

  const fetchData = async () => {
   const res = await axios
      .get(`http://localhost:3001/NFT/owner/${props.id}`)
      .catch((err) => console.log(err));
    setUserNFTs(res.data) 
  }

  return (
      <MDBRow >
        {userNFTs.map((e, i) => (
          <MDBCol key={i}  >
            <OneNfts one={e} />
          </MDBCol>
        ))}
      </MDBRow>
  );
};

export default MyNFTs;

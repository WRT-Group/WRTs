import React, { useEffect, useState } from "react";
import axios from "axios";
import OneNfts from "../../NFTs/OneNfts";
import { useParams } from "react-router-dom";
import "./MyNFTs.css";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";

const MyNFTs = (props) => {
  const { id } = useParams();
  const [userNFTs, setUserNFTs] = useState([]);
  const [rows, setRows] = useState([])

  useEffect(() => {
    fillRows()
  }, [props.id]);

  const fillRows = async () => {
   const res = await axios
      .get(`http://localhost:3001/NFT/owner/${id}`)
      .catch((err) => console.log(err));
    setUserNFTs(res.data) 
    console.log(userNFTs)
    let arr = []
    for (let i = 0; i < userNFTs.length; i += 2) {
      arr.push(
        <MDBRow key={i} style={{padding: "10px"}}>
          <MDBCol>
            <OneNfts one={userNFTs[i]} />
          </MDBCol>
          {userNFTs[i + 1] && 
          <MDBCol>
            <OneNfts one={userNFTs[i + 1]} />
          </MDBCol>}
        </MDBRow>
      )
    }
    setRows(arr)
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

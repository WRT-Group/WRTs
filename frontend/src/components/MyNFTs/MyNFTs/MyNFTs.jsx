import React, { useEffect, useState } from "react";
import axios from "axios";
import OneNfts from "../../NFTs/OneNfts";
import { useParams } from "react-router-dom";
import "./MyNFTs.css";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";

const MyNFTs = (props) => {
  const { id } = useParams();
  const [userNFTs, setUserNFTs] = useState({});
  const [rows, setRows] = useState([])

  useEffect(() => {
    axios
      .get(`http://localhost:3001/NFT/owner/${id}`)
      .then((res) => {
        setUserNFTs(res.data);
        fillRows()
      })
      .catch((err) => console.log(err));

  }, [props.id]);

  const fillRows = () => {
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
      <div className="my-nfts">
        {rows}
        {/* {userNFTs.map((e, i) => (
          <div style={{padding: "10px"}} key={i}>
            <OneNfts one={e} />
          </div>
        ))} */}
      </div>
  );
};

export default MyNFTs;

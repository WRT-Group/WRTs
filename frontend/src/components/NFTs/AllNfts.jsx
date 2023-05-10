import React, { useEffect, useState } from "react";
import OneNfts from "./OneNfts";
import axios from 'axios'
import './AllNfts.css'
const AllNfts=()=>{
    const [NFTdata,setNFTdata]=useState([])
    const fetch=async()=>{
        const res=await axios.get("http://localhost:3001/NFT/getAll")
        setNFTdata(res.data)
    }
    useEffect(()=>{
        fetch();
    },[])
    return (
        <div className="all">
            {NFTdata.map((one,i)=>{
                return <OneNfts key={i} one={one}/>
            })}
        </div>
    )
};
export default AllNfts;
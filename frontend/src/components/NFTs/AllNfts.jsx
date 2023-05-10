import React, { useContext, useEffect, useState } from "react";
import OneNfts from "./OneNfts";
import './AllNfts.css'
import { Context } from "../Context/Context";

const AllNfts=()=>{
    const { data }=useContext(Context)
    
    return (
        <>
        <br />
        <br />
        <br />
        <h1>Marketplace</h1><br/>
        <div className="all">
            {data.map((one,i)=>{
                return <OneNfts key={i} one={one}/>
            })}
        </div>
        </>
    )
};
export default AllNfts;
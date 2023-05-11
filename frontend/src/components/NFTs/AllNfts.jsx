import React, { useContext } from "react";
import { motion } from "framer-motion";
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
        <motion.h1 initial={{y: -10, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{ ease: "easeOut"}}>Marketplace</motion.h1><br/>
        <div className="all">
            {data.map((one,i)=>{
                return <OneNfts key={i} one={one}/>
            })}
        </div>
        </>
    )
};
export default AllNfts;
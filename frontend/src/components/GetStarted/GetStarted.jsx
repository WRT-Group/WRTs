import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import './GetStarted.css'
import { Context } from "../Context/Context";


const GetStarted=()=>{

    const { currentUser }=useContext(Context)
    const navigate=useNavigate()

    useEffect(()=>{
        if(currentUser){
            navigate("/")
        }
    },[])

    return(
        <div>
            <div className="getStarted">
                <div className="card" style={{backgroundColor:"#b400ff", color:"white" ,width:"8800px"}}>
                    <motion.img initial={{x: -35}} animate={{x: 0}} transition={{duration: 0.2}} className="card-img-top" src="https://duet-cdn.vox-cdn.com/thumbor/0x0:2040x1360/750x500/filters:focal(1020x680:1021x681):format(webp)/cdn.vox-cdn.com/uploads/chorus_asset/file/23603505/VRG_Illo_5265_M_Li_NFT_explainer.jpg" rel="nft"/>
                    <div className="card-body">
                        <motion.div initial={{y: 40}} animate={{y: 0}}> 
                            <h1 className="card-title">Sign up now <br/>(it’s free!)</h1>
                            <p className="card-text">If you’re curious about NFT technology but you’re unsure of what it is or how <br/>it may be relevant to arts and cultural organisations,<br/> then you’re in the right place.</p><br/>
                        </motion.div>
                            <motion.button initial={{scale: 0.5}} animate={{scale: 1}} style={{backgroundColor:"#3e3e3e", fontFamily:"Pixel" }} onClick={()=>navigate("/signup")}><Link to="/signup">Go To Sign-Up</Link></motion.button>
                    </div>
                </div>  
                
                <motion.div className="card" style={{backgroundColor:"#623462" ,color:"white"}}>
                    <motion.div initial={{y: -50}} animate={{y: 0}}>
                        <h2 style={{fontFamily: "Pixel"}}>What is an NFT?</h2>
                        <h3 style={{fontFamily:"Maginer"}}>What does NFT stand for?</h3> 
                        <h4 style={{fontFamily:"Maginer"}}>That doesn’t make it any clearer.</h4>
                        <p style={{fontFamily:"Maginer"}}>Right, sorry. “Non-fungible” more or less means that it’s unique and can’t be 
                            replaced with something else. For example, a bitcoin is fungible — trade 
                            one for another bitcoin, and you’ll have exactly the same thing.A one-of-a-kind 
                            trading card, however, is non-fungible. If you traded it for a different card, 
                            you’d have something completely different. You gave up a Squirtle, and got 
                            a 1909 T206 Honus Wagner, which StadiumTalk calls “the Mona Lisa of baseball 
                            cards.” (I’ll take their word for it.)</p><br />
                            <br />
                            <br />
                            <br />
                            <br />
                    </motion.div>
                    <h6 style={{fontFamily:"Maginer"}}>© 2023 WRTs . ALL RIGHTS RESERVED</h6>
                </motion.div>
            </div>
        </div>

    )
}

export default GetStarted;


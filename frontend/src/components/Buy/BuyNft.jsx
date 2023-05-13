import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { motion } from "framer-motion";
import Modal from "react-bootstrap/Modal"
import { Context } from "../Context/Context";
import Spinner from "../Spinner/Spinner";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

import './Buy.css'
import OneNfts from "../NFTs/OneNfts";


const BuyNFT = () => {
  const { currentUser, isLoading, setIsLoading }=useContext(Context)
  const { id } = useParams();
  const navigate=useNavigate()
  const [buyData, setBuyData] = useState(null);
  const [ownerNFTs, setOwnerNFTs] = useState(null);
  const [owner, setOwner] = useState(null);
  const [show, setShow] = useState(false);

  const getOne = async () => {
     await axios.get(`http://localhost:3001/NFT/getOne/${id}`).then((res) => setBuyData(res.data))
  };
  
  useEffect(() => {
    if(currentUser){
      console.log(currentUser)
      if(currentUser.NFTs.includes(id)){
        navigate("/")
      }
    }
    window.scrollTo({
      top:0,
      behavior: "smooth"
    })
    getOne()
  }, [id]);

  useEffect(() => {
    if (ownerNFTs) {
      console.log(ownerNFTs)
      return 
    }
    if (buyData && !owner) {
      axios
      .get(`http://localhost:3001/user/getUser/${buyData.owner}`)
      .then((res) => {
        setOwner(res.data);
      })
      .catch(err => console.log(err))
    }
    if (owner) {
      console.log(owner)
      axios
      .get(`http://localhost:3001/NFT/owner/${owner._id}`)
      .then((res) => {
        setOwnerNFTs(res.data);
        setIsLoading(false)
      })
      .catch(err => console.log(err))
    }
    setIsLoading(false)
  }, [buyData, owner])


  const handleSubmit=()=>{
    console.log(owner)
    const purchaseRequest={
      nftId: buyData._id,
      price: Number(buyData.price),
      sellerid: owner._id,
      buyerid: currentUser._id
    }
    axios.put("http://localhost:3001/NFT/purchase",purchaseRequest,{
      headers: {Authorization: currentUser.token}
    })
    .then(res=>{
      if(res.data==="no funds"){
        alert("no funds")
      }
      else{
        alert("purchase successful")
        window.localStorage.setItem("currentUser", JSON.stringify({...currentUser, NFTs: res.data.updatedUser.NFTs, balance: res.data.updatedUser.balance}))
        navigate("/")
        window.location.reload()
      }
    })
  }

  return (
    <>
        {buyData && owner && (
          <MDBContainer>
            <MDBRow>
              <MDBCol className="column" md={4}>
                <motion.img onClick={() => setShow(true)} whileHover={{scale: 1.1}} transition={{duration: 0.9}} src={buyData.image} alt="NFT Image" />
              </MDBCol>
              <MDBCol className="column-desc" md={7}>
                <MDBRow id="info">
                  <h1 style={{marginBottom: '2rem', fontFamily: "Pixel"}}>{buyData.nftName}</h1>
                  <p style={{fontFamily: "Maginer", fontSize: "22px", color:"white", width: "43vw", height: "6vh"}}>{buyData.description}</p>
                </MDBRow>
                <MDBRow className="price-duration">
                  <p style={{fontFamily: "Maginer", fontSize: "22px", color:"pink", marginTop: "2rem"}}>⟨ð⟩{buyData.price} ETH</p>
                  <p style={{fontFamily: "Maginer", fontSize: "22px", color:"pink", marginTop: "2rem"}}>◷{moment(buyData.updatedAt).fromNow()}</p>
                </MDBRow>
                <MDBRow className="one-creator">
                  <>
                    <div className="one-wrapper">
                      <img src={owner.image} alt="Creator" />
                    </div>
                    <p id="creator-desc">
                      <ins>Creation of {" "} </ins>
                      <Link style={{marginLeft: "4px"}} to={`/profile/${owner._id}`} className="nav-link">
                        {owner.username}
                      </Link>
                    </p>
                  </>
                  <button className="one-buy-btn" onClick={handleSubmit}>Get it Now!</button>
                </MDBRow>
              </MDBCol>
            </MDBRow>
            <Modal show={show} fullscreen={true} id="modal" onHide={() => setShow(false)}>
              <Modal.Header closeButton>
                <Modal.Title style={{fontFamily: "Pixel"}}>{buyData.nftName}</Modal.Title>
              </Modal.Header>
              <Modal.Body><img className="fullscreen-img" src={buyData.image} /></Modal.Body>
            </Modal>
            
          </MDBContainer>
        )}
        {ownerNFTs && (
          <MDBContainer id="others">
            <MDBRow >
                <MDBRow id="title">
                  <h1>Other NFTs by {owner.username}</h1>
                </MDBRow>
                <MDBRow>
                  {ownerNFTs.filter((e) => e._id !== id).map((e, i) => (
                    <MDBCol key={i} sm={6} md={6} lg={4}>
                      <OneNfts one={e} />
                    </MDBCol>
                  ))}
                </MDBRow>
            </MDBRow>
          </MDBContainer>
        )}
        {isLoading && <Spinner/>}
    </>
  );
};
export default BuyNFT;

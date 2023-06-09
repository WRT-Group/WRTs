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
import GreenAlert from '../Alerts/GreenAlert';
import RedAlert from '../Alerts/RedAlert';

import './Buy.css'
import OneNfts from "../NFTs/OneNfts";


const BuyNFT = () => {
  const { currentUser, isLoading, setIsLoading, refreshUser, setAlertText, isGreen, setIsGreen, isRed, setIsRed, alertText  }=useContext(Context)
  const { id } = useParams();
  const navigate=useNavigate()
  const [buyData, setBuyData] = useState(null);
  const [ownerNFTs, setOwnerNFTs] = useState(null);
  const [owner, setOwner] = useState(null);
  const [show, setShow] = useState(false);

  const getOne = async () => {
     await axios.get(`${import.meta.env.VITE_URL}/NFT/getOne/${id}`).then((res) => setBuyData(res.data))
  };
  
  useEffect(() => {
    if(currentUser){
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
      return 
    }
    if (buyData && !owner) {
      axios
      .get(`${import.meta.env.VITE_URL}/user/getUser/${buyData.owner}`)
      .then((res) => {
        setOwner(res.data);
      })
      .catch(err => console.log(err))
    }
    if (owner) {
      axios
      .get(`${import.meta.env.VITE_URL}/NFT/owner/${owner._id}`)
      .then((res) => {
        setOwnerNFTs(res.data);
        setIsLoading(false)
      })
      .catch(err => console.log(err))
    }
    setIsLoading(false)
  }, [buyData, owner])


  const handleSubmit=()=>{
    const purchaseRequest={
      nftId: buyData._id,
      price: Number(buyData.price),
      sellerid: owner._id,
      buyerid: currentUser._id
    }
    axios.put(`${import.meta.env.VITE_URL}/NFT/purchase`,purchaseRequest,{
      headers: {"Authorization": currentUser.token}
    })
    .then(res=>{
      if(res.data==="no funds"){
        setAlertText("Insufficient funds.")
        setIsRed(true)
        setTimeout(() => {
          setIsRed(false)
        }, 2000)
      }
      else{
        setAlertText("Purchase successful. Redirecting...")
        setIsGreen(true) 
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        })
        refreshUser(JSON.stringify({...currentUser, NFTs: res.data.updatedUser.NFTs, balance: res.data.updatedUser.balance}))
        setTimeout(() => {
          setIsGreen(false)
          navigate("/");
          window.location.reload();
        }, 1200)
      }
    })
  }

  return (
    <>  
        {isGreen && <GreenAlert text={alertText} />}
        {isRed && <RedAlert text={alertText} />}
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
                <div className="nft-desc">
                    <span id="price" style={{fontFamily: "Maginer", fontSize: "22px"}}>⟨ð⟩{buyData.price} ETH</span>
                    <span id="date"><span id="clock">◷ </span>{moment(buyData.createdAt).fromNow()}</span>
                </div>
                <hr/>
                <MDBRow className="one-creator">
                    <div className="one-wrapper">
                      <img src={owner.image} alt="Creator" />
                    </div>
                    <p id="creator-desc">
                      <ins>Creation of {" "} </ins>
                      <Link style={{marginLeft: "4px"}} to={`/profile/${owner._id}`} className="nav-link">
                        {owner.username}
                      </Link>
                    </p>
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

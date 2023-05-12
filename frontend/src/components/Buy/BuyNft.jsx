import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { motion } from "framer-motion";
import Modal from "react-bootstrap/Modal"

import './Buy.css'
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const BuyNFT = () => {
  const { id } = useParams();
  const [buyData, setBuyData] = useState(null);
  const [owner, setOwner] = useState({});
  const [show, setShow] = useState(false);

  const getOne = async () => {
     await axios.get(`http://localhost:3001/NFT/getOne/${id}`).then((res) => setBuyData(res.data))
     axios
      .get(`http://localhost:3001/user/owner/${buyData.owner}`)
      .then(async (res) => setOwner(res.data));
  };
  useEffect(() => {
    getOne();
  }, []);

  return (
    <>
        {buyData && (
          <MDBContainer>
            <MDBRow>
              <MDBCol className="column" md={4}>
                <motion.img onClick={() => setShow(true)} whileHover={{scale: 1.1}} transition={{duration: 0.9}} src={buyData.image} alt="NFT Image" />
              </MDBCol>
              <MDBCol className="column-desc" md={7}>
                <MDBRow id="info">
                  <h1 style={{marginBottom: '2rem', fontFamily: "Pixel"}}>{buyData.nftName}</h1>
                  <p style={{fontFamily: "Maginer", fontSize: "22px", color:"white", width: "23vw", height: "6vh"}}>{buyData.description}</p>
                </MDBRow>
                <MDBRow>
                  <p style={{fontFamily: "Maginer", fontSize: "22px", color:"pink", marginTop: "4rem"}}>⟨ð⟩{buyData.price} ETH</p>
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
                  <button className="one-buy-btn">Get this NFT now!</button>
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
    </>
  );
};
export default BuyNFT;

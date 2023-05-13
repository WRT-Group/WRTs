import React, { useState, useContext, useEffect } from 'react';
import axios from "axios"
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MDBCol, MDBInput } from "mdb-react-ui-kit";
import { Context } from '../Context/Context';
import "./Balance.css"
import RedAlert from '../Alerts/RedAlert';
import YellowAlert from '../Alerts/YellowAlert';
import GreenAlert from '../Alerts/GreenAlert';

const Balance = () => {

  const { currentUser, setIsLoading, setCurrentUser, refreshUser, setIsGreen, setIsYellow, setIsRed }=useContext(Context)
  const [show,setShow]=useState(false)
  const [walletId,setWalletId]=useState("")
  const [security,setSecurity]=useState("")
  const [amount,setAmount]=useState("")
  const [redAlert,setRedAlert]=useState(false)
  const [yellowAlert,setYellowAlert]=useState(true)
  const [greenAlert,setGreenAlert]=useState(false)

  const handleSubmit=async ()=>{
    if(false){
      
    }
    else{
      setIsLoading(true)
      const depositRequest={
        walletid: walletId,
        securityKey: security,
        amount: Number(amount)
      }
      
      const request=await axios.put(`${import.meta.env.VITE_URL}/wallet/deposit/${currentUser._id}`,depositRequest,{
        headers: {Authorization: currentUser.token}
      })
      //TODO: NEED TO ADD RED, YELLOW AND GREEN ALERTS TO THESE CONDITIONS!
      setIsLoading(false)
      if(request.data==="fill all fields"){
        setIsRed(true);
        setTimeout(() => {setIsRed(false)}, 1500) // red
      }
      else if(request.data==="wallet doesn't exist"){
        alert("wallet doesn't exist") // yellow
      }
      else if(request.data==="Invalid Security Key"){
        alert("invalid security key") // yellow
      }
      else if(request.data==="Insufficient balance in the wallet"){
        alert("Insufficient balance in the wallet") // yellow
      }
      else if(request.data.message==="Balance transferred successfully"){
        setIsGreen(true);
        setTimeout(() => {setIsGreen(false)}, 1500) // green
        refreshUser(JSON.stringify({...currentUser, balance: +request.data.updatedUser.balance}))
        window.location.reload()
      }
    }
  }
  
  const handleClose=()=>setShow(false)
  const handleShow=()=>setShow(true)

  const balance=String(currentUser.balance)

  return (
    <>
      <li className="nav-item">
        <div className="nav-link" id="balance-button" onClick={handleShow}>Balance: {balance} ETH</div>
      </li>

      <Modal show={show} onHide={handleClose} id="modal">
      <Modal.Header closeButton>
        <Modal.Title style={{ fontFamily: "Pixel" }}>
          Deposit Balance
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form id="wallet-container">
        <MDBCol md="10" className="mb-4">
          <label className="wallet-label">Wallet ID</label>
          <MDBInput
            maxLength={24}
            className="mb-2 wallet-input"
            onChange={(e) => setWalletId(e.target.value)}
          />
          <label className="wallet-label">Security Number</label>
          <MDBInput
            maxLength={4}
            className="mb-2 wallet-input"
            onChange={(e) => setSecurity(e.target.value)}
          />
          <label className="wallet-label">Amount</label>
          <MDBInput
            type='number'
            className="mb-2 wallet-input"
            onChange={(e) => setAmount(e.target.value)}
          />
        </MDBCol>
          <Button
            id="wallet-submit"
            onClick={handleSubmit}
          >
            Deposit
          </Button>
        </form>
      </Modal.Body>
     </Modal>

    </>
  );
};

export default Balance;
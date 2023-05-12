import React, { useState, useContext } from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MDBCol, MDBInput } from "mdb-react-ui-kit";
import { Context } from '../Context/Context';
import "./Balance.css"

const Balance = () => {

  const { currentUser }=useContext(Context)
  const [show,setShow]=useState(false)
  const [walletId,setWalletId]=useState("")
  const [security,setSecurity]=useState("")

  const handleClose=()=>setShow(false)
  const handleShow=()=>setShow(true)

  return (
    <>
      <li className="nav-item">
        <div className="nav-link" id="balance-button" onClick={handleShow}>Balance: {currentUser.balance}</div>
      </li>

      <Modal show={show} onHide={handleClose} id="modal">
      <Modal.Header closeButton>
        <Modal.Title style={{ fontFamily: "Pixel" }}>
          Deposit Balance
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form id="wallet-container" onSubmit={(e) => handleSubmit(e)}>
        <MDBCol md="10" className="mb-4">
          <label className="wallet-label">Wallet ID</label>
          <MDBInput
            className="mb-2 wallet-input"
            onChange={(e) => setWalletId(e.target.value)}
            maxLength={4}
          />
          <label className="wallet-label">Security Number</label>
          <MDBInput
            className="mb-2 wallet-input"
            onChange={(e) => setSecurity(e.target.value)}
          />
        </MDBCol>
          <Button
            variant="primary"
            type="submit"
            id="wallet-submit"
            onClick={handleClose}
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
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "./AddNFT.css";
import { MDBCol, MDBInput, MDBTextArea } from "mdb-react-ui-kit";
import axios from "axios";

function AddNFT() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNFT = {
      nftName: name,
      price,
      image,
      description,
      owner: "owner_id", //  ! TODO: Once we figure out how we're storing user data revisit this
    };

    axios
      .post("http://localhost:3001/NFT/add", newNFT, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => alert(res.data.message));
  };

  return (
    <>
      <Button onClick={handleShow} id="addNFT">
        <img src="../../../../assets/plus.png" width={100} height={100} />
      </Button>

      <Modal show={show} onHide={handleClose} id="modal">
        <Modal.Header closeButton>
          <Modal.Title style={{fontFamily: "Pixel"}}>Publish your NFT!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="form-container" onSubmit={(e) => handleSubmit(e)}>
            <MDBCol md="10" className="mb-4">
              <label>NFT Name</label>
              <MDBInput
                className="mb-2"
                onChange={(e) => setName(e.target.value)}
              />
              <label>Description</label>
              <MDBTextArea
                className="mb-2"
                onChange={(e) => setDescription(e.target.value)}
              />
              <label>NFT Price</label>
              <MDBInput
                className="mb-2"
                onChange={(e) => setPrice(e.target.value)}
              />
              <label>Image Url</label>
              <MDBInput onChange={(e) => setImage(e.target.value)} />
            </MDBCol>
            <Button
              variant="primary"
              type="submit"
              id="submitNFT"
              onClick={handleClose}
            >
              Add NFT
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ fontFamily: "Maginer" }}
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddNFT;

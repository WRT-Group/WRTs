import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

import { MDBCol, MDBInput, MDBTextArea } from "mdb-react-ui-kit";

import "./UpdateNFT.css";

const UpdateNFT = ({ nft }) => {
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
      nftName: name || nft.nftName,
      price: price || nft.price,
      image: image || nft.image,
      description: description || nft.description,
    };

    axios
      .put(`http://localhost:3001/NFT/edit/${nft._id}`, newNFT, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => alert(res.data.message));
  };

  return (
    <>
      <Button onClick={handleShow} className="update">
        <img src="../../../../assets/edit.png" width={25} height={25} />
      </Button>

      <Modal show={show} onHide={handleClose} id="modal">
        <Modal.Header closeButton>
          <Modal.Title style={{ fontFamily: "Pixel" }}>
            Customize your NFT!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="form-container" onSubmit={(e) => handleSubmit(e)}>
            <MDBCol md="10" className="mb-4">
              <label>NFT Name</label>
              <MDBInput
                defaultValue={nft.nftName}
                className="mb-2 nft-input"
                onChange={(e) => setName(e.target.value)}
              />
              <label>Description</label>
              <MDBTextArea
                defaultValue={nft.description}
                className="mb-2 nft-input"
                onChange={(e) => setDescription(e.target.value)}
              />
              <label>NFT Price</label>
              <MDBInput
                defaultValue={nft.price}
                className="mb-2 nft-input"
                onChange={(e) => setPrice(e.target.value)}
              />
              <label>Image Url</label>
              <MDBInput
                defaultValue={nft.image}
                className="nft-input"
                onChange={(e) => setImage(e.target.value)}
              />
            </MDBCol>
            <Button
              variant="primary"
              type="submit"
              id="submitNFT"
              onClick={handleClose}
            >
              Update
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
};

export default UpdateNFT;

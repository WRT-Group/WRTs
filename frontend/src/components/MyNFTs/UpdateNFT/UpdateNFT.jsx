import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

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
                className="mb-2 nft-input"
                onChange={(e) => setName(e.target.value)}
              />
              <label>Description</label>
              <MDBTextArea
                className="mb-2 nft-input"
                onChange={(e) => setDescription(e.target.value)}
              />
              <label>NFT Price</label>
              <MDBInput
                className="mb-2 nft-input"
                onChange={(e) => setPrice(e.target.value)}
              />
              <label>Image Url</label>
              <MDBInput
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
};

export default UpdateNFT;

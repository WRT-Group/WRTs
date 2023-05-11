import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "./AddNFT.css";
import { MDBCol, MDBInput, MDBTextArea } from "mdb-react-ui-kit";
import axios from "axios";
import { Context } from "../../Context/Context";

function AddNFT() {
  const { currentUser } = useContext(Context);

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
      owner: currentUser.id,
    };

    axios
      .post("http://localhost:3001/NFT/add", newNFT, {
        headers: {
          "Content-Type": "application/json",
          Authorization: currentUser.token,
        },
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
          <Modal.Title style={{ fontFamily: "Pixel" }}>
            Publish your NFT!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="form-container" onSubmit={(e) => handleSubmit(e)}>
            <MDBCol md="10" className="mb-4">
              <label className="add-nft-label">NFT Name</label>
              <MDBInput
                className="mb-2 nft-input"
                onChange={(e) => setName(e.target.value)}
              />
              <label className="add-nft-label">Description</label>
              <MDBTextArea
                className="mb-2 nft-input"
                onChange={(e) => setDescription(e.target.value)}
              />
              <label className="add-nft-label">NFT Price</label>
              <MDBInput
                className="mb-2 nft-input"
                onChange={(e) => setPrice(e.target.value)}
              />
              <label className="add-nft-label">Image Url</label>
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
      </Modal>
    </>
  );
}

export default AddNFT;

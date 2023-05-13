import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "./AddNFT.css";
import { MDBCol, MDBInput, MDBTextArea } from "mdb-react-ui-kit";
import axios from "axios";
import Dropzone from "react-dropzone";
import { Context } from "../../Context/Context";

function AddNFT() {
  const { currentUser, setIsLoading, setIsGreen, setIsRed, setIsYellow } = useContext(Context);

  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const newNFT = {
      nftName: name,
      price,
      image,
      description,
      owner: currentUser._id,
    };

    await axios
      .post("http://localhost:3001/NFT/add", newNFT, {
        headers: {
          "Content-Type": "application/json",
          Authorization: currentUser.token,
        },
      }).then((res) => window.localStorage.setItem("currentUser", JSON.stringify(res.data)))
      setIsGreen(true)
      setTimeout(()=>{setIsGreen(false);window.location.reload()},2000)
      setIsLoading(false)  
  };

  const onDrop = async (acceptedFiles) => {
    const file = await convertToBase64(acceptedFiles[0]);
    setImage(file);
  };

  const convertToBase64 = (file) => {
    return new Promise((res, rej) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        res(fileReader.result);
      };

      fileReader.onerror = (error) => {
        rej(error);
      };
    });
  };

  return (
    <>
      <Button onClick={handleShow} id="addNFT">
        <img src="../../../../assets/plus.png" width={50} height={50} />
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
                maxLength={82}
              />
              {description.length>80 && <p style={{color:"red" , opacity:0.6}}>The description is very long</p>}
              <label className="add-nft-label">NFT Price</label>
              <MDBInput
                className="mb-2 nft-input"
                onChange={(e) => setPrice(e.target.value)}
              />
              <label className="add-nft-label">
                Drag and drop your NFT image here
              </label>
              <Dropzone onDrop={onDrop}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()} className="dropzone">
                    <input {...getInputProps()} />
                  </div>
                )}
              </Dropzone>
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

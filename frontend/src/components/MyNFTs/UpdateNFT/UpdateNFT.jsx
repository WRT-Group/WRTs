import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

import { MDBCol, MDBInput, MDBTextArea } from "mdb-react-ui-kit";
import Dropzone from "react-dropzone";

import "./UpdateNFT.css";
import { Context } from "../../Context/Context";

const UpdateNFT = ({ nft }) => {
  const { currentUser, setIsLoading, setIsGreen, setAlertText } = useContext(Context);

  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    const newNFT = {
      nftName: name || nft.nftName,
      price: price || nft.price,
      image: image || "",
      description: description || nft.description,
    };

    await axios
      .put(`${import.meta.env.VITE_URL}/NFT/edit/${nft._id}`, newNFT, {
        headers: {
          "Content-Type": "application/json",
          Authorization: currentUser.token,
        },
      })
      setIsGreen(true)
      setAlertText("NFT Updated successfully")
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
      setTimeout(()=>{setIsGreen(false);window.location.reload()},1200)
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
      <Button onClick={handleShow} className="update">
        <img src="https://res.cloudinary.com/dszx3pd6j/image/upload/v1684024640/edit_udv8up.png" width={25} height={25} />
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
              Update
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UpdateNFT;

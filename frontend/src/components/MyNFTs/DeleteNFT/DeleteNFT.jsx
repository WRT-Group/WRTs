import React, { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../Context/Context";
import Button from "react-bootstrap/Button";

import "./DeleteNFT.css";

const DeleteNFT = ({ id }) => {
  const [clicked, setClicked] = useState(false);
  const { setIsLoading, refreshUser }=useContext(Context)
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const handleDelete = async () => {
    setIsLoading(true)
    await axios
      .delete(`${import.meta.env.VITE_URL}/NFT/delete/${id}/${currentUser._id}`, {
        headers: { Authorization: currentUser.token },
      }).then((res) => refreshUser(JSON.stringify({...currentUser, NFTs: res.data.NFTs})))
      .catch((err) => console.log(err));
      setIsLoading(false)
      window.location.reload()
  };
  return (
    <>
      {!clicked ? (
        <Button className="delete" onClick={() => setClicked(true)}>
          <img src="https://res.cloudinary.com/dszx3pd6j/image/upload/v1684024640/trash_qi7wx0.png" width={25} height={25} />
        </Button>
      ) : (
        <Button className="delete" onClick={handleDelete}>
          Confirm
        </Button>
      )}
    </>
  );
};

export default DeleteNFT;

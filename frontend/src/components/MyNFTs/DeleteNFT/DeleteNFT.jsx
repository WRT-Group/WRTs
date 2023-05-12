import React, { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../Context/Context";
import Button from "react-bootstrap/Button";

import "./DeleteNFT.css";

const DeleteNFT = ({ id }) => {
  const [clicked, setClicked] = useState(false);
  const { setIsLoading }=useContext(Context)
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const handleDelete = async () => {
    setIsLoading(true)
    await axios
      .delete(`http://localhost:3001/NFT/delete/${id}/${currentUser.id}`, {
        headers: { Authorization: currentUser.token },
      })
      .catch((err) => console.log(err));
      setIsLoading(false)
      window.location.reload()
  };
  return (
    <>
      {!clicked ? (
        <Button className="delete" onClick={() => setClicked(true)}>
          <img src="../../../../assets/trash.png" width={25} height={25} />
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

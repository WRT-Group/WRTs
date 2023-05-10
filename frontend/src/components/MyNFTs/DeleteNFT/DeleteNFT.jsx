import React, { useState } from "react";
import Button from "react-bootstrap/Button";

import "./DeleteNFT.css";
import axios from "axios";

const DeleteNFT = ({ id }) => {
  const [clicked, setClicked] = useState(false);
  const handleDelete = () => {
    axios
      .delete(`http://localhost:3001/NFT/delete/${id}`)
      .catch((err) => console.log(err));
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

import React, { useContext, useState } from "react";
import { Context } from "../Context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.css";
import GreenAlert from "../Alerts/GreenAlert";
import RedAlert from "../Alerts/RedAlert";

const ChangePassword = () => {
  const {
    currentUser,
    logout,
    isGreen,
    isRed,
    setIsGreen,
    setIsRed,
    alertText,
    setAlertText,
  } = useContext(Context);
  const [newPassword, setNewPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const navigate = useNavigate();

  const changePassword = async () => {
    await axios.put(
      `${import.meta.env.VITE_URL}/user/changePassword/${currentUser._id}`,
      { password: newPassword },
      {
        headers: { Authorization: currentUser.token },
      }
    );
    setAlertText("Password updated successfully!");
    setIsGreen(true);
    setTimeout(() => {
      setIsGreen(false);
      logout();
      navigate("/login");
    }, 1200);
  };

  const handleSubmit = () => {
    if (newPassword.length < 8) {
      setAlertText("Your password is not long enough");
      setIsRed(true);
      setTimeout(() => {
        setIsRed(false);
      }, 2000);
    }
    else if (confPassword !== newPassword) {
      setAlertText("You should confirm your new password");
      setIsRed(true);
      setTimeout(() => {
        setIsRed(false);
      }, 2000);
    } else {
      changePassword();
    }
    
  };

  return (
    <>
      {isRed && <RedAlert text={alertText} />}
      {isGreen && <GreenAlert text={alertText} />}
      <div className="change">
        <br />
        <br />
        <h3>Change your password:</h3>
        <input
          type="password"
          name="password"
          placeholder="New password"
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          name="confPassword"
          placeholder="confirm new password"
          onChange={(e) => setConfPassword(e.target.value)}
          required
        />
        <br />
        <button onClick={() => handleSubmit()}>Submit</button>
      </div>
    </>
  );
};

export default ChangePassword;

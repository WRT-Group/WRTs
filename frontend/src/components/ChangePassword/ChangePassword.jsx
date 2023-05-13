import React, { useContext, useState } from "react";
import { Context } from "../Context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './ChangePassword.css'
import GreenAlert from '../Alerts/GreenAlert';
import RedAlert from '../Alerts/RedAlert';


const ChangePassword=()=>{
    const {currentUser,logout, isGreen, isRed, setIsGreen, setIsRed, alertText, setAlertText}=useContext(Context)
    const [newPassword,setNewPassword]=useState("")
    const [confPassword,setConfPassword]=useState("")

    const navigate=useNavigate();
    const changePassword=async()=>{
        if (confPassword===newPassword){
            await axios.put(`http://localhost:3001/user/changePassword/${currentUser._id}`,{password:newPassword},{
                headers: {Authorization: currentUser.token}
            })
            setAlertText("Password updated successfully!")
            setIsGreen(true)
            setTimeout(() => {
                setIsGreen(false)
                logout();
                navigate('/login');
            })
        }
        else{
            setAlertText("You should confirm your new password")
            setIsRed(true)
            setTimeout(() => {
                setIsRed(false)
            }, 2000)
        }

    }
    return (
        <>
            {isRed && <RedAlert text={alertText} />}
            {isGreen && <GreenAlert text={alertText} />}
            <div className="change">
            
            <br/>
            <br/>
            <h3>Change your password:</h3>
            <input type="password" name="password" placeholder="New password" onChange={(e)=>setNewPassword(e.target.value)} required/>
            <input type="password" name="confPassword" placeholder="confirm new password" onChange={(e)=>setConfPassword(e.target.value)} required/><br/>
            <button onClick={()=>{
                changePassword();
                }}>Submit</button>
        </div>
        </>
        
    )
    
}
export default ChangePassword;
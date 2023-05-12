import React, { useContext, useState } from "react";
import { Context } from "../Context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './ChangePassword.css'
const ChangePassword=()=>{
    const {currentUser,logout}=useContext(Context)
    const [newPassword,setNewPassword]=useState("")
    const [confPassword,setConfPassword]=useState("")

    const navigate=useNavigate();
    const changePassword=async()=>{
        if (confPassword===newPassword){
            await axios.put(`http://localhost:3001/user/changePassword/${currentUser.id}`,{password:newPassword})
        }
        else{
            return alert("you should confirm your new password")
        }

    }
    return (
        <div className="change">
            <br/>
            <br/>
            <h3>Change your password:</h3>
            <input type="password" name="password" placeholder="New password" onChange={(e)=>setNewPassword(e.target.value)} required/>
            <input type="password" name="confPassword" placeholder="confirm new password" onChange={(e)=>setConfPassword(e.target.value)} required/><br/>
            <button onClick={()=>{
                changePassword();
                logout();
                navigate('/login')
                }}>Submit</button>
        </div>
    )
    
}
export default ChangePassword;
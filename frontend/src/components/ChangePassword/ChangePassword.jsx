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
            await axios.put(`http://localhost:3001/user/changePassword/${currentUser._id}`,{password:newPassword},{
                headers: {Authorization: currentUser.token}
            })
    }
    const handleSubmit=()=>{
        if (newPassword.length<8){
            return alert('you should make a valid password with 8 characters minimum')
        }
        if(confPassword!==newPassword){
            return alert("you should confirm your new password")
        }
        changePassword();
        logout();
        navigate('/login')
    }
    return (
        <div className="change">
            <br/>
            <br/>
            <h3>Change your password:</h3>
            <input type="password" name="password" placeholder="New password" onChange={(e)=>setNewPassword(e.target.value)} required/>
            <input type="password" name="confPassword" placeholder="confirm new password" onChange={(e)=>setConfPassword(e.target.value)} required/><br/>
            <button onClick={()=>handleSubmit()}>Submit</button>
        </div>
    )
    
}
export default ChangePassword;
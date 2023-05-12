import React, { useContext, useState } from "react";
import { Context } from "../Context/Context";
import axios from "axios";

const ChangePassword=()=>{
    const {currentUser,logout}=useContext(Context)
    const [newPassword,setNewPassword]=useState("")
    const [confPassword,setConfPassword]=useState("")

    const changePassword=async()=>{
        if (confPassword===newPassword){
            await axios.put(`http://localhost:3001/user/changePassword/${currentUser.id}`,{password:newPassword})
        }
        else{
            return alert("you should confirm your new password")
        }

    }
    return (
        <div>
            <input type="password" name="password" placeholder="New password" onChange={(e)=>setNewPassword(e.target.value)} required/>
            <input type="password" name="confPassword" placeholder="confirm new password" onChange={(e)=>setConfPassword(e.target.value)} required/>
            <button onClick={()=>{
                changePassword();
                logout();
                }}>Submit</button>
        </div>
    )
    
}
export default ChangePassword;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './profile.css'
import MyNFTs from '../MyNFTs/MyNFTs/MyNFTs'

const Profile=()=>{
    
    const {id}=useParams()
    const [show,setShow]=useState(false)
    const [oneUser,setOneUser]=useState({})
    const [obj,setObj]=useState({})
   
    const getOneUser=async ()=>{
        const res=await axios.get(`http://localhost:3001/user/${id}`)
        setOneUser(res.data[0])
        setObj(oneUser)
    }
    const handleChange=(e)=>{
        setObj(prev=>{
            return {
                ...prev,
                [e.target.name]:e.target.value
            }
        })
    }
    const editProfile=async()=>{
        await axios.put(`http://localhost:3001/user/${id}`,obj)
        setShow(!show)
    }
    useEffect(()=>{
        getOneUser()
    },[show])
    return (
        <div>
            <div className="myprofile">
            {oneUser && <div className="profile">
                    <br/>
                    <img src="https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg" alt="nft" />
                    <h1>{oneUser.username}</h1>
                    <br/>
                    <br/>
                    <h4>Full Name:{`${oneUser.fName} ${oneUser.lName}`}</h4>
                    <br/>
                    <h4>E-mail:{oneUser.email}</h4>
                    <br/>
                    <br/>
                    <button onClick={()=>{
                        setObj(oneUser)
                        setShow(!show)}}>Edit Profile</button>
                    <br/>
                    <br/>
                    {show && <div>
                        <input type="text" name="fName" value={obj.fName} placeholder="First Name" onChange={handleChange}/><br/>
                        <br/>
                        <input type="text" name="lName" value={obj.lName} placeholder="Last Name" onChange={handleChange}/><br/>
                        <br/>
                        <input type="text" name="username" value={obj.username} placeholder="username" onChange={handleChange}/><br/>
                        <br/>
                        <input type="text" name="email" value={obj.email} placeholder="example@mail.com" onChange={handleChange}/><br/>
                        <br/>
                        <button onClick={()=>editProfile()}>Update</button>
                    </div>}
                    <br/>
                </div>}
                <div>
                    <h1>My NFTs</h1>
                    <MyNFTs/>
                </div>
            </div>
            
        </div>
    )
}
export default Profile;
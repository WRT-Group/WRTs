import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './profile.css'
import MyNFTs from '../MyNFTs/MyNFTs/MyNFTs'
import { Context } from "../Context/Context";
const Profile=()=>{
    const {currentUser}=useContext(Context)
    const {id}=useParams()
    const [show,setShow]=useState(false)
    const [oneUser,setOneUser]=useState({})
    console.log(oneUser)
    const [obj,setObj]=useState({})
   
    const getOneUser=async ()=>{
        const res=await axios.get(`http://localhost:3001/user/getUser/${id}`)
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
        await axios.put(`http://localhost:3001/user/updateUser/${id}`,obj)
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
                    <img src={oneUser.image} alt="nft" />
                    <h1>{oneUser.username}</h1>
                    <br/>
                    <br/>
                    <h4>Full Name: {`${oneUser.fName} ${oneUser.lName}`}</h4>
                    <br/>
                    <h4>E-mail: <br></br>{oneUser.email}</h4>
                    <br/>
                    <br/>
                    {currentUser && currentUser.id===id && <button onClick={()=>{
                        setObj(oneUser)
                        setShow(!show)}}>Edit Profile</button>}
                    <br/>
                    <br/>
                    {show && <div>
                        <input type="text" name="fName" value={obj.fName} placeholder="First Name" onChange={handleChange}/><br/>
                        <br/>
                        <input type="text" name="lName" value={obj.lName} placeholder="Last Name" onChange={handleChange}/><br/>
                        <br/>
                        <input type="text" name="email" value={obj.email} placeholder="example@mail.com" onChange={handleChange}/><br/>
                        <br/>
                        <button onClick={()=>editProfile()}>Update</button>
                    </div>}
                    <br/>
                </div>}
                <div>
                    <h1 style={{fontFamily: "Pixel", color: "#B400FF"}}>My NFTs</h1>
                    <MyNFTs/>
                </div>
            </div>
            
        </div>
    )
}
export default Profile;
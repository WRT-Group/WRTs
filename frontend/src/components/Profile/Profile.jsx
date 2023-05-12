import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import { useLocation, useNavigate, useParams,Link } from "react-router-dom";
import { motion } from "framer-motion"; 

import { Context } from "../Context/Context";
import MyNFTs from '../MyNFTs/MyNFTs/MyNFTs'
import Spinner from "../Spinner/Spinner";
import './profile.css'
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import AddNFT from "../MyNFTs/AddNFT/AddNFT";

const Profile=()=>{
    const { currentUser, setCurrentUser, isLoading, setIsLoading }=useContext(Context)
    const location=useLocation().pathname
    const navigate=useNavigate()
    const {id}=useParams()
    const [show,setShow]=useState(false)
    const [oneUser,setOneUser]=useState({})
    const [obj,setObj]=useState({})
    const [image,setImage]=useState(null)
    
    useEffect(()=>{
        if(location==="/profile/undefined"){
            navigate("/")
        }
        else{
            getOneUser()
        }
    },[])

    const getOneUser=async ()=>{
        setIsLoading(true)
        const res=await axios.get(`http://localhost:3001/user/getUser/${id}`)
        setOneUser(res.data[0])
        setObj(oneUser)
        setIsLoading(false)
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
        setIsLoading(true)
        const updateUser=await axios.put(`http://localhost:3001/user/updateUser/${id}`,{...obj,image})
        setCurrentUser(updateUser.data)
        setShow(!show)
        window.location.reload()
        setIsLoading(false)
    }
    useEffect(()=>{
        getOneUser()
    },[show,id])

    const onDrop = async (acceptedFiles) => {
        setIsLoading(true)
        const file = await convertToBase64(acceptedFiles[0]);
        setImage(file);
        setIsLoading(false)
      };
    
      const convertToBase64 = (file) => {
        return new Promise((res, rej) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
    
          fileReader.onload = () => {
            res(fileReader.result);
          };
    
          fileReader.onerror = (error) => {
            rej(error);
          };
        });
      };
 
    return (
        <>
            <MDBRow style={{flexWrap: "nowrap"}} id="title"><h1 style={{fontFamily: "Pixel", color: "#B400FF", marginRight: 0}}>My NFTs</h1> <AddNFT /></MDBRow>
            
            <MDBRow id="profile">
                <MDBCol md={4} className="myprofile">
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
                            setShow(!show)}}>Edit Profile</button>}<br/>
                        <br/>
                        {currentUser && currentUser.id===id && <button className="btnChangePassword"><Link to="/changePassword">Change Password</Link></button>}
                        <br/>
                        {show && <motion.div  initial={{y: -40, opacity: 0}} animate={{y:0, opacity: 1}} exit={{y: -40, opacity: 0}} transition={{duration: 0.4}}>
                            <input type="text" name="fName" className="profile-input" value={obj.fName} placeholder="First Name" onChange={handleChange}/><br/>
                            <br/>
                            <input type="text" name="lName" className="profile-input" value={obj.lName} placeholder="Last Name" onChange={handleChange}/><br/>
                            <br/>
                            <input type="text" name="email" className="profile-input" value={obj.email} placeholder="example@mail.com" onChange={handleChange}/><br/>
                            <br/>
                            <Dropzone id="profile-dropzone" onDrop={onDrop}>
                                {({ getRootProps, getInputProps }) => (
                                    <div {...getRootProps()} className="dropzone">
                                        <input {...getInputProps()} />
                                    </div>
                                )}
                            </Dropzone>
                            <button id="profile-submit" onClick={()=>editProfile()}>Update</button>
                        </motion.div>}
                        <br/>
                    </div>}
                    <br/>
              </MDBCol>
              <MDBCol><MyNFTs id={id}/></MDBCol>
            {isLoading && <Spinner/>}
            </MDBRow>
        </>
    )
}
export default Profile;
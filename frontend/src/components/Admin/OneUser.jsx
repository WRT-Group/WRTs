import React, { useContext } from 'react';
import "./Admin.css"
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../Context/Context';

const OneUser = ({id,fName,lName,username,email,isAdmin,isBanned,createdAt}) => {

  const { currentUser, setIsLoading }=useContext(Context)

  const ban=async ()=>{
    setIsLoading(true)
    await axios.put(`http://localhost:3001/user/ban/${id}`,{},{
      headers: {Authorization: currentUser.token}
    })
    window.location.reload()
    setIsLoading(false)
  }

  const unban=async ()=>{
    setIsLoading(true)
    await axios.put(`http://localhost:3001/user/unban/${id}`,{},{
      headers: {Authorization: currentUser.token}
    })
    window.location.reload()
    setIsLoading(false)
  }

  const makeAdmin=async ()=>{
    setIsLoading(true)
    await axios.put(`http://localhost:3001/user/makeAdmin/${id}`,{},{
      headers: {Authorization: currentUser.token}
    })
    window.location.reload()
    setIsLoading(false)
  }

  const removeUser=async ()=>{
    console.log(currentUser.token)
    console.log(id)
    setIsLoading(true)
    await axios.delete(`http://localhost:3001/user/delete/${id}`,{
      headers: {Authorization: currentUser.token}
    })
    window.location.reload()
    setIsLoading(false)
  }

  return (
    <tbody>
      <tr className='tr-container'>
        <td className='user-info'>
          <Link to={`/profile/${id}`}>{username}</Link>
        </td>
        <td className='user-info'>{email}</td>
        <td className='user-info'>{`${fName} ${lName}`}</td>
        <td className='user-info' style={isAdmin ? {color:"#19A7CE"} : {color: "white"}}>{String(isAdmin)}</td>
        <td className='user-info' style={isBanned ? {color:"red"} : {color: "white"}}>{String(isBanned)}</td>
        <td className='user-info'>{createdAt}</td>
        <td className='user-info'>
          <button className={`btn btn-primary ${(isAdmin || isBanned) && "disabled"}`} onClick={makeAdmin}>Make Admin</button>
          {!isBanned && <button className={`btn btn-danger ${isAdmin && "disabled"}`} onClick={ban}>Ban</button>}
          {isBanned && <button className="btn btn-danger" onClick={unban}>Unban</button>}
          <button className={`btn btn-danger ${isAdmin && "disabled"}`} onClick={removeUser}>Remove</button>
        </td>
      </tr>
    </tbody>
  );
};

export default OneUser;
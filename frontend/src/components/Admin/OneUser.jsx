import React from 'react';
import "./Admin.css"
import { Link } from 'react-router-dom';
import axios from 'axios';

const OneUser = ({id,fName,lName,username,email,isAdmin,isBanned,createdAt}) => {

  const ban=async ()=>{
    await axios.put(`http://localhost:3001/user/ban/${id}`)
    window.location.reload()
  }

  const unban=async ()=>{
    await axios.put(`http://localhost:3001/user/unban/${id}`)
    window.location.reload()
  }

  const makeAdmin=async ()=>{
    await axios.put(`http://localhost:3001/user/makeAdmin/${id}`)
    window.location.reload()
  }

  const removeUser=async ()=>{
    await axios.delete(`http://localhost:3001/user/delete/${id}`)
    window.location.reload()
  }

  return (
    <tbody>
      <tr className='tr-container'>
        <td className='user-info'>
          <Link to={`/profile/${id}`}>{`${fName} ${lName}`}</Link>
        </td>
        <td className='user-info'>{email}</td>
        <td className='user-info'>{username}</td>
        <td className='user-info' style={isAdmin ? {color:"#19A7CE"} : {color: "white"}}>{String(isAdmin)}</td>
        <td className='user-info' style={isBanned ? {color:"red"} : {color: "white"}}>{String(isBanned)}</td>
        <td className='user-info'>{createdAt}</td>
        <td className='user-info'>
          {<button className={`btn btn-primary ${isAdmin && "disabled"}`} onClick={makeAdmin}>Make Admin</button>}
          {!isBanned && <button className={`btn btn-danger ${isAdmin && "disabled"}`} onClick={ban}>Ban</button>}
          {isBanned && <button className="btn btn-danger" onClick={unban}>Unban</button>}
          {!isAdmin && <button className='btn btn-danger' onClick={removeUser}>Remove</button>}
        </td>
      </tr>
    </tbody>
  );
};

export default OneUser;
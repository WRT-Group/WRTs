import React, { useContext, useEffect, useState } from 'react';
import axios from "axios"

import Logo from '../Logo/Logo';
import { useNavigate } from 'react-router-dom';
import OneUser from './OneUser';
import { Context } from '../Context/Context';

const Admin = () => {
  const { currentUser }=useContext(Context)
  const [users,setUsers]=useState([])
  const navigate=useNavigate()

  useEffect(()=>{
    if(!currentUser.isAdmin){
      navigate("/")
    }
    axios.get("http://localhost:3001/user/getUsers").then(users=>setUsers(users.data))
  },[])

  return (
    <div>
      <Logo/>
      <table>
        <thead>
          <tr>
            <th className="column-container">Name</th>
            <th className="column-container">Email</th>
            <th className="column-container">Username</th>
            <th className="column-container">Created At</th>
          </tr>
        </thead>
      {users.map((e,index)=>{
        return <OneUser key={index} id={e._id} fName={e.fName} lName={e.lName} email={e.email} username={e.username} createdAt={e.createdAt}/>
      })}
      </table>
    </div>
  );
};

export default Admin;
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Context } from '../Context/Context';
import Logo from '../Logo/Logo';
import OneUser from './OneUser';
import UserSearch from './UserSearch';
import Spinner from '../Spinner/Spinner';

const Admin = () => {
  const { currentUser, isLoading }=useContext(Context)
  const [users,setUsers]=useState([])
  const navigate=useNavigate()

  useEffect(()=>{
    if(!currentUser.isAdmin){
      navigate("/")
    }
  },[])


  return (
    <div>
      <Logo/>
      <UserSearch setUsers={setUsers}/>
      <table>
        <thead>
          <tr>
            <th className="column-container">Username</th>
            <th className="column-container">Email</th>
            <th className="column-container">Name</th>
            <th className="column-container">Admin</th>
            <th className="column-container">Banned</th>
            <th className="column-container">Created At</th>
          </tr>
        </thead>
      {users.map((e,index)=>{
        return <OneUser key={index} id={e._id} fName={e.fName} lName={e.lName} email={e.email} username={e.username} isAdmin={e.isAdmin} isBanned={e.isBanned} createdAt={e.createdAt}/>
      })}
      </table>
      {isLoading && <Spinner/>}
    </div>
  );
};

export default Admin;
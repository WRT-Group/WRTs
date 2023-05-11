import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Context } from '../Context/Context';

import "./Admin.css"

const UserSearch = () => {
  const [query,setQuery]=useState("")

  useEffect(()=>{
    axios.get("http://localhost:3001/user/getUsers").then(users=>setUsers(users.data))
  },[query])

  return (
    <form role="search">
      <input className="form-control" id="user-searchbar" type="search" placeholder="Search" onChange={e=>setQuery(e.target.value)} aria-label="Search"/>
    </form>
  );
};

export default UserSearch;
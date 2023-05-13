import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../Context/Context';
import axios from 'axios';

import "./Admin.css"

const UserSearch = ({setUsers}) => {
  const [query,setQuery]=useState("")
  const { setIsLoading}=useContext(Context)

  useEffect(()=>{
    setIsLoading(true)
    axios.get(`${import.meta.env.VITE_URL}/user/search?query=${query}`).then(users=>{setUsers(users.data);setIsLoading(false)})
  },[query])

  return (
    <form id="user-search-container" role="search">
      <input className="form-control" id="user-searchbar" type="search" placeholder="Search" onChange={e=>setQuery(e.target.value)} aria-label="Search"/>
    </form>
  );
};

export default UserSearch;
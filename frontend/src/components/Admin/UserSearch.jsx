import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import "./Admin.css"

const UserSearch = ({setUsers}) => {
  const [query,setQuery]=useState("")

  useEffect(()=>{
    axios.get(`http://localhost:3001/user/search?query=${query}`).then(users=>setUsers(users.data))
  },[query])

  return (
    <form id="user-search-container" role="search">
      <input className="form-control" id="user-searchbar" type="search" placeholder="Search" onChange={e=>setQuery(e.target.value)} aria-label="Search"/>
    </form>
  );
};

export default UserSearch;
import React, { useContext, useEffect, useState } from 'react';
import "./Search.css"
import axios from 'axios';
import { Context } from '../Context/Context';

const Search = () => {
  const [query,setQuery]=useState("")
  const { setData }=useContext(Context)

  useEffect(()=>{
    axios.get(`http://localhost:3001/NFT/search?query=${query}`).then(data=>setData(data.data))
  },[query])

  return (
    <form role="search">
      <input className="form-control" id="searchbar" type="search" placeholder="Search" onChange={e=>setQuery(e.target.value)} aria-label="Search"/>
    </form>
  );
};

export default Search;
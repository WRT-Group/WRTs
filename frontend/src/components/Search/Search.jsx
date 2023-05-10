import React from 'react';
import "./Search.css"

const Search = () => {
  return (
    <form role="search">
      <input className="form-control" id="searchbar" type="search" placeholder="Search" aria-label="Search"/>
    </form>
  );
};

export default Search;
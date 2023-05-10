import React, { createContext, useEffect, useState } from 'react';

export const Context=createContext()

export const ContextProvider = ({children}) => {
  const [currentUser,setCurrentUser]=useState({})

  useEffect(()=>{
    console.log(currentUser)
  },[currentUser])

  return (
    <Context.Provider value={{currentUser,setCurrentUser}}>
      {children}
    </Context.Provider>
  );
};
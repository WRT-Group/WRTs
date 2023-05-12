import React, { createContext, useEffect, useState } from 'react';

export const Context=createContext()

export const ContextProvider = ({children}) => {
  const [data,setData]=useState([])
  const user=JSON.parse(localStorage.getItem("currentUser"))
  const [currentUser,setCurrentUser]=useState(user || null)
  const [loginSuccess,setLoginSuccess]=useState(false)

  useEffect(()=>{
    console.log(user)
  },[currentUser])

  const logout=()=>{
    setCurrentUser(null)
    localStorage.removeItem("currentUser")
  }

  return (
    <Context.Provider value={{currentUser,setCurrentUser,logout,data,setData,loginSuccess,setLoginSuccess}}>
      {children}
    </Context.Provider>
  );
};
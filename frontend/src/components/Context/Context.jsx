import React, { createContext, useState } from 'react';

export const Context=createContext()

export const ContextProvider = ({children}) => {
  const [data,setData]=useState([])
  const user=JSON.parse(localStorage.getItem("currentUser")) 
  const [currentUser,setCurrentUser]=useState(user || null)
  const [loginSuccess,setLoginSuccess]=useState(false)
  const [isLoading,setIsLoading]=useState(false)
  const [isRed,setIsRed]=useState(false)
  const [isYellow,setIsYellow]=useState(false)
  const [isGreen,setIsGreen]=useState(false)
  const [alertText, setAlertText] = useState("")

  const refreshUser = async (updatedUser) => {
    window.localStorage.setItem("currentUser", updatedUser)
  }
  
  const logout=()=>{
    setCurrentUser(null)
    localStorage.removeItem("currentUser")
  }

  return (
    <Context.Provider value={{currentUser,setCurrentUser,logout,data,setData,loginSuccess,setLoginSuccess,isLoading,setIsLoading,isRed,setIsRed,isYellow,setIsYellow,isGreen,setIsGreen, refreshUser, alertText, setAlertText}}>
      {children}
    </Context.Provider>
  );
};
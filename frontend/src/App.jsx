import { useState } from 'react'
import './App.css';
import { Routes,Route } from 'react-router-dom';
import './App.css'

import Home from './components/Home/Home'
import Signup from "./components/Auth/Signup/Signup"
import Login from './components/Auth/Login/Login'
import GetStarted from './components/GetStarted/GetStarted';
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/getstarted' element={<GetStarted/>}/>
      </Routes>
    </>
  )
}

export default App
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import './App.css'

import Signup from "./components/Auth/Signup/Signup"
import Login from './components/Auth/Login/Login'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
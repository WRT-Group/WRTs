import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import Home from "./components/Home/Home";
import Signup from "./components/Auth/Signup/Signup";
import Login from "./components/Auth/Login/Login";
import GetStarted from "./components/GetStarted/GetStarted";
import BuyNFT from "./components/Buy/BuyNft";
import Search from "./components/Search/Search";
import Profile from "./components/Profile/Profile";
import Admin from "./components/Admin/Admin";
import Navbar from "./components/Navbar/Navbar";
import Banned from "./components/Banned/Banned";
import ContactUs from "./components/ContactUs/ContactUs";
import ChangePassword from "./components/ChangePassword/ChangePassword";


function App() {
  const location=useLocation().pathname
  return (
    <>
      {location!=="/admin" && location!=="/banned" &&  <Navbar/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/getstarted" element={<GetStarted />} />
        <Route path="/BuyNFT/:id" element={<BuyNFT/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/profile/:id" element={<Profile/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/banned" element={<Banned/>}/>
        <Route path="/contact" element={<ContactUs/>}/>
        <Route path="/changePassword" element={<ChangePassword/>}/>
      </Routes>
    </>
  );
}

export default App;

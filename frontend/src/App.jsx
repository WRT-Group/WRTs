import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./components/Home/Home";
import Signup from "./components/Auth/Signup/Signup";
import Login from "./components/Auth/Login/Login";
import GetStarted from "./components/GetStarted/GetStarted";
import AddNFT from "./components/MyNFTs/AddNFT/AddNFT";
import BuyNFT from "./components/Buy/BuyNft";
import Search from "./components/Search/Search";
import Admin from "./components/Admin/Admin";

function App() {

  return (
    <>
      <AddNFT />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/getstarted" element={<GetStarted />} />
        <Route path="/BuyNFT/:id" element={<BuyNFT/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/admin" element={<Admin/>}/>
      </Routes>
    </>
  );
}

export default App;

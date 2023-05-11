import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./components/Home/Home";
import Signup from "./components/Auth/Signup/Signup";
import Login from "./components/Auth/Login/Login";
import GetStarted from "./components/GetStarted/GetStarted";
import BuyNFT from "./components/Buy/BuyNft";
import Search from "./components/Search/Search";
import MyNFTs from "./components/MyNFTs/MyNFTs/MyNFTs";
import Admin from "./components/Admin/Admin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<MyNFTs />} />
        <Route path="/getstarted" element={<GetStarted />} />
        <Route path="/BuyNFT/:id" element={<BuyNFT/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/admin" element={<Admin/>}/>
      </Routes>
    </>
  );
}

export default App;

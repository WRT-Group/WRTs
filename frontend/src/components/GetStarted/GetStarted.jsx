import React from "react";
import { Link } from "react-router-dom";
import './GetStarted.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const GetStarted=()=>{
    return(
        <div >
            <div className="card" style={{backgroundColor:"#b400ff", color:"white" }}>
                <div className="card-body">
                    <h1 className="card-title">Sign up now (it’s free!)</h1>
                    <p className="card-text">If you’re curious about NFT technology but you’re unsure of what it is or how <br/>it may be relevant to arts and cultural organisations,<br/> then you’re in the right place.</p><br/>
                    <button style={{backgroundColor:"#3e3e3e" }}><Link to="/signup">Go To Sign-Up</Link></button>
                </div>
            </div>  

        </div>

    )
}

export default GetStarted;


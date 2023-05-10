import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css"
import Navbar from '../../Navbar/Navbar';
import { MDBContainer,MDBCard,MDBCardBody,MDBRow,MDBCol,MDBInput} from "mdb-react-ui-kit";
import axios from "axios";

import Logo from '../../Logo/Logo';
import { Context } from '../../Context/Context';
import RedAlert from '../../Alerts/RedAlert';
import YellowAlert from '../../Alerts/YellowAlert';

const Login = () => {
  const { currentUser,setCurrentUser }=useContext(Context)
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const [passwordInc,setPasswordInc]=useState(false)
  const [usernameInc,setUsernameInc]=useState(false)
  const navigate=useNavigate()

  useEffect(()=>{
    if(currentUser){
      navigate("/")
    }
  },[])

  const handleSubmit=(e)=>{
    e.preventDefault()
    
    const loguser={
      user: username,
      pass: password
    }
    axios.post("http://localhost:3001/user/login",loguser).then(user=>{
      if(user.data==="incorrect password"){
        setPasswordInc(true)
        setTimeout(clearInc,2000)
      }
      else if(user.data==="cannot find user"){
        setUsernameInc(true)
        setTimeout(clearInc,2000)
      }
      else{
        setCurrentUser(user.data)
        localStorage.setItem("currentUser",JSON.stringify(user.data))
        navigate("/")
      }
    })
  }

  const clearInc=()=>{
    setUsernameInc(false)
    setPasswordInc(false)
  }

  return (
    <MDBContainer fluid>
      <Navbar/>
      {passwordInc && <RedAlert text={"Password Incorrect"} clearInc={clearInc}/>}
      {usernameInc && <YellowAlert text={"User Not Found!"} clearInc={clearInc}/>}
      <MDBRow className="d-flex justify-content-center align-items-center">
        <MDBCol lg="6">
          <MDBCard className="my-2 login" style={{ maxWidth: "600px" }}>
            <Logo />
            <hr />
            <MDBCardBody className="px-0">
              <h3 className="mb-3 pb-md-0 px-md-2">Registration Info</h3>
              <MDBContainer id="login-form-container">
                <form onSubmit={(e)=>handleSubmit(e)}>
                  <label>Username </label>

                  <MDBInput
                    onChange={(e) => setUsername(e.target.value)}
                    wrapperClass="mb-2"
                    id="form1"
                    type="text"
                    placeholder="Username or email"
                  />

                  <label>Password </label>

                  <MDBInput
                    onChange={(e) => setPassword(e.target.value)}
                    wrapperClass="mb-2"
                    minLength={6}
                    id="form2"
                    type="password"
                    placeholder="********"
                  />

                  <MDBRow id="redirect">
                    <MDBCol>
                      <h6>
                        Don't have an account?{" "}
                        <a onClick={() => navigate("/signup")}>Sign Up</a>
                      </h6>
                    </MDBCol>
                    <MDBCol>
                      <button type='submit' id="submit">Submit</button>
                    </MDBCol>
                  </MDBRow>
                </form>
              </MDBContainer>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
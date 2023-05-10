import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css"
import Navbar from '../../Navbar/Navbar';
import { MDBBtn,MDBContainer,MDBCard,MDBCardBody,MDBRow,MDBCol,MDBInput} from "mdb-react-ui-kit";
import axios from "axios";

import Logo from '../../Logo/Logo';
import { Context } from '../../Context/Context';

const Login = () => {
  const { currentUser, setCurrentUser }=useContext(Context)
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const navigate=useNavigate()

  const handleSubmit=(e)=>{
    e.preventDefault()
    
    const loguser={
      user: username,
      pass: password
    }
    axios.post("http://localhost:3001/user/login",loguser).then(user=>{
      setCurrentUser(user.data)
    })
  }

  return (
    <MDBContainer fluid>
      <Navbar/>
      <MDBRow className="d-flex justify-content-center align-items-center">
        <MDBCol lg="6">
          <MDBCard className="my-2 signup" style={{ maxWidth: "600px" }}>
            <Logo />
            <hr />
            <MDBCardBody className="px-0">
              <h3 className="mb-3 pb-md-0 px-md-2">Registration Info</h3>
              <MDBContainer id="form-container">
                <form onSubmit={handleSubmit}>
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
                      <MDBBtn className="mt-2" id="submit" size="lg" onClick={handleSubmit}>
                        Submit
                      </MDBBtn>
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
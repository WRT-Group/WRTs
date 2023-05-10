import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css"
import Navbar from '../../Navbar/Navbar';
import { MDBBtn,MDBContainer,MDBCard,MDBCardBody,MDBRow,MDBCol,MDBInput} from "mdb-react-ui-kit";
import axios from "axios";

import Logo from '../../Logo/Logo';

const Login = () => {
  const [username,setUsername]=useState("")
  const navigate=useNavigate()

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
                <form onSubmit={(e) => handleSubmit(e)}>
                  <label>Username </label>

                  <MDBInput
                    onChange={(e) => setUsername(e.target.value)}
                    wrapperClass="mb-2"
                    id="form1"
                    type="text"
                    placeholder="Username"
                  />

                  <label>Password </label>

                  <MDBInput
                    onChange={(e) => setPassword(e.target.value)}
                    wrapperClass="mb-2"
                    minLength={6}
                    id="form1"
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
                      <MDBBtn className="mt-2" id="submit" size="lg">
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
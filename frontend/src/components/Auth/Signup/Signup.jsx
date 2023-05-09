import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import axios from "axios";

import "./Signup.css";
import Logo from "../../Logo/Logo";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
const Signup = () => {
  const navigate = useNavigate();
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confPassword) {
      return alert("passwords don't match");
    }
    const newUser = {
      fName,
      lName,
      username,
      password,
      confPassword,
      email,
    };

    axios
      .post("http://localhost:3001/user/signup", newUser, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        window.localStorage.setItem("token", res.data.token);
        navigate("/");
      });
  };
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
                  <MDBRow>
                    <MDBCol md="6" className="py-0">
                      <label>First Name</label>
                      <MDBInput
                        onChange={(e) => setFName(e.target.value)}
                        wrapperClass="name mb-2"
                        id="form2"
                        type="text"
                      />
                    </MDBCol>

                    <MDBCol md="6" className="py-0">
                      <label>Last Name</label>

                      <MDBInput
                        onChange={(e) => setLName(e.target.value)}
                        wrapperClass="mb-2"
                        id="form3"
                        type="text"
                      />
                    </MDBCol>
                  </MDBRow>
                  <label>Username</label>

                  <MDBInput
                    onChange={(e) => setUsername(e.target.value)}
                    wrapperClass="mb-2"
                    id="form1"
                    type="text"
                  />

                  <label>Email</label>

                  <MDBInput
                    onChange={(e) => setEmail(e.target.value)}
                    wrapperClass="mb-2"
                    id="form3"
                    type="email"
                  />
                  <label>Password</label>

                  <MDBInput
                    onChange={(e) => setPassword(e.target.value)}
                    wrapperClass="mb-2"
                    minLength={6}
                    id="form1"
                    type="password"
                  />
                  <label>Confirm Password</label>

                  <MDBInput
                    onChange={(e) => setConfPassword(e.target.value)}
                    wrapperClass="mb-3"
                    minLength={6}
                    id="form1"
                    type="password"
                  />
                  <MDBRow id="redirect">
                    <MDBCol>
                      <h6>
                        Already have an account?{" "}
                        <a onClick={() => navigate("/login")}>Log in</a>
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

export default Signup;

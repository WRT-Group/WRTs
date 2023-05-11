import React, { useContext, useEffect, useState } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import axios from "axios";

import "./Signup.css";
import Logo from "../../Logo/Logo";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import { Context } from "../../Context/Context";
const Signup = () => {
  const { currentUser, setCurrentUser } = useContext(Context);

  const regexpUsername = /^.{4,}$/;
  const regexpPassword = /^.{8,}$/;
  const regexpEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [disabled, setDisabled] = useState(false);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisabled(true);

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
        if (res.data.message) alert(res.data.message);
        else {
          setCurrentUser(res.data);
          window.localStorage.setItem("currentUser", JSON.stringify(res.data));
          navigate("/");
        }
        setDisabled(false);
      })
      .catch((err) => {
        console.log(err);
        setDisabled(false);
      });
  };
  return (
    <MDBContainer fluid>
      <Navbar />
      <MDBRow className="d-flex justify-content-center align-items-center">
        <MDBCol lg="6">
          <MDBCard className="my-2 signup" style={{ maxWidth: "600px" }}>
            <Logo />
            <hr />
            <MDBCardBody className="px-0">
              <h3 className="mb-3 pb-md-0 px-md-2 hd">Registration Info</h3>
              <MDBContainer id="signup-form-container">
                <form onSubmit={(e) => handleSubmit(e)}>
                  <MDBRow>
                    <MDBCol md="6" className="py-0">
                      <label>First Name </label>
                      <MDBInput
                        onChange={(e) => setFName(e.target.value)}
                        wrapperClass="name mb-2"
                        id="form1"
                        type="text"
                        placeholder="First Name *"
                      />
                    </MDBCol>

                    <MDBCol md="6" className="py-0">
                      <label>Last Name </label>

                      <MDBInput
                        onChange={(e) => setLName(e.target.value)}
                        wrapperClass="mb-2"
                        id="form2"
                        type="text"
                        placeholder="Last Name *"
                      />
                    </MDBCol>
                  </MDBRow>
                  <label>Username </label>

                  <MDBInput
                    onChange={(e) => setUsername(e.target.value)}
                    wrapperClass="mb-2"
                    id="form3"
                    type="text"
                    placeholder="Username123 *"
                  />
                  {username.length > 0 && (
                    <span>
                      {regexpUsername.test(username) ? (
                        <p style={{ color: "green" }}>Valid username</p>
                      ) : (
                        <p style={{ color: "#cc0022" }}>Invalid username</p>
                      )}
                    </span>
                  )}
                  <br />
                  <label>Email </label>

                  <MDBInput
                    onChange={(e) => setEmail(e.target.value)}
                    wrapperClass="mb-2"
                    id="form4"
                    type="email"
                    placeholder="example@mail.com *"
                  />
                  {email.length > 0 && (
                    <span>
                      {regexpEmail.test(email) ? (
                        <p style={{ color: "green" }}>Valid Email</p>
                      ) : (
                        <p style={{ color: "#cc0022" }}>Invalid Email Format</p>
                      )}
                    </span>
                  )}
                  <br />
                  <label>Password </label>

                  <MDBInput
                    onChange={(e) => setPassword(e.target.value)}
                    wrapperClass="mb-2"
                    minLength={6}
                    id="form5"
                    type="password"
                    placeholder="********"
                  />
                  {password.length > 0 && (
                    <span>
                      {regexpPassword.test(password) ? (
                        <p style={{ color: "green" }}>Valid Password</p>
                      ) : (
                        <p style={{ color: "#cc0022" }}>
                          Password should greater than 8 characters
                        </p>
                      )}
                    </span>
                  )}
                  <br />
                  <label>Confirm Password </label>

                  <MDBInput
                    onChange={(e) => setConfPassword(e.target.value)}
                    wrapperClass="mb-3"
                    minLength={6}
                    id="form6"
                    type="password"
                    placeholder="********"
                  />
                  {confPassword.length > 0 && (
                    <span>
                      {confPassword.length > 0 && confPassword === password ? (
                        <p style={{ color: "green" }}> Matched </p>
                      ) : (
                        <p style={{ color: "#cc0022" }}>
                          Should match your current password
                        </p>
                      )}
                    </span>
                  )}
                  <br />
                  <MDBRow id="redirect">
                    <MDBCol>
                      <h6>
                        Already have an account?{" "}
                        <a onClick={() => navigate("/login")}>Log in</a>
                      </h6>
                    </MDBCol>
                    <MDBCol>
                      <button className="mt-2" disabled={disabled}>
                        Submit
                      </button>
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

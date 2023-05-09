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

const Signup = () => {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    const newUser = {
      fName,
      lName,
      username,
      password,
      confPassword,
      email,
    };

    axios.post("http://localhost:3001/user/signup", newUser, {
      headers: { "Content-Type": "application/json" },
    });
  };
  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center">
        <MDBCol lg="8">
          <MDBCard
            className="my-2 rounded-3 signup"
            style={{ maxWidth: "600px" }}
          >
            <MDBCardImage
              src="../../../../assets/istockphoto-1298834196-170667a.jpg"
              className="w-100 rounded-top"
              alt="Sample photo"
            />

            <MDBCardBody className="px-5">
              <h3 className="mb-3 pb-md-0 px-md-2">Registration Info</h3>

              <MDBRow>
                <MDBCol md="6" className="py-0">
                  <MDBInput
                    onChange={(e) => setFName(e.target.value)}
                    wrapperClass="name mb-2"
                    label="First Name"
                    id="form2"
                    type="text"
                  />
                </MDBCol>

                <MDBCol md="6" className="py-0">
                  <MDBInput
                    onChange={(e) => setLName(e.target.value)}
                    wrapperClass="mb-2"
                    label="Last Name"
                    id="form3"
                    type="text"
                  />
                </MDBCol>
              </MDBRow>

              <MDBInput
                onChange={(e) => setUsername(e.target.value)}
                wrapperClass="mb-2"
                label="Username"
                id="form1"
                type="text"
              />

              <MDBInput
                onChange={(e) => setEmail(e.target.value)}
                wrapperClass="mb-2"
                label="Email"
                id="form3"
                type="text"
              />

              <MDBInput
                onChange={(e) => setPassword(e.target.value)}
                wrapperClass="mb-2"
                label="Password"
                id="form1"
                type="text"
              />

              <MDBInput
                onChange={(e) => setConfPassword(e.target.value)}
                wrapperClass="mb-2"
                label="Confirm Password"
                id="form1"
                type="text"
              />

              <MDBBtn
                color="success"
                className="mb-2"
                size="lg"
                onClick={handleSubmit}
              >
                Submit
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Signup;

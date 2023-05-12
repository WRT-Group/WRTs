import React, { useContext, useEffect, useState } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import Dropzone from "react-dropzone";
import axios from "axios";

import "./Signup.css";
import Logo from "../../Logo/Logo";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context/Context";
import RedAlert from "../../Alerts/RedAlert";
import YellowAlert from "../../Alerts/YellowAlert";
import Spinner from "../../Spinner/Spinner";

const Signup = () => {
  const { currentUser, setCurrentUser, isLoading, setIsLoading } = useContext(Context);

  const regexFullName = /[a-z]/gi;
  const regexpUsername = /^.{4,}$/;
  const regexpPassword = /^.{8,}$/;
  const regexpEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [checkbox, setCheckbox] = useState(false);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [email, setEmail] = useState("");
  const [infoInc, setInfoInc] = useState(false);
  const [confInc, setConfInc] = useState(false);
  const [userExists,setUserExists]=useState(false)
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
    setIsLoading(false)
  },[]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!regexFullName.test(fName) || !regexFullName.test(lName) || !regexpUsername.test(username) || !regexpEmail.test(email) || !regexpPassword.test(password) || !checkbox){
      setInfoInc(true);
      setTimeout(clearInc, 2000);
    }
    else if (password !== confPassword) {
        setConfInc(true);
        setTimeout(clearInc, 2000);
      } else {
        setIsLoading(true)
        const newUser = {
          fName,
          lName,
          username,
          password,
          image,
          email,
        };

        axios
          .post("http://localhost:3001/user/signup", newUser, {
            headers: { "Content-Type": "application/json" },
          })
          .then((res) => {
            
            if (res.data.message){setIsLoading(false);setUserExists(true);window.scrollTo({
              top: 0,
              behavior: "smooth"
            });setTimeout(()=>setUserExists(false),2000)}
            else {
              setCurrentUser(res.data);
              window.localStorage.setItem(
                "currentUser",
                JSON.stringify(res.data)
              );
              navigate("/");
              setIsLoading(false)
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
  };
  const clearInc = () => {
    setConfInc(false);
    setInfoInc(false);
    setUserExists(false)
  };

  const onDrop = async (acceptedFiles) => {
    setIsLoading(true)
    const file = await convertToBase64(acceptedFiles[0]);
    setImage(file);
    setIsLoading(false)
  };

  const convertToBase64 = (file) => {
    return new Promise((res, rej) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        res(fileReader.result);
      };

      fileReader.onerror = (error) => {
        rej(error);
      };
    });
  };

  return (
    <MDBContainer fluid>
      {userExists && <YellowAlert text={"Username Already Exists."} clearInc={clearInc}/>}
      {infoInc && (
        <YellowAlert
        text={"Please Validate your information before submitting."}
        clearInc={clearInc}
        />
        )}
      {confInc && (
        <RedAlert text={"Passwords don't match."} clearInc={clearInc} />
        )}
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
                      {confPassword.length > 0 && password.length>7  && confPassword === password ? (
                        <p style={{ color: "green" }}> Matched </p>
                        ) : (
                          <p style={{ color: "#cc0022" }}>
                          Should match your current password
                        </p>
                      )}
                    </span>
                  )}
                  <label style={{ marginBottom: 8 }}>
                    Drag and drop you profile picture here
                  </label>
                  <Dropzone onDrop={onDrop}>
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                      </div>
                    )}
                  </Dropzone>
                  <br />
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      id="check"
                      checked={checkbox}
                      onChange={(e) => setCheckbox(e.target.checked)}
                      />
                    <label htmlFor="checkbox">
                      I agree with the WRTs terms
                    </label>
                    <br />
                  </div>
                  <br />
                  <br />
                  <MDBRow id="redirect">
                    <MDBCol>
                      <h6>
                        Already have an account?{" "}
                        <a onClick={() => navigate("/login")}>Log in</a>
                      </h6>
                    </MDBCol>
                    <MDBCol>
                      <button className="mt-2" id="signup-button">
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
      {isLoading && <Spinner/>}
    </MDBContainer>
  );
};

export default Signup;

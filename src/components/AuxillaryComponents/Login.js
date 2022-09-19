import React, { useState } from "react";
import "../css/styles.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import comsatslogo from "../CACMember/comsats_logo.png";

import { gridFilteredRowsLookupSelector } from "@mui/x-data-grid";
import useAuth from "../../MyHooks/useAuth";
import { Button } from "@mui/material";
function Login() {
  axios.defaults.withCredentials = true;
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuth, setPersist } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Email != "" && Password != "") {
      try {
        const response = await axios.post("http://localhost:4000/Auth/login", {
          Email,
          Password,
        });
        const data = response.data;
        console.log("ss", data);
        localStorage.setItem('user', JSON.stringify(response.data._id))
        const Roles = response?.data?.Roles;
        console.log(Roles);
        setAuth({ Roles });
        setPersist(true);
        setEmail("");
        setPassword("");
        if (Roles.includes("Admin"))
          navigate("/Admin/Dashboard", { replace: true });
        else if (Roles.includes("CAC"))
          navigate("/CAC/Dashboard", { replace: true });
        else if (Roles.includes("Faculty"))
          navigate("/Faculty/Dashboard", { replace: true });
        else if (Roles.includes("Eveluator"))
          navigate("/Eveluator/Dashboard", { replace: true });
      } catch (err) {
        if (err.response?.data === "is not a User") {
          alert("User with this email does not exist");
        } else if (err.response?.data === "Deactivated") {
          alert("Account Deactivated by Admin");
        } else if (err.response?.data === "wrong password") {
          alert("Incorrect Password");
        } else {
          alert("Login Failed");
        }
      }
    } else {
      alert("Fill all the fields");
    }
  };
  return (
    <div>
      <MDBContainer className="my-3 ">
        <MDBRow>
          <MDBCol col="6" className="mb-2">
            <div className="d-flex flex-column ms-2">
              <div className="text-center mb-4">
                <img src={comsatslogo} width="130px" height="130px"></img>
              </div>

              <p className="text-center">Please login to your account</p>

              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="inputEmail"
                    type="email"
                    placeholder="name@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="Email" className="form-label">
                    Email Address
                  </label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="inputPassword"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="Password" className="form-label">
                    Password
                  </label>
                </div>

                <div style={{ textAlign: "right" }}>
                  <Link className="small text-muted" to="forgotpassword">
                    Forgot Password?
                  </Link>
                </div>

                <div className="  mt-4 mb-0">
                  <Button
                    style={{ backgroundColor: "#4b2980" }}
                    fullWidth
                    type="Submit"
                    variant="contained"
                    size="small"
                  >
                    Login
                  </Button>
                </div>
              </form>
            </div>
          </MDBCol>

          <MDBCol col="6" className="mb-2 ms-3">
            <div
              style={{ backgroundColor: "#4b2980" }}
              className="d-flex flex-column  justify-content-center  h-100 mb-4"
            >
              <div className="text-white px-2 py-3 p-md-3 mx-md-4">
                <h4 class="mb-4 text-center">Comsats Catalog Portal</h4>
                <p class="small  mb-0">
                  The purpose of this portal is to provide a single point of
                  contact for the employees of CIIT. CIIT Course Catalog Portal
                  enables employees to find scheme of studies, list of courses
                  and course contents.
                </p>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Login;

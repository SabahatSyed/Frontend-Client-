import React, { useState } from "react";
import "../css/styles.css";
import Popup from "./PopupFunction";
import Login from "./Login";
// import logo from "./FacultyRoutes/comsats_logo.png";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import comsats from "../css/comsats.jpg";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { AppBar, Box, Button, Modal } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import background from "../css/comsats.jpg";

export default function Home() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "#fff",
    boxShadow: 24,
    p: 4,
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
  };

  return (
    <div>
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" style={{ backgroundColor: "#00447f" }}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                COMSATS University Islamabad
              </Typography>
              <button
                style={{ backgroundColor: "#fff", color: "#000" }}
                class="btn btn-primary"
                id="btnNavbarSearch"
                type="button"
                onClick={handleOpen}
              >
                <span style={{ marginRight: 10 }}>
                  <BsFillPersonPlusFill />
                </span>
                Login
              </button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Login />
                </Box>
              </Modal>
            </Toolbar>
          </AppBar>
        </Box>
      </div>

      <div
        className="header"
        style={{
          backgroundImage: `url(${background})`,
          // height: "70vh",
          // backgroundSize: "cover",
          // backgroundPosition: "center",
        }}
      ></div>

      <div className="section">
        <p>
          <h5>
            <b>About:</b>
          </h5>
          CIIT Course Catalog Portal is an information and assistance resource
          designed for the CIIT Faculty and Staff. The purpose of this portal is
          to provide a single point of contact for the employees of CIIT. CIIT
          Course Catalog Portal enables employees to find scheme of studies,
          list of courses and course contents. <br></br> Every possible effort
          has been made to ensure that the information presented in this Catalog
          is correct. However, this information is subject to change by
          appropriate action of the competent authority of CIIT.
        </p>
        <div>
          <div
            style={{
              backgroundColor: "#00447f",
              padding: 10,
              textAlign: "center",
            }}
          >
            <h5 style={{ color: "#fff" }}>Find Scheme of Studies</h5>
          </div>
          <div className="my-4">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Title</InputLabel>
              <Select className="mb-4" label="Title" size="medium">
                <MenuItem>2012-2014</MenuItem>
                <MenuItem>2016-2020</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Program</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                label="Department"
                size="medium"
              >
                <MenuItem>Computer Science</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <Button
          style={{ backgroundColor: "#4b2980" }}
          variant="contained"
          size="medium"
        >
          VIEW SCHEME OF STUDIES
        </Button>
      </div>
      <div style={{ backgroundColor: "#00447f" }}>
        <p className="text-white py-3 text-center">
          Copyright © COMSATS University Islamabad, All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

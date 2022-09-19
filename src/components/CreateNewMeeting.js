import React, { useEffect, useState } from "react";
import "./css/styles.css";
import axios from "axios";

import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { Autocomplete, Box, Modal, TextField } from "@mui/material";
import { AiFillDelete, AiFillEdit, AiOutlineFieldTime } from "react-icons/ai";

const modalstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  //   border: "2px solid #000",

  boxShadow: 24,
  p: 4,
};

function ActionButton() {
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{ marginLeft: 16 }}
        //   onClick={}
      >
        <AiFillEdit style={{ marginRight: 10 }} />
        Edit
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{ marginLeft: 16 }}
        //   onClick={}
      >
        <AiFillDelete style={{ marginRight: 10 }} />
        Delete
      </Button>
    </>
  );
}

export default function CreateNewMeeting() {
  const [rows, setRows] = useState([]);
  const [open1, setOpen1] = useState(false);
  const handleClose1 = () => setOpen1(false);
  const handleSubmit = async (e) => {};
  const handleChange = async (e) => {};

  useEffect(() => {
    const getAll = async () => {
      const res = await axios.get("http://localhost:4000/Task/show");
      setRows(res.data);
      console.log(res.data);
    };

    getAll();
  }, []);

  const columns = [
    /*     { field: "id", headerName: "ID" },
     */ {
      field: "task",
      headerName: "Task Title",
      flex: 1,
    },
    {
      field: "Cacmembers",
      headerName: "Cac Members",
      flex: 1,
    },
    {
      field: "meetingDate",
      headerName: "Meeting Date",
      flex: 1,
    },
    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      editable: false,
      renderCell: ActionButton,
    },
  ];

  return (
    <div
      className="container card"
      style={{ height: 700, width: "100%", padding: 20 }}
    >
      <h1>All Meetings</h1>
      <div className="d-flex justify-content-end">
        <Button
          variant="contained"
          color="primary"
          size="medium"
          style={{ marginRight: 15 }}
          onClick={() => setOpen1(true)}
        >
          Create New Meeting
        </Button>
        <Modal
          open={open1}
          onClose={handleClose1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalstyle}>
            <div style={{ marginBottom: 10 }}>
              <div>
                <Autocomplete
                  multiple
                  id="tags-standard"
                  options={rows}
                  getOptionLabel={(option) => option.taskType}
                  onChange={handleChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Select Tasks"
                      placeholder="Select Tasks"
                      size="small"
                    />
                  )}
                />
              </div>
              <div>
                <label style={{ display: "block" }} for="title">
                  <b>Select Date & Time</b>
                </label>
                <input
                  name="time"
                  onChange={handleChange}
                  style={{ width: "100%" }}
                  type="datetime-local"
                  // value={data.time}
                ></input>
              </div>

              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginTop: 16 }}
                onClick={handleSubmit}
              >
                <AiOutlineFieldTime style={{ marginRight: 10 }} />
                Create Meeting
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
      <div>
        {/* <DataGrid
          style={{ height: 400, width: "100%" }}
          columns={columns}
          rows={rows}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        /> */}
      </div>
    </div>
  );
}

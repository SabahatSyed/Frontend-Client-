import React, { useEffect, useState } from "react";
import "../css/styles.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineClockCircle, AiOutlineUsergroupAdd } from "react-icons/ai";
import { MenuItem, Modal } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { Box } from "@mui/system";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#fff",
  boxShadow: 24,
  p: 4,
  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
};

export default function FacultyMeeting({ persist }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rows, setRows] = useState([]);
  const [meetingDetails, setMeetingDetails] = useState({});
  const [rowId, setRowId] = useState();
  const [teacherId, setTeacherId] = useState();
  const [open1, setOpen1] = useState(false);
  const handleClose1 = () => setOpen1(false);
  const [availability, setAvailability] = useState({
    mon: "",
    tue: "",
    wed: "",
    thur: "",
    fri: "",
    sat: "",
  });
  useEffect(() => {
    const getAll = async () => {
      var user = await axios.get("http://localhost:4000/Auth/check");
      var { data } = await axios.get("http://localhost:4000/Meeting/all");
      data = data.map((meeting) => {
        return {
          subject: meeting.subject,
          id: meeting._id,
        };
      });
      setTeacherId(user.data._id);
      setRows(data);

      console.log(data);
      console.log(rows);
    };

    getAll();
  }, []);

  const handleChange = (event) => {
    console.log("persist", persist);
    setAvailability({
      ...availability,
      [event.target.name]: event.target.value,
    });
    console.log(availability);
  };

  const handleSubmit = async (e) => {
    console.log("called", teacherId, rowId, availability);
    e.preventDefault();
    await axios.put(
      `http://localhost:4000/Meeting/update/${teacherId}/${rowId}`,
      availability
    );
    console.log("called2");
  };

  const columns = [
    {
      field: "subject",
      headerName: "Meeting Subject",
      flex: 1,
    },
    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      editable: false,
      renderCell: (props) => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={() => {
              setOpen(true);
              setRowId(props.row.id);
            }}
          >
            <AiOutlineClockCircle style={{ marginRight: 10 }} />
            Set Availability
          </Button>

          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={async () => {
              setOpen1(true);
              var { data } = await axios.get(
                `http://localhost:4000/Meeting/get/${props.row.id}`
              );
              setMeetingDetails({
                ...data,
                time: new Date(data.time).toLocaleString(),
              });
              console.log(data);
              console.log(meetingDetails);
            }}
          >
            <AiOutlineUsergroupAdd style={{ marginRight: 10 }} />
            View Meeting
          </Button>
        </>
      ),
    },
  ];

  return (
    <div
      className="container"
      style={{ height: 700, width: "100%", padding: 20 }}
    >
      <h1>All Meetings</h1>

      <div>
        <DataGrid
          style={{ height: 400, width: "100%" }}
          columns={columns}
          rows={rows}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <>
            <div className="form-group">
              <FormControl fullWidth size="small">
                <InputLabel id="taskType">Monday</InputLabel>
                <Select
                  className="mb-4"
                  labelId="mon"
                  id="mon"
                  name="mon"
                  // value={taskType}
                  label="Task Type"
                  onChange={handleChange}
                  autoWidth
                >
                  <MenuItem value={"8:30-10:00"}>8:30-10:00</MenuItem>
                  <MenuItem value={"10:00-11:30"}>10:00-11:30</MenuItem>
                  <MenuItem value={"11:30-01:00"}>11:30-01:00</MenuItem>
                  <MenuItem value={"01:00-2:30"}>01:00-2:30</MenuItem>
                  <MenuItem value={"2:30-4:00"}>2:30-4:00</MenuItem>
                  <MenuItem value={"4:30-5:30"}>4:30-5:30</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="form-group">
              <FormControl fullWidth size="small">
                <InputLabel id="taskType">Tuesday</InputLabel>
                <Select
                  className="mb-4"
                  labelId="mon"
                  name="tue"
                  onChange={handleChange}
                  // value={taskType}
                  label="Task Type"
                  autoWidth
                >
                  <MenuItem value={"8:30-10:00"}>8:30-10:00</MenuItem>
                  <MenuItem value={"10:00-11:30"}>10:00-11:30</MenuItem>
                  <MenuItem value={"11:30-01:00"}>11:30-01:00</MenuItem>
                  <MenuItem value={"01:00-2:30"}>01:00-2:30</MenuItem>
                  <MenuItem value={"2:30-4:00"}>2:30-4:00</MenuItem>
                  <MenuItem value={"4:30-5:30"}>4:30-5:30</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="form-group">
              <FormControl fullWidth size="small">
                <InputLabel id="taskType">Wednesday</InputLabel>
                <Select
                  className="mb-4"
                  labelId="mon"
                  onChange={handleChange}
                  name="wed"
                  // value={taskType}
                  label="Task Type"
                  autoWidth
                >
                  <MenuItem value={"8:30-10:00"}>8:30-10:00</MenuItem>
                  <MenuItem value={"10:00-11:30"}>10:00-11:30</MenuItem>
                  <MenuItem value={"11:30-01:00"}>11:30-01:00</MenuItem>
                  <MenuItem value={"01:00-2:30"}>01:00-2:30</MenuItem>
                  <MenuItem value={"2:30-4:00"}>2:30-4:00</MenuItem>
                  <MenuItem value={"4:30-5:30"}>4:30-5:30</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="form-group">
              <FormControl fullWidth size="small">
                <InputLabel id="taskType">Thursday</InputLabel>
                <Select
                  className="mb-4"
                  labelId="mon"
                  onChange={handleChange}
                  name="thur"
                  // value={taskType}
                  label="Task Type"
                  autoWidth
                >
                  <MenuItem value={"8:30-10:00"}>8:30-10:00</MenuItem>
                  <MenuItem value={"10:00-11:30"}>10:00-11:30</MenuItem>
                  <MenuItem value={"11:30-01:00"}>11:30-01:00</MenuItem>
                  <MenuItem value={"01:00-2:30"}>01:00-2:30</MenuItem>
                  <MenuItem value={"2:30-4:00"}>2:30-4:00</MenuItem>
                  <MenuItem value={"4:30-5:30"}>4:30-5:30</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="form-group">
              <FormControl fullWidth size="small">
                <InputLabel id="taskType">Friday</InputLabel>
                <Select
                  className="mb-4"
                  labelId="mon"
                  onChange={handleChange}
                  name="fri"
                  // value={taskType}
                  label="Task Type"
                  autoWidth
                >
                  <MenuItem value={"8:30-10:00"}>8:30-10:00</MenuItem>
                  <MenuItem value={"10:00-11:30"}>10:00-11:30</MenuItem>
                  <MenuItem value={"11:30-01:00"}>11:30-01:00</MenuItem>
                  <MenuItem value={"01:00-2:30"}>01:00-2:30</MenuItem>
                  <MenuItem value={"2:30-4:00"}>2:30-4:00</MenuItem>
                  <MenuItem value={"4:30-5:30"}>4:30-5:30</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="form-group">
              <FormControl fullWidth size="small">
                <InputLabel id="taskType">Saturday</InputLabel>
                <Select
                  className="mb-4"
                  labelId="sat"
                  onChange={handleChange}
                  name="sat"
                  // value={taskType}
                  label="Task Type"
                  autoWidth
                >
                  <MenuItem value={"8:30-10:00"}>8:30-10:00</MenuItem>
                  <MenuItem value={"10:00-11:30"}>10:00-11:30</MenuItem>
                  <MenuItem value={"11:30-01:00"}>11:30-01:00</MenuItem>
                  <MenuItem value={"01:00-2:30"}>01:00-2:30</MenuItem>
                  <MenuItem value={"2:30-4:00"}>2:30-4:00</MenuItem>
                  <MenuItem value={"4:30-5:30"}>4:30-5:30</MenuItem>
                </Select>
              </FormControl>
            </div>
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginTop: 16 }}
              onClick={handleSubmit}
            >
              <AiOutlineClockCircle style={{ marginRight: 10 }} />
              Submit
            </Button>
          </>
        </Box>
      </Modal>
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="card p-4">
            <h4>Meeting Title:</h4>
            <p>{meetingDetails.subject}</p>
            <h4>Meeting Time:</h4>
            <p>{meetingDetails.time}</p>
            <h4>Meeting Agenda: </h4>
            <p>{meetingDetails.meetingAgenda}</p>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

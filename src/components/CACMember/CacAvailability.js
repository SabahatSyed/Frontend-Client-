import React, { useEffect, useState } from "react";
import "../css/styles.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";
import { AiOutlineClockCircle, AiOutlineUsergroupAdd } from "react-icons/ai";
import { Grid, MenuItem, Modal, OutlinedInput } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { Box } from "@mui/system";
import MeetingUpdateNotification from "./AvailabilityUpdateNotification";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const times = [
  "8:30-10:00",
  "10:00-11:30",
  "11:30-1:00",
  "1:00-2:30",
  "2:30-4:00",
  "4:00-5:30",
];

// function getStyles(time, availabilityTime, theme) {
//   return {
//     fontWeight:
//       availabilityTime.indexOf(time) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

const columns = [
  {
    field: "mon",
    headerName: "Monday",
    flex: 1,
  },
  {
    field: "tue",
    headerName: "Tuesday",
    flex: 1,
  },
  {
    field: "wed",
    headerName: "Wednesday",
    flex: 1,
  },
  {
    field: "thur",
    headerName: "Thusday",
    flex: 1,
  },
  {
    field: "fri",
    headerName: "Friday",
    flex: 1,
  },
  {
    field: "sat",
    headerName: "Saturday",
    flex: 1,
  },
];

export default function CacAvailability() {
  // const theme = useTheme();
  const [availabilityTimeMon, setAvailabilityTImeMon] = React.useState([]);
  const [availabilityTimeTue, setAvailabilityTImeTue] = React.useState([]);
  const [availabilityTimeThur, setAvailabilityTImeThur] = React.useState([]);
  const [availabilityTimeFri, setAvailabilityTImeFri] = React.useState([]);
  const [availabilityTimeSat, setAvailabilityTImeSat] = React.useState([]);
  const [availabilityTimeWed, setAvailabilityTImeWed] = React.useState([]);
  const [teacherId, setTeacherId] = useState();
  const [availabilityData, setAvailabilityData] = useState();
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const getAll = async () => {
      var user = await axios.get("http://localhost:4000/Auth/check");
      var { data } = await axios.get(
        `http://localhost:4000/Meeting/get-availability/${user.data._id}`
      );

      setAvailabilityData(data.time);
      console.log("data", data);

      setTeacherId(user.data._id);

      setLoading(false);
    };

    getAll();
  }, []);

  const handleChangeMon = (event) => {
    const {
      target: { value },
    } = event;

    setAvailabilityTImeMon(
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeTue = (event) => {
    const {
      target: { value },
    } = event;

    setAvailabilityTImeTue(
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeWed = (event) => {
    const {
      target: { value },
    } = event;

    setAvailabilityTImeWed(
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeThur = (event) => {
    const {
      target: { value },
    } = event;

    setAvailabilityTImeThur(
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeFri = (event) => {
    const {
      target: { value },
    } = event;

    setAvailabilityTImeFri(
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeSat = (event) => {
    const {
      target: { value },
    } = event;

    setAvailabilityTImeSat(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      mon: availabilityTimeMon,
      tue: availabilityTimeTue,
      wed: availabilityTimeWed,
      thur: availabilityTimeThur,
      fri: availabilityTimeFri,
      sat: availabilityTimeSat,
    };
    console.log(data);
    await axios.post(
      `http://localhost:4000/Meeting/add-availability/${teacherId}`,
      data
    );
  };

  return (
    !loading && (
      <div
        className="container"
        style={{ height: 700, width: "100%", padding: 20 }}
      >
        <MeetingUpdateNotification />
        <h1 className="py-4">
          <b>Meeting Availability</b>
        </h1>

        <div className="d-flex justify-content-end mb-4">
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginTop: 16 }}
            onClick={handleOpen}
          >
            <AiOutlineClockCircle style={{ marginRight: 10 }} />
            Set/Edit Availability
          </Button>
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <>
              <div className="form-group py-2">
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-multiple-name-label">Monday</InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    name="mon"
                    multiple
                    value={availabilityTimeMon}
                    onChange={handleChangeMon}
                    input={<OutlinedInput label="Monday" />}
                    MenuProps={MenuProps}
                    autoWidth
                  >
                    {times.map((time) => (
                      <MenuItem key={time} value={time}>
                        {time}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className="form-group py-2">
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-multiple-name-label">Tuesday</InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    name="tue"
                    multiple
                    value={availabilityTimeTue}
                    onChange={handleChangeTue}
                    input={<OutlinedInput label="Tuesday" />}
                    MenuProps={MenuProps}
                    autoWidth
                  >
                    {times.map((time) => (
                      <MenuItem key={time} value={time}>
                        {time}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className="form-group py-2">
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-multiple-name-label">
                    Wednesday
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    name="wed"
                    multiple
                    value={availabilityTimeWed}
                    onChange={handleChangeWed}
                    input={<OutlinedInput label="Wednesday" />}
                    MenuProps={MenuProps}
                    autoWidth
                  >
                    {times.map((time) => (
                      <MenuItem key={time} value={time}>
                        {time}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className="form-group py-2">
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-multiple-name-label">
                    Thursday
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    name="thur"
                    multiple
                    value={availabilityTimeThur}
                    onChange={handleChangeThur}
                    input={<OutlinedInput label="Thursday" />}
                    MenuProps={MenuProps}
                    autoWidth
                  >
                    {times.map((time) => (
                      <MenuItem key={time} value={time}>
                        {time}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className="form-group py-2">
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-multiple-name-label">Friday</InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    name="fri"
                    multiple
                    value={availabilityTimeFri}
                    onChange={handleChangeFri}
                    input={<OutlinedInput label="Friday" />}
                    MenuProps={MenuProps}
                    autoWidth
                  >
                    {times.map((time) => (
                      <MenuItem key={time} value={time}>
                        {time}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className="form-group py-2">
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-multiple-name-label">
                    Saturday
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    name="sat"
                    multiple
                    value={availabilityTimeSat}
                    onChange={handleChangeSat}
                    input={<OutlinedInput label="Saturday" />}
                    MenuProps={MenuProps}
                    autoWidth
                  >
                    {times.map((time) => (
                      <MenuItem key={time} value={time}>
                        {time}
                      </MenuItem>
                    ))}
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

        <div style={{ padding: 30 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} style={{ marginBottom: 30 }}>
              <Grid item xs={4}>
                <Item>
                  <h1>Monday</h1>
                  <h5>{availabilityData.mon}</h5>
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item>
                  <h1>Tuesday</h1>
                  <h5>{availabilityData.tue}</h5>
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item>
                  <h1>Wednesday</h1>
                  <h5>{availabilityData.wed}</h5>
                </Item>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Item>
                  <h1>Thursday</h1>
                  <h5>{availabilityData.thur}</h5>
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item>
                  <h1>Friday</h1>
                  <h5>{availabilityData.fri}</h5>
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item>
                  <h1>Saturday</h1>
                  <h5>{availabilityData.sat}</h5>
                </Item>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    )
  );
}

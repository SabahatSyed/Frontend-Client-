import React, { useState, useEffect } from "react";
import "./css/styles.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import {
  DataGrid,
  gridPaginatedVisibleSortedGridRowEntriesSelector,
} from "@mui/x-data-grid";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import {
  Autocomplete,
  MenuItem,
  Modal,
  TextField,
  Tooltip,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { Box } from "@mui/system";
import CreateTasks from "./CreateTasks";
import EditTasks from "./EditTasks";
import CloseIcon from "@mui/icons-material/Close";
import { muiAbtn, muibtn } from "./style";

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

export default function InitializeTask() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open1, setOpen1] = useState(false);
  const handleClose1 = () => setOpen1(false);

  const [taskType, setTaskType] = useState("");
  const [AssignMember, setAssignMember] = useState([]);
  const [CAC, setCAC] = useState([]);
  const [Programs, setPrograms] = useState([]);
  const [Program, setProgram] = useState([]);

  console.log(rows);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (taskType != "" && AssignMember != "" && Program != "") {
      const res = await axios.post("http://localhost:4000/Task/addInit", {
        taskType,
        AssignMember,
        Program,
      });
      setTaskType("");
      setAssignMember([]);
      setProgram("");
      getRows();
    } else {
      alert("Empty Field");
    }
  };

  const updateSubmit = async (e) => {
    e.preventDefault();
    if (taskType != "" && AssignMember != "" && Program != "") {
      const res = await axios.put(
        `http://localhost:4000/Task/updateInit/${upid}`,
        {
          taskType,
          AssignMember,
          Program,
          Task,
        }
      );
      setTaskType("");
      setAssignMember([]);
      setProgram("");
      setTasks([]);
      getRows();
      setOpen3(false);
    } else {
      alert("Empty Field");
    }
  };

  useEffect(() => {
    getData();
    getPrograms();
    getRows();
  }, []);
  const getData = async () => {
    const response = await axios.get("http://localhost:4000/User/show/CAC");
    setCAC(response.data);
  };
  const getPrograms = async () => {
    const res = await axios.get("http://localhost:4000/Program/show");
    setPrograms(res.data);
  };
  const getRows = async () => {
    const res = await axios.get("http://localhost:4000/Task/showInit");
    console.log(res.data);
    setRows(res.data);
  };
  // const [taskType, setTaskType] = useState("");
  // const [AssignMember, setAssignMember] = useState([]);
  // const [Program, setProgram] = useState([]);
  const ups = async (id) => {
    const res = await axios.get(`http://localhost:4000/Task/showOneInit/${id}`);
    const obj = res.data;
    setupid(id);
    setTaskType(obj.taskType);
    setAssignMember(obj.AssignMember);
    setProgram(obj.Program);
    setOpen3(true);
  };

  const [Init, setInit] = useState("");
  const [open2, setOpen2] = useState(false);
  const handleClose2 = () => {
    setInit("");
    setOpen2(false);
  };
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const handleClose4 = () => {
    setInit("");
    setOpen4(false);
  };

  const [Task, setTasks] = useState([]);
  const [upid, setupid] = useState("");

  const handleClose3 = () => {
    setTaskType("");
    setAssignMember("");
    setProgram("");
    setupid("");
    setOpen3(false);
  };
  const [Team, setTeam] = useState([]);
  const [TotalOngoingTasks, setTotalOngoingTasks] = useState("");
  const [ReturnedTasks, setReturnedTasks] = useState("");
  const [RemainingTasks, setRemainingTasks] = useState("");
  const Getss = async (id) => {
    const res = await axios.get(`http://localhost:4000/Task/showOneInit/${id}`);
    console.log("res", res.data);
    setTeam(res.data.AssignMember);
    setTotalOngoingTasks(res.data.Task.length);
    var returne = 0;
    var ip = 0;
    res.data.Task.forEach((element) => {
      if (element.Status == "Returned") returne = returne + 1;
      else ip = ip + 1;
    });
    setReturnedTasks(returne);
    setRemainingTasks(ip);
  };
  function Mbutton(props) {
    const { row } = props;

    return (
      <div>
        {/* Edit tasks assigned to memebers */}
        {row.Task?.length > 0 && row.Task != null ? (
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={muiAbtn}
            onClick={() => {
              setInit(row);
              setOpen4(true);
            }}
          >
            <AiFillEdit />
            Edit Task
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={muiAbtn}
            onClick={() => {
              setInit(row);
              setOpen2(true);
            }}
          >
            <AiFillDelete style={{ marginRight: 10 }} />
            Assign Task
          </Button>
        )}
        {/* Edit InitTasks */}
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ backgroundColor: "#4b2980", marginLeft: 16, padding: 5 }}
          onClick={() => {
            ups(row._id);
            setTasks(row.Task);
          }}
        >
          <AiFillEdit />
          Edit Group
        </Button>

        {row.Task?.length > 0 && row.Task != null && (
          <Tooltip title="View task Progress" placement="top-start">
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{
                backgroundColor: "#4b2980",
                marginLeft: 16,
                padding: 10,
              }}
              onClick={() => {
                Getss(row._id);
                setOpen1(true);
              }}
            >
              <AiFillEye />
            </Button>
          </Tooltip>
        )}
        <Tooltip title="Delete" placement="top-start">
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ backgroundColor: "#4b2980", marginLeft: 16, padding: 10 }}
            onClick={async () => {
              await axios.delete(
                `http://localhost:4000/Task/deleteInit/${row._id}`
              );
              getRows();
            }}
          >
            <AiFillDelete />
          </Button>
        </Tooltip>
      </div>
    );
  }
  const columns = [
    {
      field: "taskType",
      headerName: "Task Type",
      flex: 1,
    },
    {
      field: "Program",
      headerName: "Program",
      flex: 1,
    },
    // {
    //   field: "AssignMember",
    //   headerName: "CAC Members Assigned",
    //   renderCell: (params) =>
    //     params?.row?.AssignMember.map((i) => {
    //       return <>{i.Name + "  "}</>;
    //     }),
    //   flex: 2,
    // },

    {
      field: "Action",
      headerName: "Action",
      flex: 3,
      editable: false,
      renderCell: Mbutton,
    },
  ];
  return (
    <div
      className="container"
      style={{ height: 700, width: "100%", padding: 20 }}
    >
      <h1>
        <b>Task Initialization</b>
      </h1>

      <div className="d-flex justify-content-end mb-4">
        <Button
          style={muibtn}
          variant="contained"
          color="primary"
          size="small"
          onClick={handleOpen}
        >
          <AiFillEdit style={{ marginRight: 10 }} />
          Initialize New Task
        </Button>
      </div>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ overflow: "scroll" }}
      >
        <Box sx={style}>
          <div className="container">
            <Box mb={1} style={{ display: "flex", justifyContent: "end" }}>
              <CloseIcon
                onClick={handleClose2}
                style={{ cursor: "pointer", color: "gray" }}
              />
            </Box>

            <div
              style={{
                height: "calc(100vh - 20vh)",
                overflow: "auto",
              }}
            >
              <CreateTasks
                pre={Init}
                func={() => {
                  getRows();
                  handleClose2();
                }}
              />
            </div>
          </div>
        </Box>
      </Modal>

      {/* progress ----------------------*/}
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalstyle}>
          <h4>Team Members: </h4>
          <p>
            {Team.map((i) => {
              return i.Name + " ";
            })}
          </p>
          <h4>Total Tasks Assigned: </h4>
          <p>{TotalOngoingTasks}</p>
          <h4>Returned Tasks: </h4>
          <p>{ReturnedTasks}</p>
          <h4>Remaining Tasks: </h4>
          <p style={{ color: "red" }}>
            <b>{RemainingTasks}</b>
          </p>
        </Box>
      </Modal>

      {/* Edit Task */}
      <Modal
        open={open4}
        onClose={handleClose4}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ overflow: "scroll" }}
      >
        <Box sx={style}>
          <div
            className="container"
            style={{
              height: "calc(100vh - 56px)",
              overflow: "auto",
            }}
          >
            <Box mb={3} style={{ display: "flex", justifyContent: "end" }}>
              <CloseIcon
                onClick={handleClose4}
                style={{ cursor: "pointer", color: "gray" }}
              />
            </Box>
            <div>
              <EditTasks
                pre={Init}
                func={() => {
                  getRows();
                  handleClose4();
                }}
              />
            </div>
          </div>
        </Box>
      </Modal>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Box mb={3} style={{ display: "flex", justifyContent: "end" }}>
              <CloseIcon
                onClick={handleClose}
                style={{ cursor: "pointer", color: "gray" }}
              />
            </Box>
            <h4 className="mb-4">INITIALIZE NEW TASK</h4>
            <div>
              <FormControl fullWidth size="small">
                <InputLabel id="taskType">Task Type</InputLabel>
                <Select
                  className="mb-4"
                  labelId="task-type"
                  name="tasktype"
                  value={taskType}
                  onChange={(e) => setTaskType(e.target.value)}
                  label="Task Type"
                  autoWidth
                >
                  <MenuItem value={"Create Catalog Description"}>
                    Create Catalog Description
                  </MenuItem>
                  <MenuItem value={"Update Catalog Description"}>
                    Update Catalog Description
                  </MenuItem>
                  <MenuItem value={"Create SOS"}>Create SOS</MenuItem>
                  <MenuItem value={"Update SOS"}>Update SOS</MenuItem>
                  <MenuItem value={"Create CDF"}>Create CDF</MenuItem>
                  <MenuItem value={"Update CDF"}>Update CDF</MenuItem>
                  <MenuItem value={"Create Syllabus"}>Create Syllabus</MenuItem>
                  <MenuItem value={"Update Syllabus"}>Update Syllabus</MenuItem>
                  <MenuItem value={"Create Lab Manual"}>
                    Create Lab Manual
                  </MenuItem>
                  <MenuItem value={"Update Lab Manual"}>
                    Update Lab Manual
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <Autocomplete
                className="mb-4"
                multiple
                id="tags-standard"
                options={CAC}
                value={AssignMember}
                getOptionLabel={(option) => option.Name}
                onChange={(e, val) => setAssignMember(val)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Select CAC Member"
                    placeholder="Select CAC Member"
                  />
                )}
              />
            </div>
            <div>
              <FormControl fullWidth size="small">
                <InputLabel id="Program">Program</InputLabel>
                <Select
                  className="mb-4"
                  labelId="Program"
                  name="Program"
                  value={Program}
                  onChange={(e) => setProgram(e.target.value)}
                  label="Program"
                  autoWidth
                >
                  <MenuItem value={"For All"}>For All</MenuItem>
                  {Programs.map((a) => {
                    return (
                      <MenuItem value={a.Degree + " " + a.Program}>
                        {a.Degree} {a.Program}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <Button
              fullWidth
              style={muibtn}
              variant="contained"
              color="primary"
              size="small"
              type="submit"
            >
              <AiFillEdit style={{ marginRight: 10 }} />
              Initialize Task
            </Button>
          </form>
        </Box>
      </Modal>

      <Modal
        open={open3}
        onClose={handleClose3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={updateSubmit}>
            <Box mb={1} style={{ display: "flex", justifyContent: "end" }}>
              <CloseIcon
                onClick={handleClose3}
                style={{ cursor: "pointer", color: "gray" }}
              />
            </Box>
            <h4 className="mb-4 pb-3">EDIT INITIALIZED TASKS</h4>
            <div>
              <FormControl fullWidth size="small">
                <InputLabel id="taskType">Task Type</InputLabel>
                <Select
                  className="mb-4"
                  labelId="task-type"
                  name="tasktype"
                  value={taskType}
                  onChange={(e) => setTaskType(e.target.value)}
                  label={taskType}
                  autoWidth
                >
                  <MenuItem value={"Create Course"}>Create Course</MenuItem>
                  <MenuItem value={"Update Course"}>Update Course</MenuItem>
                  <MenuItem value={"Create SOS"}>Create SOS</MenuItem>
                  <MenuItem value={"Update SOS"}>Update SOS</MenuItem>
                  <MenuItem value={"Create CDF"}>Create CDF</MenuItem>
                  <MenuItem value={"Update CDF"}>Update CDF</MenuItem>
                  <MenuItem value={"Create Syllabus"}>Create Syllabus</MenuItem>
                  <MenuItem value={"Update Syllabus"}>Update Syllabus</MenuItem>
                  <MenuItem value={"Create Lab Manual"}>
                    Create Lab Manual
                  </MenuItem>
                  <MenuItem value={"Update Lab Manual"}>
                    Update Lab Manual
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <Autocomplete
                className="mb-4"
                multiple
                id="tags-standard"
                options={CAC}
                value={AssignMember}
                getOptionLabel={(option) => option.Name}
                onChange={(e, val) => setAssignMember(val)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Select CAC Member"
                    placeholder="Select CAC Member"
                  />
                )}
              />
            </div>
            <div>
              <FormControl fullWidth size="small">
                <InputLabel id="Program">Program</InputLabel>
                <Select
                  className="mb-4"
                  labelId="Program"
                  name="Program"
                  value={Program}
                  onChange={(e) => setProgram(e.target.value)}
                  label={Program}
                  autoWidth
                >
                  <MenuItem value={"For All"}>For All</MenuItem>
                  {Programs.map((a) => {
                    return (
                      <MenuItem value={a.Degree + " " + a.Program}>
                        {a.Degree} {a.Program}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <Button
              variant="contained"
              color="primary"
              size="small"
              type="submit"
              fullWidth
              style={muibtn}
            >
              <AiFillEdit style={{ marginRight: 10 }} />
              EDIt Initialized Task
            </Button>
          </form>
        </Box>
      </Modal>

      <div>
        <DataGrid
          style={{ height: 400, width: "100%" }}
          columns={columns}
          rows={rows}
          getRowId={(Rows) => Rows._id}
          pageSize={10}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>
    </div>
  );
}

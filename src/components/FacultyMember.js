import React, { useState, useEffect } from "react";
import "./css/styles.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import Autocomplete from "@mui/material/Autocomplete";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  TextField,
} from "@mui/material";
import Select from "@mui/material/Select";
import { muiAbtn, muibtn } from "./style";

const style = {
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

export default function FacultyMembers() {
  axios.defaults.withCredentials = true;
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setobj([
      {
        Program: "",
        Course: "",
        Section: "",
      },
    ]);
    setUser("");
    setCourse([[]]);
    setup(false);
  };
  const [Rows, setRows] = useState([]);
  const [Courses, setCourse] = useState([[]]);
  const [Programdb, setProgramdb] = useState([]);
  const [User, setUser] = useState("");
  const [obj, setobj] = useState([
    {
      Program: "",
      Course: "",
      Section: "",
    },
  ]);

  const getPrograms = async () => {
    const res = await axios.get("http://localhost:4000/SOS/Programs");
    setProgramdb(res.data);
  };
  const getProgramCourses = async (index, Program) => {
    const res = await axios.get(
      `http://localhost:4000/ProgramCourses/show/${Program}`
    );
    const clone = [...Courses];
    clone[index] = res.data;
    setCourse([...clone]);
  };
  console.log("Course", Courses);
  console.log(Rows);
  useEffect(() => {
    getPrograms();
    getData();
  }, []);
  const getData = async () => {
    const response = await axios.get("http://localhost:4000/User/show/Faculty");
    setRows(response.data);
  };
  const [up, setup] = useState(false);
  //-------------
  const getobjs = async (id) => {
    const response = await axios.get(
      `http://localhost:4000/UserAssigedFolders/showAllbyid/${id}`
    );
    const col = await Promise.all(
      response.data.filter((i) => {
        if (i.LabTheory != "Lab") {
          return {
            Program: i.Program,
            Course: i.Course,
            Section: i.Section,
          };
        }
      })
    );
    const col2 = await Promise.all(
      await col.map(async (i) => {
        if (i.LabTheory != "Lab") {
          const res = await axios.get(
            `http://localhost:4000/ProgramCourses/show/${i.Program}`
          );
          return [...res.data];
        }
      })
    );
    setCourse([...col2]);
    setobj([...col]);
    setup(true);
    setOpen(true);
  };
  const Submitform = async (e) => {
    e.preventDefault();
    console.log(obj);
    let verify = true;
    obj.forEach((i) => {
      console.log("i", i);
      if (i.Program == "" || i.Course == "" || i.Section == "") {
        verify = false;
      }
    });
    if (verify) {
      if (!up) {
        await axios.post("http://localhost:4000/AssginFolders/add", {
          obj,
          User,
        });
      } else {
        await axios.post("http://localhost:4000/AssginFolders/add2", {
          obj,
          User,
        });
      }
      getData();
      handleClose();
    } else {
      alert("Empty Field");
    }
  };
  const columns = [
    {
      field: "Name",
      headerName: "Name",
      flex: 2,
    },
    {
      field: "Email",
      headerName: "Email",
      flex: 3,
    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 2,
      editable: false,
      renderCell: ({ row }) => (
        <>
          {row.CourseFolders.length < 1 ? (
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={muiAbtn}
              onClick={() => {
                setUser(row);
                setOpen(true);
              }}
            >
              <AiFillEdit style={{ marginRight: 10 }} />
              Assign Course
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={muiAbtn}
              onClick={() => {
                setUser(row);
                getobjs(row._id);
              }}
            >
              <AiFillEdit style={{ marginRight: 10 }} />
              Edit Course
            </Button>
          )}
        </>
      ),
    },
  ];
  return (
    <div
      className="container"
      style={{ height: 700, width: "100%", padding: 20 }}
    >
      <h1 className="py-4">
        <b>Faculty Members</b>
      </h1>
      <div>
        <DataGrid
          style={{ height: 400, width: "100%" }}
          columns={columns}
          getRowId={(Rows) => Rows._id}
          rows={Rows}
          pageSize={10}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" sx={style} onSubmit={Submitform}>
          {obj.map((o, index) => {
            return (
              <>
                <h4 className="mb-4">ASSIGN COURSE {index + 1}</h4>
                {obj.length > 1 && (
                  <FormControl>
                    <Button
                      className="mb-3"
                      variant="contained"
                      color="primary"
                      size="medium"
                      style={muibtn}
                      onClick={() => {
                        var clone = [...obj];
                        if (clone.length == index + 1) {
                          console.log("last rm");
                          clone[index] = {
                            Program: "",
                            Course: "",
                            Section: "",
                          };
                        } else if (clone.length != index + 1) {
                          clone[index] = clone[index + 1];
                        }
                        const a = clone.splice(index, 1);
                        setobj([...clone]);
                        var clone2 = [...Courses];
                        if (clone2.length == index + 1) {
                          console.log("last rm");
                          clone2[index] = [];
                        } else if (clone2.length != index + 1) {
                          clone2[index] = clone2[index + 1];
                        }
                        const b = clone2.splice(index, 1);
                        setCourse([...clone2]);
                      }}
                    >
                      remove
                    </Button>
                  </FormControl>
                )}

                <div className=" mb-4">
                  <select
                    class="form-select"
                    placeholder="Select Program"
                    label="Assign Program"
                    onChange={(e) => {
                      const clone = [...obj];
                      clone[index].Program = e.target.value;
                      setobj([...clone]);
                      getProgramCourses(index, e.target.value);
                    }}
                  >
                    <option value={obj[index].Program} selected disabled hidden>
                      {obj[index].Program != "" && obj[index].Program}
                    </option>
                    {Programdb.map((p) => {
                      return <option value={p}>{p}</option>;
                    })}
                  </select>
                </div>
                <div className="row">
                  <div className="col">
                    {/* <Autocomplete
                      multiple
                      id="tags-standard"
                      className="mb-4"
                      value={AssignCources[index]}
                      options={Courses[index]}
                      getOptionLabel={(option) => option.Name}
                      defaultValue={[]}
                      onChange={(e, val) =>{
                        const clone = [...obj];
                        clone[index].Course = val;
                        setobj([...clone]); 
                        const clone2 = [...AssignCources];
                        clone2[index]= val;
                        setAssignCourses([...clone2])
                      }
                    }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Assign Cources"
                          placeholder="Assign Cources"
                        />
                      )}
                    /> */}

                    <FormControl fullWidth size="small">
                      <InputLabel id="taskType">Assign Cources</InputLabel>
                      <Select
                        className="mb-4"
                        labelId="taskType"
                        id="taskType"
                        value={obj[index].Course}
                        label="Assign Course"
                        onChange={(e) => {
                          const clone = [...obj];
                          clone[index].Course = e.target.value;
                          setobj([...clone]);
                        }}
                        autoWidth
                      >
                        <option
                          value={obj[index]?.Course}
                          selected
                          disabled
                          hidden
                        >
                          {obj[index]?.Course != "" && obj[index]?.Course?.Name}
                        </option>
                        {Courses[index].map((a) => {
                          return <MenuItem value={a}>{a.Name}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col form-floating mb-3">
                    <input
                      className="form-control"
                      id="inputName"
                      type="text"
                      value={obj[index].Section}
                      onChange={(e) => {
                        const clone = [...obj];
                        clone[index].Section = e.target.value;
                        setobj([...clone]);
                      }}
                    />
                    <label htmlFor="text" className="form-label">
                      Section
                    </label>
                  </div>
                </div>
              </>
            );
          })}
          <div className="d-flex justify-content-center">
            <Button
              variant="contained"
              color="primary"
              size="large"
              width="100"
              style={{
                backgroundColor: "#4b2980",
                marginTop: 10,
                marginRight: 20,
              }}
              onClick={() => {
                setobj([
                  ...obj,
                  {
                    Program: "",
                    Course: "",
                    Section: "",
                  },
                ]);
                setCourse([...Courses, []]);
              }}
            >
              Add another Course
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              width="100"
              type="submit"
              style={{ backgroundColor: "#4b2980", marginTop: 10 }}
            >
              Assign Course
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

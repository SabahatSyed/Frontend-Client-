import React, { useState, useEffect } from "react";
import "./css/styles.css";
import Button from "@mui/material/Button";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import axios from "axios";
import { Autocomplete } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function TaskDetails() {
  return (
    <div>
      <h2>Create Task</h2>
      <TextField
        label="Course Name"
        variant="outlined"
        size="small"
      ></TextField>

      <TextField
        label="Course Description"
        variant="outlined"
        size="small"
      ></TextField>

      <InputLabel id="taskType">Assign Course</InputLabel>
      <Select
        className="mb-4"
        labelId="courseAssign"
        id="courseAssign"
        //   value={age}
        label="Assign Teacher"
        //   onChange={null}
        autoWidth
      >
        <MenuItem value={"Programming Fundamentals"}>
          Programming Fundamentals
        </MenuItem>
      </Select>
    </div>
  );
}

export default function EditTasks(props) {
  axios.defaults.withCredentials = true;
  const [Avail, setAvail] = useState([]);
  const [RepoCourse, setRepoCourse] = useState([]);
  console.log("pre", props.pre);
  const [obj, setobj] = useState([]);
  console.log("obj", obj);
  console.log("RepoCourse", RepoCourse);
  useEffect(async () => {
    await getRepoCourse();
    await getobj();
  }, []);

  const getobj = async () => {
    console.log(props.pre._id);
    const res = await axios.get(
      `http://localhost:4000/Task/showOneInit/${props.pre._id}`
    );
    setobj([...res.data.Task]);
  };

  const getRepoCourse = async () => {
    const response = await axios.get("http://localhost:4000/RepoCourse/show");
    setRepoCourse([...response.data]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(obj);
    let verify = true;
    obj.forEach((e) => {
      console.log("e", e);
      if (
        e.User == "" ||
        e.Deadline == "" ||
        e.Status == "" ||
        e.Course == ""
      ) {
        verify = false;
      }
    });
    if (verify) {
      console.log("23s");
      const res = await axios.put("http://localhost:4000/Task/Update", {
        obj,
        id: props.pre._id,
      });
      setobj([]);
      props.func();
    } else {
      alert("Empty Field");
    }
  };
  return (
    <div className="container" style={{ width: "100%", padding: 20 }}>
      <Card variant="outlined">
        <Box
          className="row  p-3"
          component="form"
          onSubmit={handleSubmit}
          sx={{ minWidth: 275 }}
        >
          <h2>Create Task</h2>
          <CardContent>
            <div className="col">
              <TextField
                className="mb-4"
                id="outlined-basic"
                label="Task Type"
                variant="outlined"
                value={props.pre.taskType}
                size="small"
                fullWidth
              />
            </div>
            {obj.length > 0 &&
              obj.map((oo, index) => {
                return (
                  <>
                    <div className="row my-4">
                      <div className="col-8">
                        <h3 style={{ textAlign: "start" }}>
                          <b>TASK {index + 1}</b>
                        </h3>
                      </div>
                      <div className="col-4">
                        {obj.length > 1 && (
                          <FormControl>
                            <Button
                              style={{
                                backgroundColor: "red",
                                borderRadius: "100px",
                              }}
                              variant="contained"
                              color="primary"
                              size="medium"
                              onClick={() => {
                                const clone = [...obj];
                                const a = clone.splice(index, 1);
                                console.log(
                                  "aaaaaaaaaaaaa",
                                  a,
                                  "cloneeeeeee",
                                  clone
                                );
                                setobj([...clone]);
                              }}
                            >
                              <CloseIcon />
                            </Button>
                          </FormControl>
                        )}
                      </div>
                    </div>
                    {props.pre.taskType == "Create Catalog Description" ||
                  props.pre.taskType == "Create CDF" ||
                  props.pre.taskType == "Create Syllabus" ? (
                    <div className="col">
                      <FormControl fullWidth size="small">
                        <InputLabel id="taskType">Assign Course</InputLabel>
                        <Select
                          className="mb-4"
                          labelId="courseAssign"
                          id="courseAssign"
                          value={obj[index].Course}
                          label="Assign Teacher"
                          onChange={(e) => {
                            const clone = [...obj];
                            clone[index].Course = e.target.value;
                            setobj([...clone]);
                          }}
                          autoWidth
                        >
                          {RepoCourse.map((a) => {
                            return (
                              <MenuItem value={a}>
                                {a.Code + "  " + a.Name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </div>
                  ) : props.pre.taskType == "Create SOS" ? (
                    <div className="col">
                      <FormControl fullWidth size="small">
                        <InputLabel id="taskType">Assign Course</InputLabel>
                        <Select
                          className="mb-4"
                          labelId="courseAssign"
                          id="courseAssign"
                          value={obj[index].Program}
                          label="Assign Teacher"
                          autoWidth
                        >
                          <MenuItem value={props.pre.Program}>
                            {props.pre.Program}
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  ) : props.pre.taskType == "Update SOS" ? (
                    <div>
                      <div className="col">
                        <FormControl fullWidth size="small">
                          <InputLabel id="taskType">Assign Course</InputLabel>
                          <Select
                            className="mb-4"
                            labelId="courseAssign"
                            id="courseAssign"
                            value={obj[index].Program}
                            label="Assign Teacher"
                            autoWidth
                          >
                            <MenuItem value={props.pre.Program}>
                              {props.pre.Program}
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                  ) : props.pre.taskType == "Update CDF" ? (
                    <div>
                      <Autocomplete
                        className="mb-4"
                        multiple
                        id="tags-standard"
                        options={top100Films}
                        getOptionLabel={(option) => option.title}
                        defaultValue={[top100Films[13]]}
                        //   onChange={}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="Select CDF"
                            placeholder="Select CDF"
                          />
                        )}
                      />
                    </div>
                  ) : props.pre.taskType == "Update Syllabus" ? (
                    <div>
                      <Autocomplete
                        className="mb-4"
                        multiple
                        id="tags-standard"
                        options={top100Films}
                        getOptionLabel={(option) => option.title}
                        defaultValue={[top100Films[13]]}
                        //   onChange={}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="Select Syllabus"
                            placeholder="Select Syllabus"
                          />
                        )}
                      />
                    </div>
                  ) : props.pre.taskType == "Update Lab Manual" ? (
                    <div>
                      <Autocomplete
                        className="mb-4"
                        multiple
                        id="tags-standard"
                        options={top100Films}
                        getOptionLabel={(option) => option.title}
                        defaultValue={[top100Films[13]]}
                        //   onChange={}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="Select Lab Manual"
                            placeholder="Select Lab Manual"
                          />
                        )}
                      />
                    </div>
                  ) : (
                    ""
                  )}


                    <div className="col">
                      <FormControl fullWidth size="small">
                        <InputLabel id="taskType">Status</InputLabel>
                        <Select
                          className="mb-4"
                          labelId="taskType"
                          id="taskType"
                          label="Assign Teacher"
                          autoWidth
                          value={obj[index].Status}
                          onChange={(e) => {
                            const clone = [...obj];
                            clone[index].Status = e.target.value;
                            setobj([...clone]);
                          }}
                        >
                          <MenuItem value={oo.Course} selected hidden>
                            {oo.Status}
                          </MenuItem>
                          ;<MenuItem value={"Assigned"}>Assigned</MenuItem>
                          <MenuItem value={"Revision"}>Revision</MenuItem>
                        </Select>
                      </FormControl>
                    </div>

                    <div>
                      <label>Deadline</label>
                      <input
                        className="mb-4"
                        // inputProps={{min = new Date.toISOString.slice(0,16)}}
                        value={oo.Deadline}
                        onChange={(e) => {
                          const clone = [...obj];
                          clone[index].Deadline = e.target.value;
                          setobj([...clone]);
                        }}
                        style={{ width: "100%" }}
                        type="datetime-local"
                        placeholder="Deadline"
                      ></input>
                    </div>
                  </>
                );
              })}
          </CardContent>
          <div className="col">
            <CardActions>
              <Stack>
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  onClick={() => {
                    setobj([
                      ...obj,
                      {
                        taskType: props.pre.taskType,
                        User: "",
                        Deadline: "",
                        Status: "",
                        Course: "",
                      },
                    ]);
                  }}
                >
                  Add
                </Button>
              </Stack>
            </CardActions>
          </div>
          <div className="col">
            <CardActions>
              <Stack>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="medium"
                  onClick={() => {
                    TaskDetails;
                  }}
                >
                  Create Task
                </Button>
              </Stack>
            </CardActions>
          </div>
        </Box>
      </Card>
    </div>
  );
}

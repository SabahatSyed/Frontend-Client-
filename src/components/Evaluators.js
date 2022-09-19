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
  Select,
  TextField,
} from "@mui/material";
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

export default function Evaluators() {
  axios.defaults.withCredentials = true;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setobj([
      {
        Faculty: "",
        Folders: "",
      },
    ]);
    setUser("");
    setUserFolders([[]]);
    setup(false);
  };
  const [up, setup] = useState(false);
  const [User, setUser] = useState("");
  const [Rows, setRows] = useState([]);
  const [FacUsers, setFacUsers] = useState([]);
  const [obj, setobj] = useState([
    {
      Faculty: "",
      Folders: "",
    },
  ]);
  const [UserFolders, setUserFolders] = useState([[]]);

  const getUsers = async () => {
    const res = await axios.get("http://localhost:4000/User/show/Faculty");
    setFacUsers(res.data);
  };
  const getUserFolds = async (index, id) => {
    const res = await axios.get(
      `http://localhost:4000/UserAssigedFolders/showAllbyid/${id}`
    );
    const clone = [...UserFolders];
    console.log("res.data", res.data);
    clone[index] = res.data;
    setUserFolders([...clone]);
  };
  console.log(Rows);
  useEffect(() => {
    getUsers();
    getData();
  }, []);
  const getData = async () => {
    const response = await axios.get(
      "http://localhost:4000/User/show/Evaluator"
    );
    setRows(response.data);
  };

  const getobjs = async (id) => {
    console.log("id", id);
    const response = await axios.get(
      `http://localhost:4000/EvalFolders/showAllbyid/${id}`
    );
    const col = await Promise.all(
      await response.data.map(async (i) => {
        return {
          Faculty: i.Folder.User,
          Folders: i.Folder,
        };
      })
    );
    const col2 = await Promise.all(
      await col.map(async (i) => {
        const res = await axios.get(
          `http://localhost:4000/UserAssigedFolders/showAllbyid/${i.Faculty._id}`
        );
        return [...res.data];
      })
    );
    console.log("col2", col2);
    setUserFolders([...col2]);
    setobj([...col]);
    setup(true);
    setOpen(true);
  };
  const Submitform = async (e) => {
    e.preventDefault();
    console.log("obj", obj);
    let verify = true;
    obj.forEach((i) => {
      console.log("i", i);
      if (i.Faculty == "" || i.Folders == "") {
        verify = false;
      }
    });
    if (verify) {
      if (!up) {
        await axios.post("http://localhost:4000/EvalFolders/add", {
          obj,
          User,
        });
      } else {
        await axios.post("http://localhost:4000/EvalFolders/add2", {
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
      flex: 1,
    },
    {
      field: "Email",
      headerName: "Email",
      flex: 1,
    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 2,
      editable: false,
      renderCell: ({ row }) => (
        <>
          {row.EvaluateFolders.length < 1 ? (
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
              onClick={async () => {
                setUser(row);
                await getobjs(row._id);
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
        <b>Evaluators</b>
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
          {obj.map((e, index) => {
            return (
              <>
                <h4 className="mb-4">ASSIGN COURSE FOLDER {index + 1}</h4>
                {obj.length > 1 && (
                  <FormControl>
                    <Button
                      className="mb-3"
                      variant="contained"
                      color="primary"
                      size="medium"
                      style={muibtn}
                      onClick={() => {
                        {
                          () => {
                            var clone = [...obj];
                            if (clone.length == index + 1) {
                              console.log("last rm");
                              clone[index] = {
                                Faculty: "",
                                Folders: "",
                              };
                            } else if (clone.length != index + 1) {
                              clone[index] = clone[index + 1];
                            }
                            const a = clone.splice(index, 1);
                            setobj([...clone]);
                            var clone2 = [...UserFolders];
                            if (clone2.length == index + 1) {
                              console.log("last rm");
                              clone2[index] = [];
                            } else if (clone2.length != index + 1) {
                              clone2[index] = clone2[index + 1];
                            }
                            const b = clone2.splice(index, 1);
                            setUserFolders([...clone2]);
                          };
                        }
                      }}
                    >
                      remove
                    </Button>
                  </FormControl>
                )}

                <div className="form-floating ">
                  <select
                    class="form-select mb-4"
                    label="Assign Program"
                    onChange={(e) => {
                      const clone = [...obj];
                      clone[index].Faculty = e.target.value;
                      setobj([...clone]);
                      getUserFolds(index, e.target.value);
                    }}
                  >
                    <option
                      value={obj[index].Faculty._id}
                      selected
                      disabled
                      hidden
                    >
                      {obj[index].Faculty != "" && obj[index].Faculty.Name}
                    </option>
                    {FacUsers.map((p) => {
                      return <option value={p._id}>{p.Name}</option>;
                    })}
                  </select>

                  <FormControl classname="mt-4" fullWidth size="small">
                    <InputLabel id="taskType">Assign Folder</InputLabel>
                    <Select
                      className="mb-4"
                      labelId="taskType"
                      id="taskType"
                      value={obj[index].Folders}
                      label="Assign Course"
                      onChange={(e) => {
                        const clone = [...obj];
                        clone[index].Folders = e.target.value;
                        setobj([...clone]);
                      }}
                      autoWidth
                    >
                      <MenuItem
                        value={obj[index]?.Folders}
                        selected
                        disabled
                        hidden
                      >
                        {obj[index]?.Folders != "" &&
                          obj[index]?.Folders?.Course?.Code +
                            " " +
                            obj[index]?.Folders?.Course.Name +
                            " " +
                            obj[index]?.Folders?.LabTheory ==
                            "Lab" &&
                          "(" + obj[index]?.Folders?.LabTheory + ")"}
                      </MenuItem>
                      {UserFolders.length > 0 &&
                        UserFolders[index].map((a) => {
                          return (
                            <MenuItem value={a}>
                              {a?.Course?.Code} {a?.Course?.Name}{" "}
                              {a?.LabTheory == "Lab" &&
                                "(" + a?.LabTheory + ")"}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
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
                    Faculty: "",
                    Folders: "",
                  },
                ]);
                setUserFolders([...Courses, []]);
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

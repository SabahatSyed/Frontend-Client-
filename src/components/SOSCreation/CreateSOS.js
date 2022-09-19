import React, { useState, useEffect } from "react";
import "../css/styles.css";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Modal,
  Switch,
  TextField,
} from "@mui/material";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

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

export default function CreateSOS() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { Program, Content } = state.row;
  axios.defaults.withCredentials = true;
  const [Rows, setRows] = useState([]);
  const [Year, setYear] = useState(Content.Year);
  //------------------------------------------------

  const [Categories, setCategories] = useState(Content.Categories);
  //{Category:"",Optional:"",Track:"",Courses:[],Note:""}
  //------------------------------------------------
  const [Courses, setCourse] = useState([]);
  const [Category, setCategory] = useState([]);

  const [coursesList, setCoursesList] = useState([]);

  console.log("Course", Courses);

  console.log("CATS", Categories);
  console.log("Content",Content)

  const [AssignCategory, setAssignCategory] = useState([""]);

  const [AssignPrerequisite, setAssignPrerequisite] = useState([]);
  const [opts, setopts] = useState([]);
console.log("Category",Category)
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const settracks = (clone) => {
    var num = 0;

    clone.forEach((e) => {
      console.log("e", e);
      if (e.Track.includes("Track")) {
        num = num + 1;
        e.Track = "Track" + num + " ";
      }
    });
    console.log(clone);
    setCategories([...clone]);
  };
  const getCategory = async () => {
    const res = await axios.get("http://localhost:4000/Category/show");
    const data = await res.data;
    console.log("data",data);
    setCategory([...res.data]);
  };
  const getData = async () => {
    const res = await axios.get("http://localhost:4000/Course/show");
    const data = await res.data;
    setCourse([...data]);
  };
  const AddSOS = async (e) => {
    e.preventDefault();
    console.log("SOS");

    await axios.post("http://localhost:4000/SOSVerison/add", {
      Program,
      Year,
      Categories,
    });
    navigate(
      `/CAC/SOSCreation/${Program}`,
      { state: { row: { Program } } },
      { replace: true }
    );
  };

  useEffect(() => {
    getData();
    getCategory();
  }, []);

  const columns = [
    {
      field: "Code",
      headerName: "Course Code",
      flex: 1,
    },
    {
      field: "Name",
      headerName: "Course Name",
      flex: 1,
    },
    {
      field: "CreditHours",
      headerName: "Credit Hour",
      valueGetter: (params) => {
        return (
          params?.row?.Credit +
          "(" +
          params?.row?.LectureHoursWeek +
          "," +
          params?.row?.LabHoursWeek +
          ")"
        );
      },
      flex: 1,
    },

    {
      field: "Prerequisites",
      headerName: "Pre-requisite(s)",
      flex: 1,

      renderCell: ({ row }) => (
        <>
          <Button
            type="button"
            variant="contained"
            color="primary"
            size="small"
            onClick={() => {
              let num2 = row.Code.split("-")[1].charAt(0);
              let numcode = parseInt(num2);
              const ans = Courses.filter((i) => {
                let num = i.Code.split("-")[1].charAt(0);
                let num1 = parseInt(num);
                if (num1 < numcode) return i;
              });
              setopts([...ans]);
              setAssignPrerequisite([...row.PreRequisites]);
              setOpen(true);
            }}
          >
            Add/Edit
          </Button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box component="form" sx={style}>
              <Autocomplete
                className="mb-4"
                multiple
                id="tags-standard"
                value={AssignPrerequisite}
                options={opts}
                getOptionLabel={(option) => option.Name}
                defaultValue={null}
                onChange={(e, val) => setAssignPrerequisite(val)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Set Prerequisite"
                    placeholder="Set Prerequisite"
                    size="small"
                  />
                )}
              />
              <Button
                fullWidth
                type="button"
                variant="contained"
                color="primary"
                size="medium"
                onClick={() => {
                  row.PreRequisites = AssignPrerequisite;
                  var a1;
                  var a2;

                  Categories.forEach((e) => {
                    let check = false;
                    e.Courses.forEach((i) => {
                      if (i._id == row._id) {
                        check = true;
                        a2 = e.Courses.indexOf(i);
                      }
                    });
                    if (check) {
                      a1 = Categories.indexOf(e);
                    }
                  });
                  var clone = Categories;
                  console.log("a1", a1, "a2", a2);

                  console.log("clone1", clone);
                  console.log(row);
                  clone[a1].Courses[a2].PreRequisites = AssignPrerequisite;
                  console.log("clone12331", clone);
                  setCategories([...clone]);
                  setAssignPrerequisite([]);
                  setOpen(false);
                }}
              >
                Add
              </Button>
            </Box>
          </Modal>
        </>
      ),
    },
  ];

  // const rows = [
  //   {
  //     id: 1,
  //     S: "1",
  //     CourseCode: "CSC-101",
  //     CourseTitle: "Intro to ICT",
  //     CreditHour: "3(2,1)",
  //   },
  // ];

  return (
    <div
      className="container"
      style={{ height: 700, width: "100%", padding: 20 }}
    >
      <h1 className="mb-4 py-3">Create SOS for {Program} </h1>
      <form onSubmit={AddSOS}>
        <FormControl fullWidth size="small">
          <TextField
            className="mb-4"
            id="outlined-basic"
            label="SOS Title"
            variant="outlined"
            size="medium"
            fullWidth
            value={Year}
            onChange={(e) => setYear(e.target.value)}
          />
        </FormControl>
        <div className="row">
          <h4 className="mb-4 mt-2">
            <b>Add Category</b>
          </h4>

          <div className="col">
            <FormControl fullWidth size="small">
              {/* <Autocomplete
            multiple
            id="tags-standard"
            className="mb-4"
            value={AssignCategory}
            options={Category}
            getOptionLabel={(option) => option.CategoryName}
            defaultValue={null}
            onChange={(e, val) => setAssignCategory(val)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Assign Category"
                placeholder="Assign Category"
                size="small"
              />
            )}
          /> */}

              <Select
                className="mb-4"
                labelId="courseAssign"
                id="courseAssign"
                label="ADD Category"
                value={AssignCategory[0]}
                onChange={(e) => {
                  setAssignCategory([e.target.value, ...AssignCategory]);
                }}
                autoWidth
              >
                {Category?.map((a) => {
                  return (
                    <MenuItem value={a.CategoryName}>{a.CategoryName}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="col-2">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="medium"
              onClick={() => {
                const clone = [
                  {
                    Category: AssignCategory[0],
                    Optional: "",
                    Track: "",
                    Courses: [],
                    Note: "",
                  },
                  ...Categories,
                ];
                setCategories([...clone]);
                const cc = Category.filter((i) => {
                  if (i.CategoryName != AssignCategory) {
                    return i;
                  }
                });
                console.log(Categories);
                setCategory(cc);
                setAssignCategory(["", "", ...AssignCategory]);
              }}
            >
              Add Category
            </Button>
          </div>
        </div>
        {Categories?.map((obj, index) => {
          return (
            <div>
              <div className="my-3">
                <h2
                  style={{ textAlign: "left", fontStyle: "Uppercase" }}
                  className="mb-3 "
                >
                  {obj.Category}
                </h2>
                <Button
                  className="mb-4"
                  variant="contained"
                  color="primary"
                  size="medium"
                  onClick={() => {
                    const clone = [...Categories];
                    clone.splice(index, 1);
                    setCategories([...clone]);
                    console.log("index", index);
                    const copy = [...AssignCategory];
                    copy.splice(index, 1);
                    setAssignCategory([...copy]);
                  }}
                >
                  Remove
                </Button>
                {/* {Category:"",Optional:"",Track:"",Courses:[],Note:""} */}

                <FormControl fullWidth size="small">
                  <TextField
                    className="mb-4"
                    id="outlined-basic"
                    label="Add Category Description (optional)"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={Categories[index].Optional}
                    onChange={(e) => {
                      const clone = [...Categories];
                      clone[index].Optional = e.target.value;
                      setCategories([...clone]);
                    }}
                  />
                </FormControl>

                <FormControl className="mb-4">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={
                          Categories[index].Track.includes("Track")
                            ? true
                            : false
                        }
                        onChange={() => {
                          // recheck checked in conditions
                          if (Categories[index].Track == "") {
                            const clone = Categories;
                            clone[index].Track = "Track";
                            settracks(clone);
                          } else if (Categories[index].Track != "") {
                            const clone = Categories;
                            clone[index].Track = "";
                            settracks(clone);
                          }
                        }}
                      />
                    }
                    label="Do this category have tracks"
                    labelPlacement="start"
                  />
                </FormControl>

                {/* {Category:"",Optional:"",Track:"",Courses:[],Note:""} */}

                {Categories[index].Track.includes("Track") ? (
                  <FormControl fullWidth size="small">
                    <h4 className="mb-4 mt-2">
                      <b>
                        {Categories[index].Track.substring(
                          0,
                          Categories[index].Track.indexOf(" ") + 1
                        )}
                      </b>
                    </h4>
                    <TextField
                      className="mb-4"
                      id="outlined-basic"
                      label="Add Track (optional)"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={Categories[index].Track.substring(
                        Categories[index].Track.indexOf(" ") + 1
                      )}
                      onChange={(e) => {
                        const clone = [...Categories];
                        clone[index].Track =
                          Categories[index].Track.substring(
                            0,
                            Categories[index].Track.indexOf(" ") + 1
                          ) + e.target.value;
                        setCategories([...clone]);
                      }}
                    />
                  </FormControl>
                ) : (
                  <p>No tracks</p>
                )}

                <div className="row">
                  <div className="col-12">
                    <Autocomplete
                      style={{ marginBottom: 35 }}
                      multiple
                      variant="outlined"
                      id="tags-standard"
                      value={Categories[index].Courses}
                      options={Courses}
                      size="small"
                      getOptionLabel={(option) => option.Name}
                      defaultValue={null}
                      onChange={(e, val) => {
                        const clone = [...Categories];
                        clone[index].Courses = val;
                        setCategories([...clone]);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Select Courses"
                          placeholder="Select Courses"
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              <div style={{ height: 200, width: "100%" }}>
                <DataGrid
                  rows={Categories[index].Courses}
                  columns={columns}
                  getRowId={(Rows) => Rows._id}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  disableSelectionOnClick
                />
              </div>
              <div className="row mb-4 ">
                <h4 className="mt-4 ">Note</h4>
                <div>
                  <FormControl fullWidth size="small">
                    <TextField
                      className="mb-4"
                      id="outlined-basic"
                      label="Note"
                      variant="outlined"
                      size="medium"
                      fullWidth
                      value={Categories[index].Note}
                      onChange={(e) => {
                        const clone = [...Categories];
                        clone[index].Note = e.target.value;
                        setCategories([...clone]);
                      }}
                    />
                  </FormControl>
                </div>
              </div>

              <div className="row mt-4">
                <h4 className="mb-4">Add Category</h4>

                <div className="col">
                  <FormControl fullWidth size="small">
                    <Select
                      className="mb-4"
                      labelId="courseAssign"
                      id="courseAssign"
                      label="ADD Category"
                      value={AssignCategory[index + 1]}
                      onChange={(e) => {
                        const clone = [...AssignCategory];
                        clone[index + 1] = e.target.value;
                        setAssignCategory([...clone]);
                      }}
                      autoWidth
                    >
                      {Category.map((a) => {
                        return (
                          <MenuItem value={a.CategoryName}>
                            {a.CategoryName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
                <div className="col-2">
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="medium"
                    onClick={() => {
                      const clone = [...Categories];
                      clone.splice(index + 1, 0, {
                        Category: AssignCategory[index + 1],
                        Optional: "",
                        Track: "",
                        Courses: [],
                        Note: "",
                      });
                      setCategories([...clone]);
                      cosnole.log(Categories);
                      const copy = [...AssignCategory];
                      copy[index + 1] = "";
                      copy.splice(index + 2, 0, "");
                      setAssignCategory([...copy]);
                      const cc = Category.filter((i) => {
                        if (i.CategoryName != AssignCategory) {
                          return i;
                        }
                      });
                      setCategory(cc);
                    }}
                  >
                    Add Category
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
        <Button
          fullWidth
          className="my-4 mb-4"
          variant="contained"
          color="primary"
          size="large"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import "../css/styles.css";

import axios from "axios";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import { padding } from "@mui/system";
import { useLocation ,useNavigate} from "react-router-dom";

export default function AddNewCourseDocument() {
  axios.defaults.withCredentials = true;

  const {state} = useLocation();
  const {Code,Content} = state.row;
  const codes = Code.split("-")
  const [PreCode, setPreCode] = useState(codes[0]);
  const [SufCode, setSufCode] = useState(codes[1]);
  const [Name, setName] = useState(state.row.Name);
  const [allCredit, setAllCredit] = useState(state.row.Credit+"("+state.row.LectureHoursWeek+","+state.row.LabHoursWeek+")");
  const [Category, setCategory] = useState(Content.Category);
  const [PreRequisites, setPreRequisites] = useState(Content.PreRequisites);
  const [mainTopic, setmainTopic] = useState("");
  const [catalogue, setCatalogue] = useState(Content.catalogue);
  const [objective, setobjective] = useState("");
  const [objectiveList, setObjectiveList] = useState(Content.objectiveList);
  const [Courses, setCourse] = useState([]);
  const [BookName, setBookName] = useState("");
  const [BookYear, setBookYear] = useState("");
  const [BookWriter, setBookWriter] = useState("");
  const [Books, setBooks] = useState(Content.Books);
  const navigate=useNavigate()
  console.log(Courses)

  const recommended_books = [
    {
      field: "BookName",
      headerName: "Book Names",
      flex: 2,
    },
    {
      field: "BookWriter",
      headerName: "Writers Names",
      flex: 2,
    },
    {
      field: "BookYear",
      headerName: "Year",
      flex: 2,
    },
    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      renderCell: (props) => (
        <Button
          type="button"
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={() => {
            var data = Books.filter((obj) => obj.id !== props.row.id);
            setBooks(data);
          }}
        >
          <AiFillDelete style={{ marginRight: 10 }} />
          Remove
        </Button>
      ),
    },
  ];
  const columns = [
    {
      field: "title",
      headerName: "Title",
      flex: 2,
    },
    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      renderCell: (props) => (
        <Button
          type="button"
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={() => {
            var data = objectiveList.filter((obj) => obj.id !== props.row.id);
            setObjectiveList(data);
          }}
        >
          <AiFillDelete style={{ marginRight: 10 }} />
          Remove
        </Button>
      ),
    },
  ];

  const handleAdd = (e) => {
    e.preventDefault();
    let clone = catalogue.slice(0,-2)
    if(catalogue!=""){
      clone = clone+";"
    }
    setCatalogue(`${clone} ${mainTopic}. `);
    setmainTopic("");
  };
  const handleObjective = (e) => {
    e.preventDefault();
    setObjectiveList([...objectiveList, { id: uuidv4(), title: objective }]);
    setobjective("");
  };
  const handleBook = (e) => {
    e.preventDefault();
    setBooks([...Books, {id: uuidv4(),BookName,BookWriter,BookYear}]);
    setBookName("");
    setBookYear("");
    setBookWriter("");
     };
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const res = await axios.get("http://localhost:4000/Course/show");
    const data = await res.data;
    let num2 = Code.split("-")[1].charAt(0)
    let numcode = parseInt(num2)
    const corsss = data.filter((x)=>{
      let num = x.Code.split("-")[1].charAt(0)
      let num1 = parseInt(num)
      if(num1 <numcode)return(x)

    })
    setCourse([...corsss]);
    
  };
  const AddCourse = async (e) => {
    e.preventDefault();
    const Code = PreCode + "-" + SufCode;
    const LectureHoursWeek = allCredit.slice(2, 3);
    const LabHoursWeek = allCredit.slice(4, 5);
    const Credit = allCredit.slice(0, 1);
    console.log(Code, LectureHoursWeek, LabHoursWeek, Credit, objectiveList);
    console.log("cat: ", Category);
    console.log("catlog: ", catalogue);
    console.log("pre: ", PreRequisites);
    if (
      PreCode != "" &&
      SufCode != "" &&
      Name != "" &&
      allCredit != "" &&
      catalogue != "" &&
      objectiveList != []
    ) {
      await axios.post("http://localhost:4000/CourseVersion/add", {
        Code,
        Name,
        Credit,
        LectureHoursWeek,
        LabHoursWeek,
        catalogue,
        objectiveList,
        Books
      });
      setSufCode("");
      setName("");
      setObjectiveList([]);
      setBooks([])
      navigate(`/CAC/CourseCreation/${Code}` , { state: { row :{Code:state.row.Code,Name:state.row.Name}} }, { replace: true })
      getData();
    } else {
      alert("empty values");
    }
  };
  console.log("allcredit",allCredit)
  return (
    <div className="row" style={{ padding: 30 }}>
      <h3 style={{ textAlign: "center", marginBottom: 30 }}>
        <b>Add New Cource</b>
      </h3>
      <form onSubmit={AddCourse}>
        <div className="row">
          <div className="mb-3 col-4">
            <label for="course-code" className="form-label">
              Course Code
            </label>
            <div className="row">
              <div className="col">
                <select
                  class="form-select"
                  
                >
                  <option value="" selected disabled hidden>
                    {PreCode}
                  </option>
                  {/* <option>MTH</option>
                  <option>CSC</option>
                  <option>HUM</option>
                  <option>PHY</option>
                  <option>EEE</option>
                  <option>DSC</option>
                  <option>CYC</option>
                  <option>AIC</option> */}
                </select>
              </div>
              <div className="col">
                <input
                  maxlength="3"
                  pattern="^[0-9]{3}$"
                  type="text"
                  className="form-control"
                  id="course-code"
                  placeholder="Code"
                  value={SufCode}
                  
                />
              </div>
            </div>
          </div>

          <div className="mb-3 col-6">
            <label for="course-name" className="form-label">
              Course Name
            </label>
            <input
              type="text"
              className="form-control"
              id="course-name"
              value={Name}
              
            />
          </div>

        </div>

        <div className="row">
          <div className="col mb-3">
            <label for="credit-hour" className="form-label">
              Credit Hour
            </label>
            <select
              class="form-select"
              value={allCredit}
             
            >
              <option value={allCredit} selected disabled hidden>
                {allCredit}
              </option>
              </select>
          </div>
        </div>

        <div style={{ marginBottom: 20, marginTop: 50 }}>
          <form>
            <div
              style={{ backgroundColor: "#e8f0f7", padding: 20 }}
              className="row"
            >
              <div className="col-9">
                <input
                  className="form-control"
                  id="maintopic"
                  type="text"
                  placeholder="Add Main Topic"
                  value={mainTopic}
                  onChange={(e) => setmainTopic(e.target.value)}
                ></input>
              </div>
              <div className="col-3 d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  onClick={handleAdd}
                >
                  ADD
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="mb-3">
          <textarea value={catalogue}></textarea>
          <table className="table table-responsive ">
            <thead>
              <tr className="cdf">
                <th>Catalogue Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="cd">
                <td>{catalogue}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <div style={{ marginBottom: 20, marginTop: 50 }}>
            <form>
              <div
                style={{ backgroundColor: "#e8f0f7", padding: 20 }}
                className="row"
              >
                <div className="col-9">
                  <input
                    className="form-control"
                    id="objective"
                    type="text"
                    placeholder="Objective"
                    value={objective}
                    onChange={(e) => setobjective(e.target.value)}
                  ></input>
                </div>
                <div className="col-3 d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={handleObjective}
                  >
                    ADD
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div style={{ height: 200, width: "100%" }}>
            <DataGrid
              rows={objectiveList}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
            />
          </div>
        </div>
        <div>
          <div style={{ marginBottom: 20, marginTop: 50 }}>
            <form>
              <div
                style={{ backgroundColor: "#e8f0f7", padding: 20 }}
                className="row"
              >
                <div className="col">
                  <input
                    className="form-control"
                    id="objective"
                    type="text"
                    placeholder="Book Names"
                    value={BookName}
                    onChange={e=>setBookName(e.target.value)}
                  ></input>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    id="writers"
                    type="text"
                    placeholder="Writers"
                    value={BookWriter}
                    onChange={e=>setBookWriter(e.target.value)}
                  ></input>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    id="year"
                    type="number"
                    placeholder="Year"
                    value={BookYear}
                    onChange={e=>setBookYear(e.target.value)}
                  ></input>
                </div>
                <div className="col-3 d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={handleBook}
                  >
                    ADD
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div style={{ height: 200, width: "100%" }}>
            <DataGrid
              rows={Books}
              columns={recommended_books}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
            />
          </div>
        </div>

        <input
          type="submit"
          name="submit"
          value="Submit"
          className="button btn btn-primary ms-auto me-0 me-md-3 my-2 my-md-0"
        />
      </form>
    </div>
  );
}

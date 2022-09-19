import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormControlLabel,
  Modal,
  Switch,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios"
import React, { useState,useEffect } from "react";
import "../css/styles.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function CreateSyllabus() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [unit, setunit] = useState([]);
  const [topicsCovered, setTopicsCovered] = useState("");
  const [bookName, setBookName] = useState("");
  
  const [refmat, setrefmat] = useState(false);
  
  const [chapter, setChapter] = useState("");
  const [Bookfinal, setBookfinal] = useState("");
  const [CDFtops,setCDFtops] = useState([]);
  const { state } = useLocation();
  console.log(state);
  const { row } = state
  const [Rows, setRows] = useState([...row.Content]);

  const Add = () =>{
    var Lec = Rows.length+1
    var b =""
    if(refmat==true){
      b = Bookfinal +"-Ref. Material"
      setrefmat(false)
    }
    setRows([...Rows,{lecture:Lec,CDFUnit:unit,topics:topicsCovered,material:b}])
    setunit([]);
    setTopicsCovered("");
    setBookName("");
    setChapter("");
    setBookfinal("");
    
  
  }
  useEffect(()=>{
    getstuff()
  },[])
  const getstuff = async()=>{
    const res = await axios.get(`http://localhost:4000/CDF/shower/${row.Code}`)
    var largest=0
    console.log("Topics",res.data)
    res.data.Topics.forEach((i)=>{
      if(i.Unit.length==1){
        if(parseInt(i.Unit)>largest){
          largest=parseInt(i.Unit)}
      }
      else if(i.Unit.length>1){
        if(parseInt(i.Unit.substring(2))>largest){
          largest=parseInt(i.Unit)}

      }console.log("lar",largest)
    })
    var abc= []
    for(var i=1 ; i<largest+1;i++){
      var a = i+""
      abc.push(a)
    }
    console.log("abc",abc)
    setCDFtops([...abc])
  }
  
  const columns = [
    {
      field: "lecture",
      headerName: "Lecture#",
      width: "100",
    },
    {
      field: "CDFUnit",
      headerName: "CDF Unit#",
      width: "100",
    },
    {
      field: "topics",
      headerName: "Topics Covered",
      width: "400",
    },
    {
      field: "material",
      headerName: "Reference Material",
      width: "150",
    },

    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({row}) => {
        return (
          <>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="medium"
              onClick={()=>{
                var Lec = Rows.length+1
                const clone = Rows.filter((obj) => {
                  if (row != obj) return obj;
                });
                var count = 0
                clone.forEach((i) => {
                  count = count + 1;
                  i.lecture = count;
                });
                setRows([...clone])
              }}
            >
              Remove
            </Button>
          </>
        );
      },
    },
  ];

  const  onSubmit = async(e)=>{
     e.preventDefault();
     await axios.post("http://localhost:4000/SyllabusVerison/add", {
      Code:row.Code,
      Plan:Rows
    });
    navigate(
      `/CAC/SyllabusCreation/${row.Code}`,
      { state: { row } },
      { replace: true }
    );
  }
  return (
    <div style={{ width: "100%", padding: 50 }}>
      <h1 className="mb-4">Create Syllabus</h1>
      <form onSubmit={onSubmit}>

      <div
        className="card"
        style={{
          backgroundColor: "#f5f5f5",
          marginTop: 25,
          borderRadius: 15,
          padding: 25,
        }}
      >

        <FormControl fullWidth size="small">
          <InputLabel id="demo-simple-select-label">Select CDF Unit</InputLabel>
          <Select
            className="mb-4"
            id="outlined-basic"
            label="Select CDF Unit"
            variant="outlined"
            size="small"
            fullWidth
            value={unit}
            onChange={(e) => {
              setunit(e.target.value);
            }}
          >{CDFtops.map((i)=>{return(
            <MenuItem value={i}>{i}</MenuItem>)})}
          </Select>
        </FormControl>
        <FormControl fullWidth size="large">
          <TextField
            className="mb-4"
            id="outlined-basic"
            label="Add Topics Covered"
            variant="outlined"
            size="large"
            fullWidth
            value={topicsCovered}
            onChange={(e) => {
              setTopicsCovered(e.target.value);
            }}
          />
        </FormControl>
        <div className="row">
          <div className="col">
            <FormControl fullWidth size="small">
              <TextField
                className="mb-4"
                id="outlined-basic"
                label="Add Book Name"
                variant="outlined"
                size="small"
                fullWidth
                value={bookName}
                onChange={(e) => {
                  setBookName(e.target.value);
                }}
              />
            </FormControl>
          </div>
          <div className="col">
            <FormControl fullWidth size="small">
              <TextField
                className="mb-4"
                id="outlined-basic"
                label="Add Chapter"
                variant="outlined"
                size="small"
                fullWidth
                value={chapter}
                onChange={(e) => {
                  setChapter(e.target.value);
                }}
              />
            </FormControl>
          </div>
          
          
          
          
          <div className="col-2">
          
          <FormControl className="mb-4">
            <FormControlLabel
              control={
                <Switch
                  checked={
                    refmat
                  }
                  onChange={() => {
                    setrefmat(!refmat)
                  }}
                />
              }
              label="ref material"
              labelPlacement="start"
            />
          </FormControl>          
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="medium"
              onClick={()=>{
                if(Bookfinal==""){
                  setBookfinal(bookName+": "+chapter)
                  setBookName("");
                  setChapter("");  
                }
                else{
                  setBookfinal(Bookfinal+"-"+bookName+": "+chapter)
                  setBookName("");
                  setChapter("");
                }
              }}
            >
              Add
            </Button>
          </div>
        </div>
        <FormControl fullWidth size="small">
          <TextField
            id="outlined-basic"
            label="Books"
            variant="outlined"
            size="small"
            fullWidth
            value={Bookfinal}
            onChange={(e) => {
              setBookfinal(e.target.value);
            }}
          />
        </FormControl>
        <Button
          className="mt-3"
          fullWidth
          variant="contained"
          color="primary"
          size="medium"
          onClick={()=>{Add()}}
        >
          Add
        </Button>
      </div>
      <div
        style={{
          backgroundColor: "#000",
          color: "#fff",
          padding: 2,
          marginBottom: 15,
          marginTop: 50,
        }}
      >
        <h5>Week wise Plan:</h5>
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={Rows}
          columns={columns}
          getRowId={(Rows) => Rows.lecture}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div> 

      <Button
          fullWidth
          className="my-4 mb-4"
          variant="contained"
          color="primary"
          size="medium"
          type="submit"
        > 
          Submit
        </Button>
      
      </form>
     </div>
      
    
  );
}

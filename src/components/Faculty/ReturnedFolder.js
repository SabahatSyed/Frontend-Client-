import React, { useState, useEffect } from "react";
import "../css/styles.css";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { muiAbtn } from "../style";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const columns = [
  {
    field: "Program",
    headerName: "Program",
    flex: 1,
  },
  {
    field: "Course",
    headerName: "Course",
    flex: 1,
  },
  {
    field: "Evaluator",
    headerName: "Evaluator",
    flex: 1,
  },

  {
    field: "actions",
    headerName: "Actions",
    flex: 1,
    editable: false,
    renderCell: HandleButton
  },
];
function HandleButton(row){
  const navigate=useNavigate()
  const senddata=(roww)=>{
    console.log("helllo",roww)
    navigate('/Faculty/Returned',{state:roww.row})
  }
  return(
    <>
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={muiAbtn}
        onClick={()=>{
          senddata(row)
          //navigate('/Faculty/Returned',{state:{row:row}})
        }}
      >
        View Evaluated Folder
      </Button>
    </>

  )
}
export default function ReturnedFolders() {
  const [Rows, setRows] = useState([]);
  const navigate=useNavigate()
  const [Posts, setPosts] = useState([]);
  const userid= JSON.parse(localStorage.getItem('user'))
  React.useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const res = await axios.get(`http://localhost:4000/EvalFolders/showfolder`);
    setPosts(res.data);
    var row=[];
    var index=0
   res.data.map((val, id) => {
        if(val.Evaluated==true && val.User._id==userid){
        row[id]={_id:val._id,id: id, Program: val.Program, Course: val.Course.Name+"-"+val.LabTheory, Evaluator:val.Evaluator.Name,data:val}
        }
      })
  setRows(row);
  };
  
  return (
    <div
      className="container"
      style={{ height: 700, width: "100%", padding: 20 }}
    >
      <h1 className="py-4">
        <b>RETURNED FOLDERS</b>
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
    </div>
  );
}

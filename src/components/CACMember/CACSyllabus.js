import React, { useState, useEffect } from "react";
import "../css/styles.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { AiOutlineCheckSquare, AiFillEdit } from "react-icons/ai";


export default function CacSyllabus() {
  const [Rows, setRows] = useState([]);
  useEffect(() => {
    getRepoCourse();
  }, []);
  const getRepoCourse = async () => {
    const response = await axios.get(
      "http://localhost:4000/SyllabusCreate/get",{withCredentials:true}
    );
    console.log(response.data);
    setRows(response.data);
  };

  const columns = [
    {
      field: "Code",
      headerName: "Code",
      flex: 1,
    },

    {
      field: "Name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "Action",
      headerName: "Action",
      flex: 2,
      editable: false,
      renderCell: ActionButtons,
    },
  ];

  function ActionButtons(props) {
    const navigate = useNavigate();
    const { row } = props;
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={() => {
            navigate(
              `/CAC/SyllabusCreation/${row.Code}`,
              { state: { row } },
              { replace: true }
            );
          }}
        >
          <AiFillEdit style={{ marginRight: 10 }} />
          Add Syllabus
        </Button>
  
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={async() => {
             await axios.post(
              `http://localhost:4000/SyllabusCreate/Submit/${row.Code}`,{withCredentials:true}
            );
            getRepoCourse(); 
          }}
        >
          <AiFillEdit style={{ marginRight: 10 }} />
          Submit
        </Button>
      </div>
    );
  }
  


  return (
    <div className="container" style={{ width: "100%", padding: 20 }}>
      <h1 className="py-4">
        <b>Syllabus Assigned</b>
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

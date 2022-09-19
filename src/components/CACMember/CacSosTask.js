import React, { useState, useEffect } from "react";
import "../css/styles.css";
import axios from "axios";

import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";

import { useNavigate } from "react-router-dom";
import { AiOutlineCheckSquare, AiFillEdit } from "react-icons/ai";

export default function CacSosTask() {
  const [RepoProgram, setRepoProgram] = useState([]);

  useEffect(() => {
    getRepoProgram();
  }, []);
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
              `/CAC/SOSCreation/${row.Program}`,
              { state: { row } },
              { replace: true }
            );
          }}
        >
          <AiFillEdit style={{ marginRight: 10 }} />
          Create/Edit SOS
        </Button>
  
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={async () => {
            await axios.post(
              `http://localhost:4000/SOSCreate/Submit/${row.Program}`, {
                withCredentials: true,
              })
              getRepoProgram()
            }
        }
        >
          <AiFillEdit style={{ marginRight: 10 }} />
          Submit
        </Button>
      </div>
    );
  }
  
  const getRepoProgram = async () => {
    const response = await axios.get("http://localhost:4000/SOSCreate/get", {
      withCredentials: true,
    });
    setRepoProgram(response.data);
  };
  console.log(RepoProgram);
  const columns = [
    {
      field: "Program",
      headerName: "Program",
      flex: 2,
    },

    {
      field: "Action",
      headerName: "Action",
      flex: 2,
      editable: false,
      renderCell: ActionButtons,
    },
  ];
  return (
    <div className="container" style={{ width: "100%", padding: 20 }}>
      <h1 className="py-4">
        <b>SOS Assigned</b>
      </h1>
      <div>
        <DataGrid
          style={{ height: 400, width: "100%" }}
          columns={columns}
          getRowId={(RepoProgram) => RepoProgram._id}
          rows={RepoProgram}
          pageSize={10}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import "../css/styles.css";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

export default function AllAssignedCourses() {
  const [Rows, setRows] = useState([]);
  const columns = [
    {
      field: "DegreeProgram",
      headerName: "Degree Program",
      flex: 1,
    },
    {
      field: "CourseName",
      headerName: "Course Name",
      flex: 2,
    },
    {
      field: "Section",
      headerName: "Section",
      flex: 1,
    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      editable: false,
      renderCell: () => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
            // onClick={() => setOpen(true)}
          >
            <AiFillEdit style={{ marginRight: 10 }} />
            Create Folder
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
          >
            <AiFillEdit style={{ marginRight: 10 }} />
            Edit
          </Button>
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
        <b>Create Course Folder</b>
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

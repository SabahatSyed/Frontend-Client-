import React, { useState, useEffect } from "react";
import "./css/styles.css";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { muiAbtn, muibtn } from "./style";

export default function AllCourseFolder() {
  const [Rows, setRows] = useState([]);

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
      field: "Faculty",
      headerName: "Faculty",
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
      renderCell: () => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={muiAbtn}
            //   onClick={}
          >
            <AiFillEdit style={{ marginRight: 10 }} />
            View Folder
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
        <b>ALL COURSE FOLDERS</b>
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

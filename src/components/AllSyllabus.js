import React, { useState, useEffect } from "react";
import "./css/styles.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Popup from "./AuxillaryComponents/PopupFunction";
import axios from "axios";
import Button from "@mui/material/Button";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import { muiAbtn } from "./style";

export default function AllSyllabus() {
  const [Syllabus, setSyllabus] = useState([]);
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  useEffect(() => {
    getSyllabus();
  }, []);

  const getSyllabus = async () => {
    try {
      const response = await axios.get("http://localhost:4000/Syllabus/show");
      setSyllabus(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4000/Syllabus/${id}`);
    getSyllabus();
    handleCloseDialog();
  };

  const columns = [
    {
      field: "Code",
      headerName: "Code",
      flex: 1,
    },
    {
      field: "Name",
      headerName: "Course Title",
      flex: 1,
    },
    {
      field: "Program",
      headerName: "Program",
      flex: 1,
    },
    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      editable: false,
      renderCell: ActionButton,
    },
  ];
  function ActionButton({ row }) {
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={muiAbtn}
          onClick={() => {
            navigate(
              `/Admin/SyllabusView/${row.Program}/${row.Code}/${row._id}`,
              {
                replace: true,
              }
            );
          }}
        >
          <AiFillEye style={{ marginRight: 10 }} />
          View
        </Button>

        <Button
          variant="contained"
          color="primary"
          size="small"
          style={muiAbtn}
          onClick={handleClickOpen}
        >
          <AiFillDelete style={{ marginRight: 10 }} />
          Delete
        </Button>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure to delete the syllabus?"}
          </DialogTitle>

          <DialogActions>
            <Button onClick={() => handleDelete(row._id)}>Yes</Button>
            <Button onClick={handleCloseDialog} autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }

  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: 700,
        width: "100%",
        padding: 20,
      }}
    >
      <h1 className="py-4">All Syllabus</h1>
      <DataGrid
        style={{ height: 500, width: "100%" }}
        columns={columns}
        rows={Syllabus}
        getRowId={(Rows) => Rows._id}
        pageSize={10}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </div>
  );
}

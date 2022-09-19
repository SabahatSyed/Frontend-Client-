import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import {
  AiFillEye,
  AiFillEdit,
  AiFillDelete,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { Box, Card, Modal } from "@mui/material";

const columns = [
  {
    field: "cacMember",
    headerName: "CAC Member",
    flex: 1,
  },
  {
    field: "mon",
    headerName: "Monday",
    flex: 1,
  },
  {
    field: "tue",
    headerName: "Tuesday",
    flex: 1,
  },
  {
    field: "wed",
    headerName: "Wednesday",
    flex: 1,
  },
  {
    field: "thur",
    headerName: "Thusday",
    flex: 1,
  },
  {
    field: "fri",
    headerName: "Friday",
    flex: 1,
  },
  {
    field: "sat",
    headerName: "Saturday",
    flex: 1,
  },
];

export default function ViewCacAvailability() {
  const [availabilityData, setAvailabilityData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAll = async () => {
      var res = await axios.get(
        `http://localhost:4000/Meeting/get-all-availability`
      );

      var abc = res.data.map(function (item) {
        return {
          cacMember: item.teacher_id.Name,

          mon: item.time.mon,
          tue: item.time.tue,
          wed: item.time.wed,
          thur: item.time.thur,
          fri: item.time.fri,
          sat: item.time.sat,
          id: item._id,
        };
      });

      setAvailabilityData(abc);
      console.log(res.data);

      setLoading(false);
    };

    getAll();
  }, []);

  const [rows, setRows] = React.useState([]);
  return (
    <div
      className="container"
      style={{ height: 700, width: "100%", padding: 20 }}
    >
      <h1 className="py-4">
        <b>CAC Members Availabilties</b>
      </h1>
      <div>
        <div className="d-flex justify-content-end mb-4">
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginTop: 16 }}
            //   onClick={handleOpen}
          >
            <AiOutlineClockCircle style={{ marginRight: 10 }} />
            Send Time Change Notification
          </Button>
        </div>

        {
          <DataGrid
            style={{ height: 300, width: "100%" }}
            columns={columns}
            rows={availabilityData}
            pageSize={10}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
          />
        }
        <h3>
          <b>Ideal Time: </b>
        </h3>
      </div>
    </div>
  );
}

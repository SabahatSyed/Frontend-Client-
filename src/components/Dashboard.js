import { Button, Card } from "@mui/material";
import React from "react";
import "./css/styles.css";

export default function Dashboard() {
  return (
    <div
      style={{
        width: "100%",
        padding: 30,
        backgroundColor: "#f5f5f5",
      }}
    >
      <h1 className="pb-4 my-2">
        <b>DASHBOARD</b>
      </h1>

      <div>
        <Card style={{ padding: 25 }}>
          <h4 style={{ fontSize: "18px" }} className="mb-4">
            Upcoming Meetings
          </h4>
          <div className="table-responsive my-4">
            <table
              className="table table-hover"
              style={{ textAlign: "center" }}
            >
              <thead style={{ backgroundColor: "#00447f", color: "#fff" }}>
                <th className="col-4">Meeting Subject</th>
                <th className="col-3">Date</th>
                <th className="col-4">Members</th>
              </thead>
              <tbody style={{ backgroundColor: "#f5f5f5" }}>
                <tr>
                  <td>Create SOS for Computer Science</td>
                  <td>31-08-2022</td>
                  <td>Tanveer Ahmed, Rizwan Rashid</td>
                </tr>
                <tr>
                  <td>Create SOS for Computer Science</td>
                  <td>31-08-2022</td>
                  <td>Tanveer Ahmed, Rizwan Rashid</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="row" style={{ marginTop: 30 }}>
        <div className="col">
          <Card style={{ padding: 25 }}>
            <h4 style={{ fontSize: "18px" }} className="mb-4">
              Task Assigned
            </h4>
            <div className="table-responsive my-4">
              <table
                className="table table-hover"
                style={{ textAlign: "center" }}
              >
                <thead style={{ backgroundColor: "#00447f", color: "#fff" }}>
                  <th className="col-4">Task Type</th>
                  <th className="col-3">Date</th>
                  <th className="col-4">Members</th>
                </thead>
                <tbody style={{ backgroundColor: "#f5f5f5" }}>
                  <tr>
                    <td>Create CDF</td>
                    <td>31-08-2022</td>
                    <td>Tanveer Ahmed, Rizwan Rashid</td>
                  </tr>
                  <tr>
                    <td>Create CDF</td>
                    <td>31-08-2022</td>
                    <td>Tanveer Ahmed, Rizwan Rashid</td>
                  </tr>
                </tbody>
              </table>
              <Button
                variant="contained"
                color="primary"
                size="small"

                // onClick={handleOpen1}
              >
                View All
              </Button>
            </div>
          </Card>
        </div>
        <div className="col">
          <Card style={{ padding: 25 }}>
            <h4 style={{ fontSize: "18px" }} className="mb-4">
              Returned Tasks
            </h4>
            <div className="table-responsive my-4">
              <table
                className="table table-hover"
                style={{ textAlign: "center" }}
              >
                <thead style={{ backgroundColor: "#00447f", color: "#fff" }}>
                  <th className="col-4">Task Type</th>
                  <th className="col-3">Date</th>
                  <th className="col-4">Members</th>
                </thead>
                <tbody style={{ backgroundColor: "#f5f5f5" }}>
                  <tr>
                    <td>Create CDF</td>
                    <td>31-08-2022</td>
                    <td>Tanveer Ahmed, Rizwan Rashid</td>
                  </tr>
                  <tr>
                    <td>Create CDF</td>
                    <td>31-08-2022</td>
                    <td>Tanveer Ahmed, Rizwan Rashid</td>
                  </tr>
                </tbody>
              </table>
              <Button
                variant="contained"
                color="primary"
                size="small"

                // onClick={handleOpen1}
              >
                View All
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

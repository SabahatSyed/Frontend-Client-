import React, { useState, useEffect } from "react";
import "../css/styles.css";
import logo from "./comsats_logo.png";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Card } from "@mui/material";

export default function FacultyDashboard() {
  const [Rows, setRows] = useState([]);
  const columns = [
    {
      field: "quiz1",
      headerName: "Quiz 1",
      flex: 1,
    },
    {
      field: "quiz2",
      headerName: "Quiz 2",
      flex: 1,
    },
    {
      field: "quiz3",
      headerName: "Quiz 3",
      flex: 1,
    },
    {
      field: "quiz4",
      headerName: "Quiz 4",
      flex: 1,
    },
    {
      field: "midterm",
      headerName: "Mid Term",
      flex: 1,
    },
    {
      field: "terminal",
      headerName: "Terminal",
      flex: 1,
    },
  ];
  return (
    <div style={{ height: 760, width: "100%", padding: 30 }}>
      <div className="row mt-4 mb-4">
        <div className="row mb-4 py-4">
          <div className="col">
            <Card
              style={{
                backgroundColor: "#1565C0",
                color: "#fff",
                padding: 25,
                borderRadius: "10px",
              }}
            >
              <p style={{ textAlign: "center", fontSize: "13px" }}>
                BS COMPUTER SCIENCE
              </p>
              <h3>INTRODUCTION TO ICT</h3>
            </Card>
          </div>
          <div className="col">
            <Card
              style={{
                backgroundColor: "#1565C0",
                color: "#fff",
                padding: 25,
                borderRadius: "10px",
              }}
            >
              <p style={{ textAlign: "center", fontSize: "13px" }}>
                BS COMPUTER SCIENCE
              </p>
              <h3>INTRODUCTION TO ICT</h3>
            </Card>
          </div>
          <div className="col">
            <Card
              style={{
                backgroundColor: "#1565C0",
                color: "#fff",
                padding: 25,
                borderRadius: "10px",
              }}
            >
              <p style={{ textAlign: "center", fontSize: "13px" }}>
                BS COMPUTER SCIENCE
              </p>
              <h3>INTRODUCTION TO ICT</h3>
            </Card>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 30 }}>
        <div>
          <Card style={{ padding: 25, marginBottom: 25 }}>
            <h4 style={{ fontSize: "18px" }} className="mb-4">
              CDF of Courses
            </h4>
            <div className="table-responsive my-4">
              <table
                className="table table-hover"
                style={{ textAlign: "center" }}
              >
                <thead style={{ backgroundColor: "#1565C0", color: "#fff" }}>
                  <th className="col-4">Program</th>
                  <th className="col-3">Course</th>
                  <th className="col-4">Action</th>
                </thead>
                <tbody style={{ backgroundColor: "#f5f5f5" }}>
                  <tr>
                    <td>BS Computer Science</td>
                    <td>Introduction to ICT</td>
                    <td>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"

                        // onClick={handleOpen1}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
        <div>
          <Card style={{ padding: 25 }}>
            <h4 style={{ fontSize: "18px" }} className="mb-4">
              Syllabus of Courses
            </h4>
            <div className="table-responsive my-4">
              <table
                className="table table-hover"
                style={{ textAlign: "center" }}
              >
                <thead style={{ backgroundColor: "#1565C0", color: "#fff" }}>
                  <th className="col-4">Program</th>
                  <th className="col-3">Course</th>
                  <th className="col-4">Action</th>
                </thead>
                <tbody style={{ backgroundColor: "#f5f5f5" }}>
                  <tr>
                    <td>BS Computer Science</td>
                    <td>Introduction to ICT</td>
                    <td>
                      {" "}
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"

                        // onClick={handleOpen1}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

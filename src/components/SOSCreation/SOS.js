import { TableRow } from "@mui/material";
import Button from "@mui/material/Button";
import {
  AiFillPrinter,
  AiFillEdit,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import axios from "axios";
import Popup from "./Popup";
import React, { useEffect, useState, useRef } from "react";
import "./pdfstyles.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

export default function SOS() {
  axios.defaults.withCredentials = true;

  const { state } = useLocation();
  console.log(state);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const { Program } = state.row;
  console.log("Program", Program);
  const [Version, setVersion] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [res, setresponse] = useState(false);
  //{Category:"",Optional:"",Track:"",Courses:[],Note:""}
  const [Content, setContent] = useState({
    Program: "",
    Year: "",
    Categories: [
      { Category: "", Optional: "", Track: "", Courses: [], Note: "" },
    ],
  });
  console.log(Version);
  const navigate = useNavigate();
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const handleCloseX = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    getData();
    getContent();
  }, []);

  const getData = async () => {
    console.log(Program);
    const response = await axios.get(
      `http://localhost:4000/SOSVerison/all/${Program}`
    );
    setVersion(response.data);
    if (response.data.length > 0) {
      setresponse(true);
      getContent();
    }
  };
  const getContent = async () => {
    const response = await axios.get(
      `http://localhost:4000/SOSVerison/Latest/${Program}`
    );
    if (response.data != undefined) {
      setContent(response.data);
    } else {
      setContent({
        Program: "",
        Year: "",
        Categories: [],
      });
    }
  };
  const Edit = () => {
    console.log("Content", Content);
    state.row.Content = Content;
    console.log("state.row.Content", state.row.Content);
    navigate(`/CAC/CreateSOS/${Program}/1`, { state: { row: state.row } });
  };
  const getCon = async (id) => {
    const response = await axios.get(`http://localhost:4000/SOSVerison/${id}`);
    setContent(response.data);
  };
  console.log("content", Content);
  return (
    <div style={{ height: 700, padding: 30, width: "100%" }}>
      <div className="d-flex justify-content-end mb-4">
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={togglePopup}
        >
          <AiOutlineUnorderedList style={{ marginRight: 10 }} />
          Versions
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={Edit}
        >
          <AiFillEdit style={{ marginRight: 10 }} />
          Edit
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={handlePrint}
        >
          <AiFillPrinter style={{ marginRight: 10 }} />
          Print
        </Button>
      </div>

      {isOpen && (
        <Popup
          content={
            <>
              <h4 style={{ textAlign: "center", marginBottom: 30 }}>
                Versions
              </h4>
              <table class="table" id="list">
                <thead>
                  <tr>
                    <th scope="col">Version</th>
                  </tr>
                </thead>
                <tbody>
                  {Version.map((Repo, index) => {
                    return (
                      <tr scope="row" key={Repo._id}>
                        <td
                          style={{ cursor: "pointer" }}
                          onClick={() => getCon(Repo._id)}
                        >
                          Version: {index + 1}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          }
          handleClose={handleCloseX}
        />
      )}
      {!res ? (
        <h3>Empty Repository</h3>
      ) : (
        <div ref={componentRef} className="main">
          <div>
            {Content.Categories.map((x) => {
              return (
                <>
                  <h5>{x.Category}</h5>
                  <table className="table table-bordered">
                    <thead style={{ textAlign: "center" }}>
                      <tr>
                        <th className="col-1">S. No</th>
                        <th className="col-2">Course Code</th>
                        <th className="col-5">Course Title</th>
                        <th className="col-2">Credit Hours</th>
                        <th className="col-2">Pre-requisite (s)</th>
                      </tr>
                    </thead>
                    <tbody style={{ textAlign: "center" }}>
                      {x.Courses.map((i, index) => {
                        return (
                          <tr>
                            <td className="col-1">{index + 1}</td>
                            <td className="col-2">{i.Code}</td>
                            <td className="col-5">{i.Name}</td>
                            <td className="col-2">
                              {i.Credit +
                                "(" +
                                i.LectureHoursWeek +
                                "," +
                                i.LabHoursWeek +
                                ")"}
                            </td>
                            <td className="col-2">
                              {" "}
                              {i.PreRequisites.map((z) => z.Name)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div>
                    <p>{x.Note}</p>
                  </div>
                </>
              );
            })}

            {Content.Categories.map((x) => {
              // {Category:"",Optional:"",Track:"",Courses:[],Note:""}

              return (
                <div>
                  <div>
                    <h5>{x.Category}</h5>

                    <div style={{ paddingBottom: 20 }} className="row">
                      {x.Courses.map((i, index) => {
                        return (
                          <>
                            <div className="col">
                              <h6>
                                <b>Course Code: </b> {i.Code}
                              </h6>
                            </div>
                            <div className="col">
                              <h6 style={{ textAlign: "right" }}>
                                <b>Pre-Requisite: </b>
                                {i.PreRequisites.map((z) => z.Name)}
                              </h6>
                            </div>
                            <h6 style={{ paddingBottom: 20 }}>
                              <b>Course Title: </b> {i.Name}
                            </h6>
                            <h6 style={{ paddingBottom: 35 }}>
                              <b>Credit Hour: </b>
                              {i.Credit +
                                "(" +
                                i.LectureHoursWeek +
                                "," +
                                i.LabHoursWeek +
                                ")"}
                            </h6>

                            <div style={{ paddingBottom: 15 }}>
                              <h5>Course Objectives: </h5>
                              <ul>
                                {i.objectiveList.map((z) => {
                                  return <li>{z.title}</li>;
                                })}
                              </ul>
                            </div>
                            <div style={{ paddingBottom: 15 }}>
                              <h5>Course Contents: </h5>
                              <p>{i.catalogue}</p>
                            </div>
                            <div style={{ paddingBottom: 15 }}>
                              <h5>Recommended Books: </h5>
                              <ol>
                                {i.Books.map((z) => {
                                  return (
                                    <li>
                                      {z.BookName}
                                      {z.BookWriter}
                                      {z.BookYear}
                                    </li>
                                  );
                                })}
                              </ol>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

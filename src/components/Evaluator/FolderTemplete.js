import {
  Button,
  Card,
  CardMedia,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function FolderTemplete() {
  const [open, setOpen] = React.useState(true);
  axios.defaults.withCredentials = true;
  const { id } = useParams();
  useEffect(() => {
    getFolderData();
  }, []);
  const [Folder, setFolder] = useState({ files: [], ICEF: null, Obe: null, LectureDeliveryRecord: null });

  console.log("Folder: ", Folder);
  const getFolderData = async () => {
    const res = await axios.get(
      `http://localhost:4000/EvalFolders/showComp/${id}`
    );
    console.log(res.data);
    setFolder(res.data);
  };
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div
      className="container-fluid"
      style={{
        height: 700,
        width: "100%",

        overflow: "hidden",
      }}
    >
      <div style={{ padding: 30, overflowY: "scroll", maxHeight: "80vh" }}>
        <div>
          <h1
            style={{
              backgroundColor: "#2ac0dc",
              paddingTop: "30%",
              paddingBottom: "30%",
            }}
          >
            Lecture Delivery Record
          </h1>
          {/* {Folder.LectureDeliveryRecord==null?(<p>No Lecture Delivery Record</p>):<div style={{ marginTop: 50 }}>
          <Card sx={{ maxWidth: "100%", marginTop: 0 }}>
                    <h2
                      className="my-4 py-4"
                      style={{ textTransform: "uppercase" }}
                    >
                      LectureDeliveryRecord
                    </h2>
                    <CardMedia
                      className="cardmedia"
                      component="iframe"
                      Height="1056px"
                      src={Folder.LectureDeliveryRecord.Base64.pdf}
                    />
                  </Card>
          </div>} */}
        </div>
        {Folder.files.length > 0 &&
          Folder.files.map((i) => {
            if(i.Title.includes("Quiz")){
            return (
              
              <div>
                <div style={{ marginTop: 50 }}>
                  <h1
                    className="mb-4 pb-4"
                    style={{
                      padding: 10,
                      backgroundColor: "#4b2980",
                      color: "#fff",
                      textTransform: "uppercase",
                    }}
                  >
                    {i.Title}
                  </h1>
                  <Card sx={{ maxWidth: "100%", marginTop: 0 }}>
                    <h2
                      className="my-4 py-4"
                      style={{ textTransform: "uppercase" }}
                    >
                      {i.Title} Question Paper
                    </h2>
                    <CardMedia
                      className="cardmedia"
                      component="iframe"
                      Height="1056px"
                      src={i.Question.Base64.pdf}
                    />
                  </Card>
                  <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
                    <h2
                      className="my-4 py-4"
                      style={{ textTransform: "uppercase" }}
                    >
                      {i.Title} Solution
                    </h2>
                    <CardMedia
                      className="cardmedia"
                      component="iframe"
                      Height="1056px"
                      src={i.Solution.Base64.pdf}
                    />
                  </Card>
                  <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
                    <h2
                      className="my-4 py-4"
                      style={{ textTransform: "uppercase" }}
                    >
                      {i.Title} (Best)
                    </h2>
                    <CardMedia
                      className="cardmedia"
                      component="iframe"
                      Height="1056px"
                      src={i.Best.Base64.pdf}
                    />
                  </Card>
                  <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
                    <h2
                      className="my-4 py-4"
                      style={{ textTransform: "uppercase" }}
                    >
                      {i.Title} (Average)
                    </h2>
                    <CardMedia
                      className="cardmedia"
                      component="iframe"
                      Height="1056px"
                      src={i.Average.Base64.pdf}
                    />
                  </Card>
                  <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
                    <h2
                      className="my-4 py-4"
                      style={{ textTransform: "uppercase" }}
                    >
                      {i.Title} (Worst)
                    </h2>
                    <CardMedia
                      className="cardmedia"
                      component="iframe"
                      Height="1056px"
                      src={i.Worst.Base64.pdf}
                    />
                  </Card>
                  <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
                    <h2
                      className="my-4 py-4"
                      style={{ textTransform: "uppercase" }}
                    >
                      {i.Title} Award List
                    </h2>
                    <CardMedia
                      className="cardmedia"
                      component="iframe"
                      Height="1056px"
                      src={i.Awardlist.Base64.pdf}
                    />
                  </Card>
                  <div
                    style={{
                      backgroundColor: "#fff",
                      marginTop: 35,
                      marginBottom: 35,
                      padding: 35,
                      paddingBottom: 35,
                    }}
                  >
                    <h2 className="my-4 py-4">{i.Title} Evalution</h2>
                    <div className="row ">
                      <div className="col">
                        <TextField
                          className="mb-4"
                          label="CLO NO iN CDF"
                          variant="outlined"
                          size="small"
                          fullWidth
                          // value={}
                          // onChange={

                          // }
                        />
                      </div>
                      <div className="col mb-4 pl-4 ml-4">
                        <FormControl>
                          <FormLabel>Is it have correct Mapping?</FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                          >
                            <FormControlLabel
                              value="yes"
                              control={<Radio size="small" />}
                              label="Yes"
                            />
                            <FormControlLabel
                              value="no"
                              control={<Radio size="small" />}
                              label="No"
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <TextField
                          className="mb-4"
                          label="BTL LEVEL iN CDF"
                          variant="outlined"
                          size="small"
                          fullWidth
                          // value={}
                          // onChange={

                          // }
                        />
                      </div>
                      <div className="col mb-4">
                        <FormControl>
                          <FormLabel>Is it have correct BTL Level ?</FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                          >
                            <FormControlLabel
                              value="yes"
                              control={<Radio size="small" />}
                              label="Yes"
                            />
                            <FormControlLabel
                              value="no"
                              control={<Radio size="small" />}
                              label="No"
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </div>
                    <div>
                      <TextField
                        multiline={true}
                        rows={2}
                        label="Other Comments:"
                        className="mb-4"
                        variant="outlined"
                        size="small"
                        fullWidth
                        // value={}
                        // onChange={

                        // }
                      />
                      <TextField
                        multiline={true}
                        rows={3}
                        label="Feedback:"
                        className="mb-4"
                        variant="outlined"
                        size="small"
                        fullWidth
                        // value={}
                        // onChange={

                        // }
                      />
                      <Button
                        style={{ float: "right" }}
                        variant="contained"
                        color="primary"
                        size="small"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );}
          })}
          
          {Folder.files.length > 0 &&
          Folder.files.map((i) => {
            if(i.Title.includes("Assignment")){
            return (
              
              <div>
                <div style={{ marginTop: 50 }}>
                  <h1
                    className="mb-4 pb-4"
                    style={{
                      padding: 10,
                      backgroundColor: "#4b2980",
                      color: "#fff",
                      textTransform: "uppercase",
                    }}
                  >
                    {i.Title}
                  </h1>
                  <Card sx={{ maxWidth: "100%", marginTop: 0 }}>
                    <h2
                      className="my-4 py-4"
                      style={{ textTransform: "uppercase" }}
                    >
                      {i.Title} Question Paper
                    </h2>
                    <CardMedia
                      className="cardmedia"
                      component="iframe"
                      Height="1056px"
                      src={i.Question.Base64.pdf}
                    />
                  </Card>
                  <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
                    <h2
                      className="my-4 py-4"
                      style={{ textTransform: "uppercase" }}
                    >
                      {i.Title} Solution
                    </h2>
                    <CardMedia
                      className="cardmedia"
                      component="iframe"
                      Height="1056px"
                      src={i.Solution.Base64.pdf}
                    />
                  </Card>
                  <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
                    <h2
                      className="my-4 py-4"
                      style={{ textTransform: "uppercase" }}
                    >
                      {i.Title} (Best)
                    </h2>
                    <CardMedia
                      className="cardmedia"
                      component="iframe"
                      Height="1056px"
                      src={i.Best.Base64.pdf}
                    />
                  </Card>
                  <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
                    <h2
                      className="my-4 py-4"
                      style={{ textTransform: "uppercase" }}
                    >
                      {i.Title} (Average)
                    </h2>
                    <CardMedia
                      className="cardmedia"
                      component="iframe"
                      Height="1056px"
                      src={i.Average.Base64.pdf}
                    />
                  </Card>
                  <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
                    <h2
                      className="my-4 py-4"
                      style={{ textTransform: "uppercase" }}
                    >
                      {i.Title} (Worst)
                    </h2>
                    <CardMedia
                      className="cardmedia"
                      component="iframe"
                      Height="1056px"
                      src={i.Worst.Base64.pdf}
                    />
                  </Card>
                  <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
                    <h2
                      className="my-4 py-4"
                      style={{ textTransform: "uppercase" }}
                    >
                      {i.Title} Award List
                    </h2>
                    <CardMedia
                      className="cardmedia"
                      component="iframe"
                      Height="1056px"
                      src={i.Awardlist.Base64.pdf}
                    />
                  </Card>
                  <div
                    style={{
                      backgroundColor: "#fff",
                      marginTop: 35,
                      marginBottom: 35,
                      padding: 35,
                      paddingBottom: 35,
                    }}
                  >
                    <h2 className="my-4 py-4">{i.Title} Evalution</h2>
                    <div className="row ">
                      <div className="col">
                        <TextField
                          className="mb-4"
                          label="CLO NO iN CDF"
                          variant="outlined"
                          size="small"
                          fullWidth
                          // value={}
                          // onChange={

                          // }
                        />
                      </div>
                      <div className="col mb-4 pl-4 ml-4">
                        <FormControl>
                          <FormLabel>Is it have correct Mapping?</FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                          >
                            <FormControlLabel
                              value="yes"
                              control={<Radio size="small" />}
                              label="Yes"
                            />
                            <FormControlLabel
                              value="no"
                              control={<Radio size="small" />}
                              label="No"
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <TextField
                          className="mb-4"
                          label="BTL LEVEL iN CDF"
                          variant="outlined"
                          size="small"
                          fullWidth
                          // value={}
                          // onChange={

                          // }
                        />
                      </div>
                      <div className="col mb-4">
                        <FormControl>
                          <FormLabel>Is it have correct BTL Level ?</FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                          >
                            <FormControlLabel
                              value="yes"
                              control={<Radio size="small" />}
                              label="Yes"
                            />
                            <FormControlLabel
                              value="no"
                              control={<Radio size="small" />}
                              label="No"
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </div>
                    <div>
                      <TextField
                        multiline={true}
                        rows={2}
                        label="Other Comments:"
                        className="mb-4"
                        variant="outlined"
                        size="small"
                        fullWidth
                        // value={}
                        // onChange={

                        // }
                      />
                      <TextField
                        multiline={true}
                        rows={3}
                        label="Feedback:"
                        className="mb-4"
                        variant="outlined"
                        size="small"
                        fullWidth
                        // value={}
                        // onChange={

                        // }
                      />
                      <Button
                        style={{ float: "right" }}
                        variant="contained"
                        color="primary"
                        size="small"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );}
          })}
        {Folder.files.length > 0 &&
          Folder.files.map((i) => {
            if(i.Title.includes("Terminal")){
            return (
              
              <div>
                <div style={{ marginTop: 50 }}>
                  <h1
                    className="mb-4 pb-4"
                    style={{
                      padding: 10,
                      backgroundColor: "#4b2980",
                      color: "#fff",
                      textTransform: "uppercase",
                    }}
                  >
                    {i.Title}
                  </h1>
                  <Card sx={{ maxWidth: "100%", marginTop: 0 }}>
                    <h2
                      className="my-4 py-4"
                      style={{ textTransform: "uppercase" }}
                    >
                      {i.Title} Question Paper
                    </h2>
                    <CardMedia
                      className="cardmedia"
                      component="iframe"
                      Height="1056px"
                      src={i.Question.Base64.pdf}
                    />
                  </Card>
                  <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
                    <h2
                      className="my-4 py-4"
                      style={{ textTransform: "uppercase" }}
                    >
                      {i.Title} Solution
                    </h2>
                    <CardMedia
                      className="cardmedia"
                      component="iframe"
                      Height="1056px"
                      src={i.Solution.Base64.pdf}
                    />
                  </Card>
                  <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
                    <h2
                      className="my-4 py-4"
                      style={{ textTransform: "uppercase" }}
                    >
                      {i.Title} (Best)
                    </h2>
                    <CardMedia
                      className="cardmedia"
                      component="iframe"
                      Height="1056px"
                      src={i.Best.Base64.pdf}
                    />
                  </Card>
                  <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
                    <h2
                      className="my-4 py-4"
                      style={{ textTransform: "uppercase" }}
                    >
                      {i.Title} (Average)
                    </h2>
                    <CardMedia
                      className="cardmedia"
                      component="iframe"
                      Height="1056px"
                      src={i.Average.Base64.pdf}
                    />
                  </Card>
                  <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
                    <h2
                      className="my-4 py-4"
                      style={{ textTransform: "uppercase" }}
                    >
                      {i.Title} (Worst)
                    </h2>
                    <CardMedia
                      className="cardmedia"
                      component="iframe"
                      Height="1056px"
                      src={i.Worst.Base64.pdf}
                    />
                  </Card>
                  <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
                    <h2
                      className="my-4 py-4"
                      style={{ textTransform: "uppercase" }}
                    >
                      {i.Title} Award List
                    </h2>
                    <CardMedia
                      className="cardmedia"
                      component="iframe"
                      Height="1056px"
                      src={i.Awardlist.Base64.pdf}
                    />
                  </Card>
                  <div
                    style={{
                      backgroundColor: "#fff",
                      marginTop: 35,
                      marginBottom: 35,
                      padding: 35,
                      paddingBottom: 35,
                    }}
                  >
                    <h2 className="my-4 py-4">{i.Title} Evalution</h2>
                    <div className="row ">
                      <div className="col">
                        <TextField
                          className="mb-4"
                          label="CLO NO iN CDF"
                          variant="outlined"
                          size="small"
                          fullWidth
                          // value={}
                          // onChange={

                          // }
                        />
                      </div>
                      <div className="col mb-4 pl-4 ml-4">
                        <FormControl>
                          <FormLabel>Is it have correct Mapping?</FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                          >
                            <FormControlLabel
                              value="yes"
                              control={<Radio size="small" />}
                              label="Yes"
                            />
                            <FormControlLabel
                              value="no"
                              control={<Radio size="small" />}
                              label="No"
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <TextField
                          className="mb-4"
                          label="BTL LEVEL iN CDF"
                          variant="outlined"
                          size="small"
                          fullWidth
                          // value={}
                          // onChange={

                          // }
                        />
                      </div>
                      <div className="col mb-4">
                        <FormControl>
                          <FormLabel>Is it have correct BTL Level ?</FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                          >
                            <FormControlLabel
                              value="yes"
                              control={<Radio size="small" />}
                              label="Yes"
                            />
                            <FormControlLabel
                              value="no"
                              control={<Radio size="small" />}
                              label="No"
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </div>
                    <div>
                      <TextField
                        multiline={true}
                        rows={2}
                        label="Other Comments:"
                        className="mb-4"
                        variant="outlined"
                        size="small"
                        fullWidth
                        // value={}
                        // onChange={

                        // }
                      />
                      <TextField
                        multiline={true}
                        rows={3}
                        label="Feedback:"
                        className="mb-4"
                        variant="outlined"
                        size="small"
                        fullWidth
                        // value={}
                        // onChange={

                        // }
                      />
                      <Button
                        style={{ float: "right" }}
                        variant="contained"
                        color="primary"
                        size="small"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );}
          })}
          {Folder.files.length > 0 &&
          Folder.files.map((i) => {
            if(i.Title.includes("Mid")||i.Title.includes("Sessional")){
            return (
              
              <div>
                <div style={{ marginTop: 50 }}>
                  <h1
                    className="mb-4 pb-4"
                    style={{
                      padding: 10,
                      backgroundColor: "#4b2980",
                      color: "#fff",
                      textTransform: "uppercase",
                    }}
                  >
                    {i.Title}
                  </h1>
                  <Card sx={{ maxWidth: "100%", marginTop: 0 }}>
                    <h2
                      className="my-4 py-4"
                      style={{ textTransform: "uppercase" }}
                    >
                      {i.Title} Question Paper
                    </h2>
                    <CardMedia
                      className="cardmedia"
                      component="iframe"
                      Height="1056px"
                      src={i.Question.Base64.pdf}
                    />
                  </Card>
                  <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
                    <h2
                      className="my-4 py-4"
                      style={{ textTransform: "uppercase" }}
                    >
                      {i.Title} Solution
                    </h2>
                    <CardMedia
                      className="cardmedia"
                      component="iframe"
                      Height="1056px"
                      src={i.Solution.Base64.pdf}
                    />
                  </Card>
                  <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
                    <h2
                      className="my-4 py-4"
                      style={{ textTransform: "uppercase" }}
                    >
                      {i.Title} (Best)
                    </h2>
                    <CardMedia
                      className="cardmedia"
                      component="iframe"
                      Height="1056px"
                      src={i.Best.Base64.pdf}
                    />
                  </Card>
                  <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
                    <h2
                      className="my-4 py-4"
                      style={{ textTransform: "uppercase" }}
                    >
                      {i.Title} (Average)
                    </h2>
                    <CardMedia
                      className="cardmedia"
                      component="iframe"
                      Height="1056px"
                      src={i.Average.Base64.pdf}
                    />
                  </Card>
                  <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
                    <h2
                      className="my-4 py-4"
                      style={{ textTransform: "uppercase" }}
                    >
                      {i.Title} (Worst)
                    </h2>
                    <CardMedia
                      className="cardmedia"
                      component="iframe"
                      Height="1056px"
                      src={i.Worst.Base64.pdf}
                    />
                  </Card>
                  <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
                    <h2
                      className="my-4 py-4"
                      style={{ textTransform: "uppercase" }}
                    >
                      {i.Title} Award List
                    </h2>
                    <CardMedia
                      className="cardmedia"
                      component="iframe"
                      Height="1056px"
                      src={i.Awardlist.Base64.pdf}
                    />
                  </Card>
                  <div
                    style={{
                      backgroundColor: "#fff",
                      marginTop: 35,
                      marginBottom: 35,
                      padding: 35,
                      paddingBottom: 35,
                    }}
                  >
                    <h2 className="my-4 py-4">{i.Title} Evalution</h2>
                    <div className="row ">
                      <div className="col">
                        <TextField
                          className="mb-4"
                          label="CLO NO iN CDF"
                          variant="outlined"
                          size="small"
                          fullWidth
                          // value={}
                          // onChange={

                          // }
                        />
                      </div>
                      <div className="col mb-4 pl-4 ml-4">
                        <FormControl>
                          <FormLabel>Is it have correct Mapping?</FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                          >
                            <FormControlLabel
                              value="yes"
                              control={<Radio size="small" />}
                              label="Yes"
                            />
                            <FormControlLabel
                              value="no"
                              control={<Radio size="small" />}
                              label="No"
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <TextField
                          className="mb-4"
                          label="BTL LEVEL iN CDF"
                          variant="outlined"
                          size="small"
                          fullWidth
                          // value={}
                          // onChange={

                          // }
                        />
                      </div>
                      <div className="col mb-4">
                        <FormControl>
                          <FormLabel>Is it have correct BTL Level ?</FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                          >
                            <FormControlLabel
                              value="yes"
                              control={<Radio size="small" />}
                              label="Yes"
                            />
                            <FormControlLabel
                              value="no"
                              control={<Radio size="small" />}
                              label="No"
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </div>
                    <div>
                      <TextField
                        multiline={true}
                        rows={2}
                        label="Other Comments:"
                        className="mb-4"
                        variant="outlined"
                        size="small"
                        fullWidth
                        // value={}
                        // onChange={

                        // }
                      />
                      <TextField
                        multiline={true}
                        rows={3}
                        label="Feedback:"
                        className="mb-4"
                        variant="outlined"
                        size="small"
                        fullWidth
                        // value={}
                        // onChange={

                        // }
                      />
                      <Button
                        style={{ float: "right" }}
                        variant="contained"
                        color="primary"
                        size="small"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );}
          })}
        {/* <div>
            <h1
              style={{
                backgroundColor: "#ffd700",
                paddingTop: "30%",
                paddingBottom: "30%",
              }}
            >
              Quizzes
            </h1>
            <div style={{ marginTop: 50 }}>
              <h3 className="mb-4 pb-4">Quiz No. </h3>
              <p>Insert Quiz PDF here</p>
              <Card
                style={{
                  backgroundColor: "#f5f5f5",
                  padding: 30,
                  marginTop: 60,
                  marginBottom: 20,
                }}
              >
                <div className="row">
                  <div className="col">
                    <TextField
                      className="mb-4"
                      label="CLO NO iN CDF"
                      variant="outlined"
                      size="small"
                      fullWidth
                      // value={}
                      // onChange={

                      // }
                    />
                  </div>
                  <div className="col mb-4 pl-4 ml-4">
                    <FormControl>
                      <FormLabel>Is it have correct Mapping?</FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio size="small" />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio size="small" />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <TextField
                      className="mb-4"
                      label="BTL LEVEL iN CDF"
                      variant="outlined"
                      size="small"
                      fullWidth
                      // value={}
                      // onChange={

                      // }
                    />
                  </div>
                  <div className="col mb-4">
                    <FormControl>
                      <FormLabel>Is it have correct BTL Level ?</FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio size="small" />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio size="small" />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
                <div>
                  <TextField
                    multiline={true}
                    rows={2}
                    label="Other Comments:"
                    className="mb-4"
                    variant="outlined"
                    size="small"
                    fullWidth
                    // value={}
                    // onChange={

                    // }
                  />
                  <TextField
                    multiline={true}
                    rows={3}
                    label="Feedback:"
                    className="mb-4"
                    variant="outlined"
                    size="small"
                    fullWidth
                    // value={}
                    // onChange={

                    // }
                  />
                  <Button
                    style={{ float: "right" }}
                    variant="contained"
                    color="primary"
                    size="small"
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
              </Card>
            </div>
          </div> */}
        {/* <div>
            <h1
              style={{
                backgroundColor: "#fe5381",
                paddingTop: "30%",
                paddingBottom: "30%",
              }}
            >
              MidTerm Exam
            </h1>
            <div style={{ marginTop: 50 }}>
              <p className="mb-4 pb-4">Insert MidTerm pdf here</p>
            </div>
          </div>
          <div>
            <h1
              style={{
                backgroundColor: "#fdba74",
                paddingTop: "30%",
                paddingBottom: "30%",
              }}
            >
              Terminal
            </h1>
            <div style={{ marginTop: 50 }}>
              <p className="mb-4 pb-4">Insert Terminal pdf here</p>
            </div>
          </div> */}

  
        <div>
          <h1
            style={{
              backgroundColor: "#2ac0dc",
              paddingTop: "30%",
              paddingBottom: "30%",
            }}
          >
            Outcome Based Education
          </h1>
          {Folder.Obe == null ? (
            <p>no OBE</p>
          ) : (
            <Card sx={{ maxWidth: 824 }}>
              <CardMedia
                className="cardmedia"
                component="iframe"
                Height="1056px"
                src={Folder.Obe.pdf}
              />
            </Card>
          )}
          <div style={{ marginTop: 50 }}>
            <h3 className="mb-4 pb-4">ICEF</h3>
            {Folder.ICEF == null ? (
              <p>No ICEF</p>
            ) : (
              <Card sx={{ maxWidth: 824 }}>
                <CardMedia
                  className="cardmedia"
                  component="iframe"
                  Height="1056px"
                  src={Folder.ICEF.pdf}
                />
              </Card>
            )}
            <p>{}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

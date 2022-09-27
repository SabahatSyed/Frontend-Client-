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
import { getGridColDef } from "@mui/x-data-grid";
import { Quiz } from "@mui/icons-material";

export default function FolderTemplete() {
  const [open, setOpen] = React.useState(true);
  axios.defaults.withCredentials = true;
  const location=useLocation().state
  const [cdf,setcdf]=useState();
  const { id } = useParams();
  console.log("useParams",location)
  useEffect(() => {
    getFolderData();
  }, []);
  const getcdf = async () => {
    console.log("ingetcdf")
    const res = await axios.get(
      `http://localhost:4000/CDF/showOne/${location.i?.Folder.Program}/${location.i?.Folder.Course.Code}`
    );
    console.log("CDF",res.data);
    setcdf(res.data);
  };
  var clo,title,btl
  var cloa,titlea,btla
  var clom,titlem,btlm
  var clof,titlef,btlf

  const [Folder, setFolder] = useState({ files: [], ICEF: null, Obe: null, LectureDeliveryRecord: null });
  const [quiz,setquiz]=useState({title:title,clo_no:clo,clo_correct:true,btl_no:btl,btl_correct:true,Comments:"",Feedback:""})
  const [assignment,setassignment]=useState({title:titlea,clo_no:cloa,clo_correct:true,btl_no:btla,btl_correct:true,Comments:"",Feedback:""})
  const [mid,setmid]=useState({title:titlem,clo_no:clom,clo_correct:true,btl_no:btlm,btl_correct:true,Comments:"",Feedback:""})
  const [final,setfinal]=useState({title:titlef,clo_no:clof,clo_correct:true,btl_no:btlf,btl_correct:true,Comments:"",Feedback:""})


  console.log("Folder: ", Folder);
  const getFolderData = async () => {
    console.log("id is here",id)
    const res = await axios.get(
      `http://localhost:4000/EvalFolders/showComp/${id}`
    );
    console.log(res.data);
    setFolder(res.data);
    getcdf()

  };
  const handleClick = () => {
    setOpen(!open);
  };
  const addQuiz = (tit) => {
    setquiz(existingValues => ({
      ...existingValues,
      clo_no: clo.sr,
      btl_no:btl,
      title:tit
    }))

    axios.put(`http://localhost:4000/Folders/addEvaluation/${location.i.Folder._id}`,{
      title:title,
      data:quiz
    })
    
    setquiz({title:title,clo_no:clo.sr,clo_correct:true,btl_no:btl,btl_correct:true,Comments:"",Feedback:""})

  };
  const addAssignment = (tit) => {
    setassignment(existingValues => ({
      ...existingValues,
      clo_no: cloa.sr,
      btl_no:btla,
      title:tit
    }))

    axios.put(`http://localhost:4000/Folders/addEvaluation/${location.i.Folder._id}`,{
      title:titlea,
      data:assignment
    })
    
    setassignment({title:titlea,clo_no:cloa.sr,clo_correct:true,btl_no:btla,btl_correct:true,Comments:"",Feedback:""})

  };
  const addmid = (tit) => {
    setmid(existingValues => ({
      ...existingValues,
      clo_no: clom.sr,
      btl_no:btlm,
      title:tit
    }))

    axios.put(`http://localhost:4000/Folders/addEvaluation/${location.i.Folder._id}`,{
      title:titlem,
      data:mid
    })
    
    setmid({title:titlem,clo_no:clom.sr,clo_correct:true,btl_no:btlm,btl_correct:true,Comments:"",Feedback:""})

  };
  const addEvaluationstatus = () => {
    

    axios.put(`http://localhost:4000/Folders/editEvaluation/${location.i.Folder._id}`,{
      Evaluation:true
    })
    alert("Course Evaluated")

  };
  const addfinal = (tit) => {
    setfinal(existingValues => ({
      ...existingValues,
      clo_no: clof.sr,
      btl_no:btlf,
      title:tit
    }))

    axios.put(`http://localhost:4000/Folders/addEvaluation/${location.i.Folder._id}`,{
      title:titlef,
      data:final
    })
    
    setfinal({title:titlef,clo_no:clof.sr,clo_correct:true,btl_no:btlf,btl_correct:true,Comments:"",Feedback:""})

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
            var ind;

            if(i.Title.includes("Quiz") && cdf!=null){
             

             cdf.CLOs.map((val)=>{
              console.log("sdggfsgajgsdk",val)
               val.Quizzes.find((item,index)=>{
                if(item.title==i.Title){
                  ind=val
                  clo=val
                  btl=ind.BTL[0].BTL
                  title=i.Title
                  console.log("hello",ind)
                }
               })
          })
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
                           value={clo.sr}
                           defaultValue={(e) => {
                            setquiz(existingValues => ({
                              ...existingValues,
                              clo_no: clo.sr,
                            }))
                          }}
                           onChange={ (e) => {
                              setquiz(existingValues => ({
                                ...existingValues,
                                clo_no:clo.sr,
                                title:i.Title
                              }))
                            }
                         }
                       />
                      </div>
                      <div className="col mb-4 pl-4 ml-4">
                        <FormControl>
                          <FormLabel>Is it have correct Mapping?</FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="yes"
                            name="radio-buttons-group"
                            onChange={(e) => {
                              setquiz(existingValues => ({
                                ...existingValues,
                                clo_correct: e.target.value,
                                title:i.Title
                              }))
                            }}
                          >
                            <FormControlLabel
                              value={true}
                              control={<Radio size="small" />}
                              label="Yes"
                            />
                            <FormControlLabel
                              value={false}
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
                           value={btl}
                           defaultValue={(e) => {
                            setquiz(existingValues => ({
                              ...existingValues,
                              btl_no: btl,
                            }))
                          }}
                           onChange={
                            (e) => {
                              setquiz(existingValues => ({
                                ...existingValues,
                                btl_no: btl,
                              }))
                            }
                          }
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
                            onChange={(e) => {
                              setquiz(existingValues => ({
                                ...existingValues,
                                btl_correct: e.target.value,
                              }))
                            }}
                          >
                            <FormControlLabel
                              value={true}
                              control={<Radio size="small" />}
                              label="Yes"
                            />
                            <FormControlLabel
                              value={false}
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
                         value={quiz.Comments}
                        onChange={(e) => {
                          setquiz(existingValues => ({
                            ...existingValues,
                            Comments: e.target.value,
                          }))
                        }}
                      />
                      <TextField
                        multiline={true}
                        rows={3}
                        label="Feedback:"
                        className="mb-4"
                        variant="outlined"
                        size="small"
                        fullWidth
                         value={quiz.Feedback}
                         onChange={(e) => {
                          setquiz(existingValues => ({
                            ...existingValues,
                            Feedback: e.target.value,
                          }))
                        }}
                      />
                      <Button
                        style={{ float: "right" }}
                        variant="contained"
                        color="primary"
                        size="small"
                        type="submit"
                        onClick={()=>addQuiz(i.Title)}
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
            var ind;
            if(i.Title.includes("Assignment") && cdf!=null){
              cdf.CLOs.map((val)=>{
                console.log("sdggfsgajgsdk",val)
                 val.Assignment.find((item,index)=>{
                  if(item.title==i.Title){
                    ind=val
                    cloa=val
                    btla=ind.BTL[0].BTL
                    titlea=i.Title
                    console.log("hello",ind)
                  }
                 })
            })
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
                          value={cloa.sr}
                          defaultValue={(e) => {
                            setassignment(existingValues => ({
                              ...existingValues,
                              clo_no: cloa.sr,
                            }))
                          }}
                           onChange={ (e) => {
                              setassignment(existingValues => ({
                                ...existingValues,
                                clo_no:cloa.sr,
                                title:i.Title
                              }))
                            }
                         }
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
                            onChange={(e) => {
                              setassignment(existingValues => ({
                                ...existingValues,
                                clo_correct: e.target.value,
                                title:i.Title
                              }))
                            }}
                          >
                            <FormControlLabel
                              value={true}
                              control={<Radio size="small" />}
                              label="Yes"
                            />
                            <FormControlLabel
                              value={false}
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
                          value={btla}
                          defaultValue={(e) => {
                            setassignment(existingValues => ({
                              ...existingValues,
                              btl_no: btla,
                            }))
                          }}
                          onChange={
                            (e) => {
                              setassignment(existingValues => ({
                                ...existingValues,
                                btl_no: btla,
                              }))
                            }
                          }
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
                            onChange={(e) => {
                              setassignment(existingValues => ({
                                ...existingValues,
                                btl_correct: e.target.value,
                              }))
                            }}
                          >
                            <FormControlLabel
                              value={true}
                              control={<Radio size="small" />}
                              label="Yes"
                            />
                            <FormControlLabel
                              value={false}
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
                        value={assignment.Comments}
                        onChange={(e) => {
                          setassignment(existingValues => ({
                            ...existingValues,
                            Comments: e.target.value,
                          }))
                        }}
                      />
                      <TextField
                        multiline={true}
                        rows={3}
                        label="Feedback:"
                        className="mb-4"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={assignment.Feedback}
                        onChange={(e) => {
                          setassignment(existingValues => ({
                            ...existingValues,
                            Feedback: e.target.value,
                          }))
                        }}
                      />
                      <Button
                        style={{ float: "right" }}
                        variant="contained"
                        color="primary"
                        size="small"
                        type="submit"
                        onClick={()=>addAssignment(i.Title)}

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
            var ind;
            if(i.Title.includes("Terminal") && cdf!=null){
              cdf.CLOs.map((val)=>{
                if(val.Final.includes("Final") && cdf!=null){
                  
                    ind=val
                    clof=val
                    btlf=ind.BTL[0].BTL
                    titlef=i.Title
                }
                 
            })
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
                          value={clof.sr}
                          defaultValue={(e) => {
                            setfinal(existingValues => ({
                              ...existingValues,
                              clo_no: clof.sr,
                            }))
                          }}
                           onChange={ (e) => {
                              setfinal(existingValues => ({
                                ...existingValues,
                                clo_no:clof.sr,
                                title:i.Title
                              }))
                            }
                         }
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
                            onChange={(e) => {
                              setfinal(existingValues => ({
                                ...existingValues,
                                clo_correct: e.target.value,
                                title:i.Title
                              }))
                            }}
                          >
                            <FormControlLabel
                              value={true}
                              control={<Radio size="small" />}
                              label="Yes"
                            />
                            <FormControlLabel
                              value={false}
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
                          value={btlf}
                          defaultValue={(e) => {
                            setfinal(existingValues => ({
                              ...existingValues,
                              btl_no: btlf,
                            }))
                          }}
                          onChange={
                            (e) => {
                              setfinal(existingValues => ({
                                ...existingValues,
                                btl_no: btlf,
                              }))
                            }
                          }
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
                            onChange={(e) => {
                              setfinal(existingValues => ({
                                ...existingValues,
                                btl_correct: e.target.value,
                              }))
                            }}
                          >
                            <FormControlLabel
                              value={true}
                              control={<Radio size="small" />}
                              label="Yes"
                            />
                            <FormControlLabel
                              value={false}
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
                        value={final.Comments}
                        onChange={(e) => {
                          setfinal(existingValues => ({
                            ...existingValues,
                            Comments: e.target.value,
                          }))
                        }}
                      />
                      <TextField
                        multiline={true}
                        rows={3}
                        label="Feedback:"
                        className="mb-4"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={final.Feedback}
                        onChange={(e) => {
                          setfinal(existingValues => ({
                            ...existingValues,
                            Feedback: e.target.value,
                          }))
                        }}
                      />
                      <Button
                        style={{ float: "right" }}
                        variant="contained"
                        color="primary"
                        size="small"
                        type="submit"
                        onClick={()=>addfinal(i.Title)}

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
            var ind;
            if(i.Title.includes("Mid")||i.Title.includes("Sessional") && cdf!=null){
              cdf?.CLOs?.map((val)=>{
                if(val.Mid.includes("Mid") || val.Mid.includes("Sessional") && cdf!=null){
                  
                    ind=val
                    clom=val.sr
                    btlm=ind.BTL[0].BTL
                    titlem=i.Title
                }
                 
            })
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
                          value={clom}
                          defaultValue={(e) => {
                            setmid(existingValues => ({
                              ...existingValues,
                              clo_no: clom,
                            }))
                          }}
                           onChange={ (e) => {
                              setmid(existingValues => ({
                                ...existingValues,
                                clo_no:clom,
                                title:i.Title
                              }))
                            }
                         }
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
                            onChange={(e) => {
                              setmid(existingValues => ({
                                ...existingValues,
                                clo_correct: e.target.value,
                                title:i.Title
                              }))
                            }}
                          >
                            <FormControlLabel
                              value={true}
                              control={<Radio size="small" />}
                              label="Yes"
                            />
                            <FormControlLabel
                              value={false}
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
                          value={btlm}
                          defaultValue={(e) => {
                            setmid(existingValues => ({
                              ...existingValues,
                              btl_no: btlm,
                            }))
                          }}
                          onChange={
                            (e) => {
                              setmid(existingValues => ({
                                ...existingValues,
                                btl_no: btlm,
                              }))
                            }
                          }
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
                            onChange={(e) => {
                              setmid(existingValues => ({
                                ...existingValues,
                                btl_correct: e.target.value,
                              }))
                            }}
                          >
                            <FormControlLabel
                              value={true}
                              control={<Radio size="small" />}
                              label="Yes"
                            />
                            <FormControlLabel
                              value={false}
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
                        value={mid.Comments}
                        onChange={(e) => {
                          setmid(existingValues => ({
                            ...existingValues,
                            Comments: e.target.value,
                          }))
                        }}
                      />
                      <TextField
                        multiline={true}
                        rows={3}
                        label="Feedback:"
                        className="mb-4"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={mid.Feedback}
                        onChange={(e) => {
                          setmid(existingValues => ({
                            ...existingValues,
                            Feedback: e.target.value,
                          }))
                        }}
                      />
                      <Button
                        style={{ float: "right" }}
                        variant="contained"
                        color="primary"
                        size="small"
                        type="submit"
                        onClick={()=>addmid(i.Title)}

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
            <Button
                        style={{ float: "right" }}
                        variant="contained"
                        color="primary"
                        size="small"
                        type="submit"
                        onClick={()=>addEvaluationstatus()}

                      >
                        Evaluate
                      </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

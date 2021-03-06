import React, { useState, useEffect } from "react";
import { useLocation, Link, useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Image from "../../images/homeBackground_blur.png";
import Container from "@material-ui/core/Container";
import VerticalTabs from "./ProfileTabs";
import Avatar from '@material-ui/core/Avatar';
import PortraitImage from "../../images/student_portrait.png";
import Grid from '@material-ui/core/Grid';
import NotFound from "../NotFound";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import { studentUrl, hostUrl } from "../Url";


const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    left: 0,
    right: 0,
    // top: 0,
    // bottom: 0,
    backgroundImage: "url(" + Image + ")",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    zIndex: "-1",
    color: "#4b4b4b"
  },
  header: {
    marginTop: 70,
    maxWidth: "70%"
  },
  body: {
    maxWidth: "70%",
    marginTop: 40,
  },
  portraitDiv: {
    width: "20%",
    marginRight: "40px"
  },
  portrait: {
    width: "100%",
    height: "100%"
  },
  information: {
    marginTop: "40px",
    marginLeft: "40px"
  },
  username: {
    color: "#8493d3",
    marginBottom: "30px",
    textAlign: "left"
  },
  resize: {
    fontSize: "1.5vw",
    padding: 10,
  },
  alert: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));


export default function Profile(props) {
  const location = useLocation();
  const [student, setStudent] = useState(null);
  const [application, setApplication] = useState([]);
  const [disable, setDisable] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorStatus, setErrorStatus] = useState("error");

  const classes = useStyles();

  async function handleUpdateProfile(event) {
    event.preventDefault();
    // if(student.high_school_name == null || student.high_school_city == null || student.high_school_state == null ||
    //    student.high_school_name == ""  || student.high_school_city == "" || student.high_school_state==""){
    //   setErrorStatus("error");
    //   setErrorMessage("Please enter high school information. Including city and state.");
    //   return;
    // }
    if ((student.SAT != null && student.SAT != "") && (student.SAT < 400 || student.SAT > 1600)) {
      setErrorStatus("error");
      setErrorMessage("Please enter valid SAT score.");
      return;
    }
    if ((student.ACT_composite != null && student.ACT_composite != "") && (student.ACT_composite < 1 || student.ACT_composite > 36)) {
      setErrorStatus("error");
      setErrorMessage("Please enter valid ACT composite score.");
      return;
    }


    let url = studentUrl + student.userid + "/edit/";
    let url2 = studentUrl + student.userid + "/edit/application";
    axios.post(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      student: JSON.stringify(student),
    })
      .then((data) => {
        if (data.status == 200) {
          setErrorStatus("success");
          setErrorMessage("Update Successfully");
        }
      }).catch((error) => {
        setErrorStatus("error");
        setErrorMessage("No High School Information Found. ");
      });

    axios.post(url2, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      application: JSON.stringify(application),
    })
      .then((res) => {
        setApplication(res.data);
      });
  }

  useEffect(() => {
    let url = hostUrl + location.pathname + "/"; //    /student/q
    axios.get(url)
      .then((data) => {
        if (data.status === 200) {
          setStudent(data.data.student);
          setApplication(data.data.application);
          setErrorMessage("");
        }
      });
  }, [location]);

  useEffect(() => {
    if (location.pathname.substring(9) == props.user) {
      setDisable(false);
    };
  }, [props.user, student, setStudent])

  return (
    <div>
      {student && (
        <div className={classes.root}>
          {errorMessage && (
            <div className={classes.alert}>
              <Alert
                severity={errorStatus}
                onClose={() => {
                  setErrorMessage(null);
                }}
              >
                {errorMessage}
              </Alert>
            </div>
          )}
          {!student && <NotFound />}
          <form onSubmit={handleUpdateProfile} >
            <Container className={classes.header}>
              <Grid container direction="row"
                justify="flex-start"
                alignItems="flex-start">
                <Grid item className={classes.portraitDiv}>
                  <Avatar alt="student" src={PortraitImage} className={classes.portrait} />
                </Grid>
                <Grid item className={classes.information}>
                  <Typography variant="h3" className={classes.username}>
                    {student.userid}
                  </Typography>
                  <Typography variant="h4">
                    Residence State:
                    <TextField id="residence_state"
                      onChange={(e) => setStudent({ ...student, [e.target.id]: e.target.value })}
                      disabled={disable} defaultValue={student.residence_state} variant="outlined" InputProps={{ classes: { input: classes.resize } }} />
                  </Typography>
                </Grid>
              </Grid>
            </Container>
            <Container className={classes.body}>
              <VerticalTabs student={student} setStudent={setStudent} disable={disable} application={application} setApplication={setApplication} />
            </Container>

            <br /><br /><br /><br /><br /><br /><br />
          </form>
        </div>
      )}
    </div>
  );
}

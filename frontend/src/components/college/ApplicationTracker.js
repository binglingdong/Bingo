import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import queryString from "query-string";
import { useLocation, Link, useHistory, useParams } from "react-router-dom";
import { Grid, Button, Paper } from "@material-ui/core";
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import LinearProgress from "@material-ui/core/LinearProgress";
import HighSchoolCard from "./HighSchoolCard";
import SliderFactory from "./SliderCollegeClass";
import StatusFilter from "./StatusFilter"
import HighSchoolFilter from "./HighSchoolFilter"
import EnhancedTable from "./ViewApplicationsTable";
import CustomizedTables from "./StatisticsTable";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles((theme) => ({
  search: {
    minWidth: "300px",
    width: "30vw",
    height: "45px",
    // marginBottom: "5px",
    // marginTop: "200px",
    background: 'linear-gradient(45deg, #D4DDFD 30%, #3F51B5 90%)',
    // aling: "center"
  },
  input: {
    width: "85%",
  },
}));

export default function ApplicationTracker(props) {
  const classes = useStyles();

  const [ step, setStep ] = useState(2); // step 0 - enter hs, step 1 - select among simimlar, step 2 - view applications
  const [ schools, setSchools ] = useState([ { name: "Witney High School", city: "New York City", state: "NY", sat: 1200, act: 30, num_students: 4000, grad_rate: 0.81, ap_enroll: 0.3 },
  { name: "Witney High School", city: "New York City", state: "NY", sat: 1200, act: 30, num_students: 4000, grad_rate: 0.81, ap_enroll: 0.3 },
  { name: "Witney High School", city: "New York City", state: "NY", sat: 1200, act: 30, num_students: 4000, grad_rate: 0.81, ap_enroll: 0.3 },
  { name: "Witney High School", city: "New York City", state: "NY", sat: 1200, act: 30, num_students: 4000, grad_rate: 0.81, ap_enroll: 0.3 } ]); // high schools
  const [ loading, setLoading ] = useState(false);
  const [ lax, setLax ] = useState(false);
  const [ students, setStudents ] = useState([]);
  const [ cur_students, setCurrentStudents ] = useState([]);


  useEffect(() => {
    getApplications();
  }, [ lax ]);

  const getHighSchools = () => {
    const uniqueTags = [];
    students.map(img => {
        if (uniqueTags.indexOf(img.high_school_name) === -1) {
            uniqueTags.push(img.high_school_name)
        }
    });
    return uniqueTags;
  }

  const filterStatus = (status_array) => {
    if (status_array.length == 0) {
      setCurrentStudents(students)
    } else {
      setCurrentStudents(students.filter(s => status_array.includes(s.status)));
    }
  }

  const filterCollegeClass = (college_class) => {
    setCurrentStudents(students.filter(s => (s.college_class >= college_class[0] && (s.college_class <= college_class[1]))));
  }

  const filterHighSchool = (hs_array) => {
    if (hs_array.length == 0) {
      setCurrentStudents(students)
    } else {
      setCurrentStudents(students.filter(s => hs_array.includes(s.high_school_name)));
    }
  }

  const getApplications = () => {
    console.log('props', props);
    axios.get("http://localhost:8000/college/" + props.college + "/applications", {
      responseType: "json",
    })
      .then((response) => {
        console.log('response', response)
        setStudents(response.data)
        setCurrentStudents(response.data)
        // setColleges(
        //   response.data.map((c) => {
        //     return c.fields;
        //   })
        // );
      });
    setLoading(false);
  };


  const aggregateSATmath = () => {
    console.log(students)
    return students.map(({ SAT_math }) => SAT_math).reduce((sum, i) => sum + i, 0) / students.length;
  }
  const aggregateSATebrw = () => {
    return students.map(({ SAT_EBRW }) => SAT_EBRW).reduce((sum, i) => sum + i, 0) / students.length;
  }
  const aggregateGPA = () => {
    return students.map(({ GPA }) => GPA).reduce((sum, i) => sum + parseFloat(i), 0) / students.length;
  }
  const aggregateACT = () => {
    return students.map(({ ACT_composite }) => ACT_composite).reduce((sum, i) => sum + i, 0) / students.length;
  }

  const aggregateSATmath_accepted = () => {
    const accepted_students = students.filter(item => item.status == "accepted");
    return accepted_students.filter(item => item.status == "accepted").map(({ SAT_math }) => SAT_math).reduce((sum, i) => sum + i, 0) / accepted_students.length;
  }

  const aggregateSATebrw_accepted = () => {
    const accepted_students = students.filter(item => item.status == "accepted");
    return accepted_students.filter(item => item.status == "accepted").map(({ SAT_EBRW }) => SAT_EBRW).reduce((sum, i) => sum + i, 0) / accepted_students.length;
  }

  const aggregateGPA_accepted = () => {
    const accepted_students = students.filter(item => item.status == "accepted");
    return accepted_students.filter(item => item.status == "accepted").map(({ GPA }) => GPA).reduce((sum, i) => sum + parseFloat(i), 0) / accepted_students.length;
  }


  const aggregateACT_accepted = () => {
    const accepted_students = students.filter(item => item.status == "accepted");
    return accepted_students.filter(item => item.status == "accepted").map(({ ACT_composite }) => ACT_composite).reduce((sum, i) => sum + i, 0) / accepted_students.length;
  }

  if (step == 0) {
    return <div>
      <Typography variant="h6" align="center">
        Search for Similar High Schools
      </Typography>
      <Paper
        component="form"
        className={ classes.search }
      // onSubmit={console.log("clicked")}
      >
        <InputBase
          name="searchQuery"
          className={ classes.input }
          placeholder="Enter Name of High Schools"
        />
        <IconButton
          type="submit"
          className={ classes.iconButton }
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>;
  } else if (step == 1) {
    return <div>


      <Grid
        className={ classes.root }
        container
        spacing={ 2 }
        margins={ 3 }
        justify="center"
      >
        {/* left - side */ }
        <Grid item md={ 2 } className={ classes.filters }>
          <Grid container spacing={ 2 }>
            <Grid item md={ 12 }>
              <Typography variant="h6" align="center">
                High School Entered:
            </Typography>
              <Chip
                size="large"
                label="Whitney High School"
                clickable
                color="primary"
                // onDelete={handleDelete}
                deleteIcon={ <DoneIcon /> }
              />
            </Grid>
          </Grid>


          {/* right side - high schools */ }
        </Grid>
        <Grid item md={ 8 }>


          { loading ? (
            <LinearProgress variant="query" />
          ) : (
              schools.map((school) => <HighSchoolCard college={ school } rec_score={ false } user={ props.user } />)
            ) }
        </Grid>
      </Grid>



    </div>
  } else {
    // LIST OF PROFILES TAB
    return (
      <div>

        <Grid
          className={ classes.root }
          container
          spacing={ 2 }
          // margins={ 1 }
          justify="center"
        >
          {/* left - side */ }
          <Grid item md={ 3 } className={ classes.filters }>
            <Grid container spacing={ 3 }>
              <Grid item md={ 12 }>
                <HighSchoolFilter id="high_schools" filterHighSchool={filterHighSchool} allHighSchools={getHighSchools()}/>
              </Grid>
              <Grid item md={ 12 }>
                <StatusFilter id="status" filterStatus={ filterStatus } />
              </Grid>
              <Grid item md={ 12 }>
                <SliderFactory
                  id="college_class"
                  // navigate={ navigate }
                  filterCollegeClass={filterCollegeClass}
                  min={ 2000 }
                  max={ 2030 }
                  startText={ "College Class" }
                  step={ 1 }
                />
              </Grid>
              <Grid item md={ 12 }>
                strict
            <Switch
                  color="primary"
                  checked={ lax }
                  onChange={ () => {
                    // navigate("lax", !lax);
                    setLax(!lax);
                  } }
                  name="checkedA"
                  inputProps={ { "aria-label": "secondary checkbox" } }
                />
            lax
          </Grid>
            </Grid>


            {/* right side - high schools, CustomizedTable is Statistics*/ }

          </Grid>
          <Grid item md={ 8 }>
            <EnhancedTable students={ cur_students } />
            <br></br>
            <CustomizedTables SAT_math={ aggregateSATmath() } SAT_EBRW={ aggregateSATebrw() } GPA={ aggregateGPA() } ACT={ aggregateACT() } SAT_math_accepted={ aggregateSATmath_accepted() } SAT_EBRW_accepted={ aggregateSATebrw_accepted() } GPA_accepted={ aggregateGPA_accepted() } ACT_accepted={ aggregateACT_accepted() } />
          </Grid>
        </Grid>

      </div>
    )
  }
}

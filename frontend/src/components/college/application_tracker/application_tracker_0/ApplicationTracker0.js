import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "../../../SearchBar";
import axios from "axios";
import { similarHighSchoolUrl } from "../../../Url";


const useStyles = makeStyles((theme) => ({
    search: {
      minWidth: "300px",
      width: "30vw",
      height: "45px",
      background: 'linear-gradient(45deg, #D4DDFD 30%, #3F51B5 90%)',
    },
    input: {
      width: "85%",
    },
    margin: {
      margin: theme.spacing(1),
      minHeight: "55px"
    },
    button: {
      margin: theme.spacing(1),
      marginLeft: "97%"
    },
    detail_textfield:{
      margin: "20px",
    }
  }));



export default function ApplicationTracker1(props) {
    const classes = useStyles();
    const handleSearch = (e) => {
      e.preventDefault();
      const high_school_name= e.target.searchQuery.value;

      axios
      .get(similarHighSchoolUrl, {
        responseType: "json",
        params: {
          high_school: e.target.searchQuery.value,
          high_school_city: e.target.city.value,
          high_school_state: e.target.state.value
        }
      })
      .then((response) => {
        if(response.status == 200){
          props.setResult(response.data);
          props.setErrorMessage(null);
          props.setQuery(high_school_name);
          props.setStep(1);
        }
        else{
          props.setResult([]);
          props.setErrorMessage("No similar high school found.");
        }
      })
      .catch((error) => {
        props.setResult([]);
        props.setErrorMessage("No similar high school found.");
      });
    }

    return (
      <SearchBar classes={ classes } handleSearch={ handleSearch } placeholder="Search for Similar High School" detail={true}/>
    );

}
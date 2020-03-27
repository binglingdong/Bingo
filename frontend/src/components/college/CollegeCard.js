import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ApplicationTracker from '../college/ApplicationTracker';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    paddingBottom: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    marginBottom: 15,
    marginLeft: 20,
    color: "rgb(80,81,85)"
  },
  title2: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  list: {
    columnCount: 2,
    textAlign: "left"
  }
});


export default function SimpleCard(props) {
  const classes = useStyles();
  // const res = JSON.parse(props.college.majors)
  const majorArray = JSON.parse(props.college.majors)

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h6" align="left" className={classes.title}>
            Scores
        </Typography>
          <Grid container direction="row" justify="space-between" alignItems="flex-start">
            <Grid item xs={3}>
              <Typography className={classes.title2}>SAT MATH</Typography> {props.college.SAT_math}
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.title2}>SAT EBRW</Typography> {props.college.SAT_EBRW}
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.title2}>ACT</Typography> {props.college.ACT_composite}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h6" align="left" className={classes.title}>
            Majors Offered
    </Typography>
          <div>
            <ul className={classes.list}>
              {majorArray.map((major, key) =>
                <li key={key} >{major}</li>
              )}
            </ul>
          </div>




        </CardContent>
      </Card>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h6" align="left" className={classes.title}>
            Admission
      </Typography>
      Admission Rate: {props.college.adm_rate}
          <ApplicationTracker />
          <br />
          <br />
          <br />
          <br />
          <br /><br />
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </CardContent>
      </Card>
    </div>
  );
}
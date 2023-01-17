import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, CssBaseline, Paper } from '@material-ui/core';
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    color: theme.palette.text.primary,
    background: '#FF0000'
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    margin: theme.spacing(4, 0, 2),
    color: theme.palette.text.primary,
    textAlign: 'center',
  },
  body: {
    margin: theme.spacing(2, 0),
    textAlign: 'center',
    
   
  },
  button: {
    position: 'absolute',
    left: theme.spacing(2),
    bottom: theme.spacing(2),
  }
}));

export default function HomePage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="sm">
        <Paper className={classes.paper}>
          <Typography variant="h4" className={classes.title}>
            Welcome to Tamil Song Metaphor Search Engine!
          </Typography>
          <Typography variant="body1" className={classes.body}>
                 SEARCH
          </Typography>
          <Typography variant="body1" className={classes.body}>
            Meaning TO Metaphor
          </Typography>
          <Typography variant="body1" className={classes.body}>
            Metaphor TO Meaning
          </Typography>
          <Link to="/search">
            <Button variant="contained" color="primary">
              Search
            </Button>
          </Link>
        </Paper>
      </Container>
    </div>
  );
}

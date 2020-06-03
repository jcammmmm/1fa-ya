import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Header from './layout/Header'
import Dashboard from './leads/Dashboard'

import { Provider } from "react-redux";
import store from "../store";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function App(props) {
    const classes = useStyles();

    return (
      <Provider store={store}>
        <Grid container>
          <Header />
          <Grid item>
            <Paper className={classes.paper}>
              <Fragment>
                <Dashboard />
              </Fragment>
            </Paper>
          </Grid>
        </Grid>
      </Provider>
    )
}

export default App;
ReactDOM.render(<App />, document.getElementById('app'));

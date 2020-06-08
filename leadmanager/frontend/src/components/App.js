import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "../store";
import Header from './layout/Header';
import Dashboard from './leads/Dashboard';
import Alerts from "./layout/Alerts";

import TemporaryDrawer from './layout/Drawer';

// Alert option
const alertOptions = {
  timeout: 3000,
  position: "top center"
};

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
          <Fragment>
            <Header />
            <Grid container style={{ marginTop: 50}}>
              <TemporaryDrawer />
              <Dashboard />
            </Grid>
          </Fragment>
      </Provider>
    )
}

export default App;
ReactDOM.render(<App />, document.getElementById('app'));

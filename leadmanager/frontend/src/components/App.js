import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "../store";
import Header from './layout/Header';
import Dashboard from './leads/Dashboard';

import TemporaryDrawer from './layout/Drawer';


function App() {    
    return (
      <Provider store={store}>
          <Fragment>
            <Header />
            <Grid container style={{ marginTop: 50}}>
              <Dashboard />
            </Grid>
          </Fragment>
      </Provider>
    )
}

export default App;
ReactDOM.render(<App />, document.getElementById('app'));

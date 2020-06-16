import Grid from '@material-ui/core/Grid';
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "../store";
import Header from './layout/Header';
import Dashboard from './leads/Dashboard';

import { BrowserRouter as Router, Route } from 'react-router-dom'
import QRCodes from './leads/QRCodes';

function App() {
    return (
      <Router>
        <Provider store={store}>
            <Fragment>
              <Header />
              <Grid container style={{ marginTop: 50}}>
                <Route exact={true} path="/" component={Dashboard} />
                <Route path="/api/qrcodes" component={QRCodes} />
              </Grid>
            </Fragment>
        </Provider>
      </Router>
    )
}

export default App;
ReactDOM.render(<App />, document.getElementById('app'));

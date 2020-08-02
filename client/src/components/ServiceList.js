import React, { Component, Fragment } from 'react';
import {withStyles} from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid';
import Service from './Service';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

const axios = require('axios');

const styles = theme => ({
  fab: {
      position: 'fixed',
      bottom: theme.spacing(4),
      right: theme.spacing(4),
    },
})

// TODO: add a backdrop while data loads....
class ServiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {services: []};
  }

  componentDidMount() {
    let config = { headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNTk2MzI4NDI0LCJpYXQiOjE1OTYyOTI0MjR9.fRlJ8TD29p05KZzHH4sXHmjwZWw3jmUEWy9sjZLIIQY'}}
    axios.get("http://192.168.1.15:8080/services?size=6", config)
            .then(r => {
              console.log(r)
              this.setState({ 
                services: r.data._embedded.services 
              }); 
            })
            .catch(e => console.log(e));
  }


  render() { 
    const {classes} = this.props;
    const services = this.state.services.map(service => 
        <Grid item key={service.id} style={{padding: '10px'}}>
          <Service service={service}/>
        </Grid>
      );

    // TODO: add a tooltip
    return (
      <Grid container justify="center">
        {services}
        <Link to="/create">
          <Fab 
            color="primary" 
            aria-label="add" 
            className={classes.fab}
          >
            <AddIcon />
          </Fab>
        </Link>
      </Grid>
    );
  }
}
 
export default  withStyles(styles)(ServiceList);
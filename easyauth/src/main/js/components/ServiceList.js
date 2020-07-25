import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Service from './Service';

class ServiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  render() { 
    const services = this.props.services.map(service => 
        <Grid item key={service.id} style={{padding: '10px'}}>
          <Service service={service}/>
        </Grid>
      );
    return (
      <Grid container justify="center">
        {services}
      </Grid>
    );
  }
}
 
export default ServiceList;
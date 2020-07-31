import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Service from './Service';

const axios = require('axios');


class ServiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {services: []};
  }

  componentDidMount() {
    let config = { headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNTk2MjQ4MDE0LCJpYXQiOjE1OTYyMTIwMTR9.MHdeU3szv7EqyjViF3xhpAN5QfYQtjeGGyR8vk6Zq8w'}}
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
    const services = this.state.services.map(service => 
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
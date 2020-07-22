import React, { Component, Fragment } from 'react';
import Service from './Service';

class ServiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  render() { 
    const services = this.props.services.map(service => <Service key={service.id} service={service}/>);
    console.log(services); // 1
    return (
      <Fragment>
        {services}
      </Fragment>
    );
  }
}
 
export default ServiceList;
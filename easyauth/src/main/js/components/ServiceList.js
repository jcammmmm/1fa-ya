import React, { Component, Fragment } from 'react';
import Service from './Service';

class ServiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    console.log(this.props.services[0]);
    return (<Fragment>
      <Service service={this.props.services[0]} />
    </Fragment>);
  }
}
 
export default ServiceList;
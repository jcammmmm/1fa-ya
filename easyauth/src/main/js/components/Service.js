import React, { Component, Fragment } from 'react';

class Service extends Component {
  HOST = "http://localhost:8080";

  constructor(props) {
    super(props);
    this.state = {  }
  }

  componentDidMount() {
    fetch(this.HOST + "services");
  }

  render() { 
    return (<Fragment></Fragment>);
  }
}
 
export default Service;
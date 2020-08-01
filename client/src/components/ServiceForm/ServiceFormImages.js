import React, { Component, Fragment } from 'react';
import { Typography } from '@material-ui/core';

class ServiceFormImages extends Component {
  constructor(props) {
    super(props);
    this.state = { }
  }
  render() { 
    return (
    <Fragment>
      <Typography>
        Añade imágenes aquí
      </Typography>
    </Fragment>);
  }
}
 
export default ServiceFormImages;
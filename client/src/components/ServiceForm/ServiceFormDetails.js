import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';


class ServiceFormDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <Fragment>
        <Typography variant="h6" gutterBottom>
          Detalle
        </Typography>
      </Fragment>
    );
  }
}
 
export default ServiceFormDetails;
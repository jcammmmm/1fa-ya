import React, { Component, Fragment } from 'react';
import { Typography } from "@material-ui/core";

class ShowOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
    <Fragment>
      <Typography>
        Así aparecerá...
      </Typography>
    </Fragment> );
  }
}
 
export default ShowOverview;
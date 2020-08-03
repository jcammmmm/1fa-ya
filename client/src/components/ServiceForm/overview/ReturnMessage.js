import React, { Component, Fragment } from 'react';
import { Typography } from "@material-ui/core";

class ReturnMessage extends Component {
  constructor(props) {
    super(props);
    this.state = { }
  }
  render() { 
    return (
      <Fragment>
        <Typography>
          Mira tu servicio junto a los de la comunidad!
        </Typography>
      </Fragment>
    );
  }
}
 
export default ReturnMessage;
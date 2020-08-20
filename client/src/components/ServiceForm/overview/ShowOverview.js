import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Service from '../../ServiceList/Service'
import { Grid } from '@material-ui/core';

const styles = theme => ({
  formCompiled: {
    padding: theme.spacing(2, 0)
  }
})

class ShowOverview extends Component {
  constructor(props) {
    super(props);
    this.state = props.parentState;
  }

  render() { 
    const { classes } = this.props;
    return ( 
      <Grid container className={classes.formCompiled}>
        <Grid item xs={12}>
          <Service service={this.state} />
        </Grid> 
      </Grid>
    );
  }
}
 
export default withStyles(styles)(ShowOverview);
import React, { Component } from "react";
import { Grid, TextField } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";

const styles = {
  input: {
    height: "1em",
    width: "1em",
    textAlign: "center"
  }
};

class OTPForm extends Component {
  constructor(props) {
    super(props);
    this.state = {char0: '', char1: '', char2: '', char3: ''};
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    console.log(value);
    this.setState({
      [name]: value.charAt(value.length - 1).toUpperCase()
    });
    event.preventDefault();
  }

  render() {
    const { char0, char1, char2, char3 } = this.state;
    return (
      <Grid container spacing={1} justify="center">
        <Grid item>
          <TextField 
            name="char0"
            value={char0}
            onChange={this.onChange}
            variant="outlined"
            InputProps={{ classes: { input: this.props.classes.input } }}
          />
        </Grid>
        <Grid item>
          <TextField
            name="char1"
            value={char1}
            onChange={this.onChange}
            variant="outlined"
            InputProps={{ classes: { input: this.props.classes.input } }}
          />
        </Grid>
        <Grid item>
          <TextField
            name="char2"
            value={char2}
            onChange={this.onChange}
            variant="outlined"
            InputProps={{ classes: { input: this.props.classes.input } }}
          />
        </Grid>
        <Grid item>
          <TextField
            name="char3"
            value={char3}
            onChange={this.onChange}
            variant="outlined"
            InputProps={{ classes: { input: this.props.classes.input } }}
          />
        </Grid>
      </Grid>
    );
  }
}

const StyledOTPForm = withStyles(styles)(OTPForm);
export default StyledOTPForm;
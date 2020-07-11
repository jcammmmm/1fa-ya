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
    this.state = {char0: '', char1: '', char2: '', char3: '', char4: '', char5: ''};
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
    let fields = [];
    for(let charx in this.state) {
        fields.push(
          <Grid item key={charx}>
              <TextField 
                name={charx}
                value={this.state[charx]}
                onChange={this.onChange}
                variant="outlined"
                InputProps={{ classes: { input: this.props.classes.input } }}
              />
          </Grid>
        );
    }

    return (
      <Grid container spacing={1} justify="center">
        {fields}
      </Grid>
    );
  }
}

const StyledOTPForm = withStyles(styles)(OTPForm);
export default StyledOTPForm;
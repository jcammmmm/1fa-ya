import React, { Component, Fragment } from "react";
import { Grid, TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";

const styles = {
  input: {
    height: "1em",
    width: "1em",
    textAlign: "center"
  },
};

class OTPForm extends Component {
  constructor(props) {
    super(props);
    this.state = {char0: '', char1: '', char2: '', char3: '', char4: '', char5: ''};
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value.charAt(value.length - 1).toUpperCase()
    });
    event.preventDefault();
  }

  onSubmit(event) {
    let secretCode = "";
    for(let charx in this.state)
      secretCode += this.state[charx];
    
    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ secretCode: secretCode })
    }
    fetch('http://localhost:8080/otpAuth', requestOptions).then(response => console.log(response));
    
    alert('El código fue enviado!' + ' (' + secretCode +  ')');
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
      <form onSubmit={this.onSubmit}>
        <Grid container spacing={1} justify="center" style={{ padding: '40px 0px' }} >
          {fields}
        </Grid>
        <Button
                style={{ align: 'right' }}
                variant="contained"
                size="small"
                color="primary"
                type="submit"
              >
                Enviar
        </Button>
      </form>
    );
  }
}

const StyledOTPForm = withStyles(styles)(OTPForm);
export default StyledOTPForm;
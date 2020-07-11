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
    this.state = {char0: { value: '', error: false }, 
                  char1: { value: '', error: false }, 
                  char2: { value: '', error: false }, 
                  char3: { value: '', error: false }, 
                  char4: { value: '', error: false }, 
                  char5: { value: '', error: false } };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const char = value.charAt(value.length - 1).toUpperCase();
    const regex = RegExp('^([0-9]|[A-Z])$')
    
    let charIsValid = true;
    
    if(!regex.test(char))
      charIsValid = false;

    this.setState({
      [name]: { value: value.charAt(value.length - 1).toUpperCase(), error: !charIsValid }
    });

    event.preventDefault();
  }

  onSubmit(event) {
    let secretCode = "";
    let isValid = true;
    for(let charx in this.state) {
      let charValue = this.state[charx].value;
      secretCode += charValue;
      if (charValue === '') {
        alert("El código no está completo.") 
        isValid = false;
        break;
      }

      if (this.state[charx].error) {
        alert("El código no es valido!")
        isValid = false;
        break;
      }
    }

    if(isValid) {
      let requestOptions = {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ secretCode: secretCode })
      }
      fetch('http://localhost:8080/otpAuth', requestOptions).then(response => console.log(response));
      
      alert('El código fue enviado!' + ' (' + secretCode +  ')'); 
    }
    event.preventDefault();
  }

  render() {
    let fields = [];
    for(let charx in this.state) {
        fields.push(
          <Grid item key={charx}>
              <TextField 
                name={charx}
                value={this.state[charx].value}
                onChange={this.onChange}
                variant="outlined"
                InputProps={{ classes: { input: this.props.classes.input } }}
                error={this.state[charx].error}
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
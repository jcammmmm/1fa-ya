import { Collapse } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import React, { Component, Fragment } from 'react';

class AddDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      serviceName: props.data.serviceName,       // string ""
      serviceDetails: props.data.serviceDetails, // string ""
      servicePrice: props.data.servicePrice,     // integer
      showPrice: props.data.showPrice,           // bool
      tradeable: props.data.tradeable            // bool
    }
    this.handleInputTextChange = this.handleInputTextChange.bind(this)
    this.handleInputNumberChange = this.handleInputNumberChange.bind(this)
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this)
  }

  handleInputTextChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    })
  }

  handleInputNumberChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    })
  }

  handleCheckBoxChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.checked
    })
  }

  componentWillUnmount() {
    this.props.submitHandler(this.state, this.props.formName);
  }

  render() { 
    const {classes} = this.props
    return (
      <Fragment>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="serviceName"
              name="serviceName"
              value={this.state.serviceName}
              label="Nombre"
              fullWidth
              autoComplete="given-name"
              onChange={this.handleInputTextChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="serviceDetails"
              name="serviceDetails"
              value={this.state.serviceDetails}
              label="Descripción"
              fullWidth
              multiline
              autoComplete="family-name"
              onChange={this.handleInputTextChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControlLabel
              control={
                <Checkbox 
                  color="primary" 
                  name="tradeable" 
                  checked={this.state.tradeable} 
                  onChange={this.handleCheckBoxChange}
                />
              }
              label="aceptas intercambios?"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox 
                  color="primary"
                  name="showPrice"
                  checked={this.state.showPrice} 
                  onChange={this.handleCheckBoxChange}
                />
              }
              label="publicar precio?"
            />
          </Grid>
          <Grid item container xs={12} sm={6}>
            <Collapse in={this.state.showPrice}>
                    <TextField
                        id="servicePrice"
                        name="servicePrice"
                        value={this.state.servicePrice}
                        label="Precio"
                        autoComplete="price"
                        type="tel"
                        onChange={this.handleInputNumberChange}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        fullWidth
                      />
            </Collapse>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
 
export default AddDetails;
import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import withStyles from '@material-ui/core/styles/withStyles'
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import AddIcon from '@material-ui/icons/Add';
import { Zoom, Paper, Collapse  } from '@material-ui/core';
import AddContacts from './details/AddContacts'
import AddSocial from './details/AddSocial';

const styles = theme => ({
  checkBox: {
    '& > .MuiGrid-item': {
      padding: theme.spacing(0)
    }
  }
});

class ServiceFormDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      serviceName: "",
      serviceDetails: "",
      servicePrice: "",
      showPrice: false,
      tradeable: true,
      tags: [],
      contacts: [],
      webUris: [],
      formControls: {
        showAddContacts: false,
        showAddTags: false,
        showAddWebUris: false
      }
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
              label="Nombre"
              fullWidth
              autoComplete="given-name"
              onChange={this.handleInputTextChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="serviceDescription"
              name="serviceDescription"
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
          <Grid item xs={7} sm={6}>
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
          <Grid item container xs={5} sm={6}>
            <Collapse in={this.state.showPrice}>
                    <TextField
                        id="servicePrice"
                        name="servicePrice"
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
          
          <Grid item xs={12} md={6}>
            <AddContacts />
          </Grid>
          <Grid item xs={12} md={6}>
            <AddSocial />
          </Grid>

          {/* 
          <
          <Grid item xs={12} md={6}>
            <Button
              color="secondary"
              startIcon={<AddIcon />}
              onClick={this.handleAddContact}
            >
              Añadir Etiquetas
            </Button>
          </Grid> */}
        </Grid>
      </Fragment>
    );
  }
}
 
export default ServiceFormDetails;
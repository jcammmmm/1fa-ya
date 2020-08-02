import React, { Component, Fragment } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import InputAdornment from '@material-ui/core/InputAdornment';
import AddIcon from '@material-ui/icons/Add';
import { Fade } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";


class AddContacts extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      contactInputs: [],
      open: false,
      collapseTimeout: 800
    };
    this.toggleValue = this.toggleValue.bind(this);
    this.addInput = this.addInput.bind(this);
    this.setCollapseTimeout = this.setCollapseTimeout.bind(this);
  }

  addInput(event) {
    this.toggleValue(false);
    this.setCollapseTimeout(0);
    this.setState(prev => {
      const n = prev.contactInputs.lenght;
      return {
        contactInputs: [
          <TextField
            id="phoneNumber"
            name="phoneNumber"
            label="Teléfono"
            autoComplete="price"
            type="number"
            onChange={this.handleInputNumberChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">#</InputAdornment>,
            }}
          fullWidth
          />,
          ...prev.contactInputs,
        ]
      }
    });
    setTimeout(() => {
      this.setCollapseTimeout(800);
      this.toggleValue(true);
    }, 300)
  }

  setCollapseTimeout(value) {() => ({collapseTimeout: value})}

  toggleValue(value) {
    this.setState(() => {
      return { open: value }
    })
  }

  render() {
    const inputs = this.state.contactInputs.map((it, i) => {
      let input;
      if (i != this.state.contactInputs.length - 1) {
        input = it;
      } else {
        input = (
            <Collapse
              timeout={this.state.collapseTimeout}
              in={this.state.open}
            >
              {it}
            </Collapse>
        )
      }
      return (
        <Grid item key={i} xs={8}>
          {input}
        </Grid>
      )
    })
    return (
      <Grid container>
            {/* TODO: */}
            {/* https://material-ui.com/components/text-fields/#integration-with-3rd-party-input-libraries */}
            {/* {this.state.contactInputs} */}
            {inputs}
            <Button
              color="primary"
              startIcon={<AddIcon />}
              onClick={this.addInput}
            >
              Agregar Contacto
            </Button>
      </Grid>
    );
  }
}
 
export default AddContacts;
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Grid from "@material-ui/core/Grid";
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import React, { Component, Fragment } from "react";

class AddContacts extends Component {
  constructor(props) {
    super(props);
    if (props.parentState.length == 0) {
      this.state = {
        contactData: [
          {number: ""},
          {number: ""},
          {number: ""}
        ]
      }
    } else {
      this.state = {
        contactData: props.parentState
      }
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const value = event.target.value;
    const index = event.target.name + "";
    this.setState((prev) => {
      const newContactData = prev.contactData;
      newContactData[index].number = value;
      return { contactData: newContactData };
    });
    event.preventDefault();
  }

  componentWillUnmount() {
    this.props.stateHandler(this.state, this.props.stateName);
  }

  render() {
    let inputs = [];
    this.state.contactData.map((contact, index) => {
      inputs.push(
        <Grid key={index} item xs={12}>
          <TextField
            name={index + ""}
            value={contact.number}
            onChange={this.handleInputChange}
            label="Teléfono"
            autoComplete="phone"
            type="tel"
            InputProps={{
              startAdornment: <InputAdornment position="start">#</InputAdornment>,
            }}
          />
      </Grid>
      )
    })

    return (
      <Grid container>
            {/* TODO: */}
            {/* https://material-ui.com/components/text-fields/#integration-with-3rd-party-input-libraries */}
        {inputs}
      </Grid>
    );
  }
}
 
export default AddContacts;
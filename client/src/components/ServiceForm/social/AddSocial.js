import Grid from "@material-ui/core/Grid";
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import React, { Component } from "react";

class AddSocial extends Component {
  constructor(props) {
    super(props);
    if (props.parentState.length == 0) {
      this.state = {
        socialData: [
          {url: ""},
          {url: ""},
          {url: ""}
        ]
      }
    } else {
      this.state = {
        socialData: props.parentState
      }
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const value = event.target.value;
    const index = event.target.name + "";
    this.setState((prev) => {
      const newSocialData = prev.socialData;
      newSocialData[index].url = value;
      return { socialData: newSocialData };
    });
    event.preventDefault();
  }

  componentWillUnmount() {
    this.props.stateHandler(this.state, this.props.stateName);
  }

  render() {
    let inputs = [];
    this.state.socialData.map((social, index) => {
      inputs.push(
        <Grid key={index} item xs={12}>
          <TextField
            name={index + ""}
            value={social.url}
            onChange={this.handleInputChange}
            label="URL"
            autoComplete="socialmedia"
            fullWidth
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
 
export default AddSocial;
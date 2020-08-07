/* eslint-disable no-use-before-define */
import React, {Component} from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export default class AddTags extends Component {
  constructor(props) {
    super(props);
    this.state = props.parentState;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ selected: value });
  }

  componentWillUnmount() {
    // Tricky step. Since we are getting the data after the constructor
    // is called, the tags in subsequent renderings will be an empty array.
    // So we override this behavior by sending the array of tags here.
    let data = { selected: this.state.selected, tags: this.props.parentState.tags };
    this.props.stateHandler(data , this.props.stateName);
  }

  render() {
    return (
        <Autocomplete
          multiple
          id="tags-standard"
          options={this.props.parentState.tags}
          getOptionLabel={(option) => option.name}
          value={this.state.selected}
          onChange={(event, value) => this.handleChange(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Etiquetas para tu servicio"
              placeholder="Escribe aquí"
            />
          )}
        />
    );
  }
}
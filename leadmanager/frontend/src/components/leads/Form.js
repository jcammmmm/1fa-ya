import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLead } from '../../actions/leads';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';

export class Form extends Component {
  state = {
    name: '',
    email: '',
    message: ''
  }

  static propTypes = {
    addLead: PropTypes.func.isRequired
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { name, email, message } = this.state;
    const lead = { name, email, message }
    this.props.addLead(lead);
    console.log('submit')
  }

  render() {
    const { name, email, message } = this.state
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add email</h2>
        <form onSubmit={this.onSubmit}>
          <Grid container spacing={2}>
            <Grid item>
              <TextField 
                label="nombre" 
                name="name"
                value={name}
                onChange={this.onChange}
              />
            </Grid>
            <Grid item>
              <TextField 
                label="email" 
                name="email"
                onChange={this.onChange}
                value={email}
              />
            </Grid>
            <Grid item>
              <TextField
                id="standard-multiline-static"
                label="mensaje"
                multiline
                name="message"
                onChange={this.onChange}
                value={message}
              />
            </Grid>
          </Grid>
          <Button
              style={{ marginTop: 16 }}
              variant="contained"
              color="primary"
              type="submit"
            >
              Submit
          </Button>
        </form>
      </div>
    )
  }
}

export default connect(null, { addLead })(Form);

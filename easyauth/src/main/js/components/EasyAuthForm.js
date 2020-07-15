/**
 *  SCHEDULED FOR DELETION 
 */
import React, { Component } from "react";
import { Grid, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', email: '', message: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
    event.preventDefault();
  }

  handleSubmit(event) {
    alert('El código fue enviado!');
    event.preventDefault();
  }

  render() {
    const { name, email, message } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Escribe tu Código Único</h2>
        <form onSubmit={this.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item>
              <TextField 
                label="nombre" 
                name="name"
                value={name}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item>
              <TextField 
                label="email" 
                name="email"
                onChange={this.handleChange}
                value={email}
              />
            </Grid>
            <Grid item>
              <TextField
                id="standard-multiline-static"
                label="mensaje"
                multiline
                name="message"
                onChange={this.handleChange}
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
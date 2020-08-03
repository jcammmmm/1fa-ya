import React, { Component, Fragment } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from "@material-ui/core/Grid";
import DeleteIcon from '@material-ui/icons/Delete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import {faFacebook} from '@fortawesome/free-brands-svg-icons/faFacebook'
import {faInstagram} from '@fortawesome/free-brands-svg-icons/faInstagram'
import {faTwitter} from '@fortawesome/free-brands-svg-icons/faTwitter'

// TODO: https://material-ui.com/components/icons/#font-awesome
// TODO: https://github.com/FortAwesome/react-fontawesome#build-a-library-to-reference-icons-throughout-your-app-more-conveniently
class AddSocial extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      contactInputs: [],
      open: false,
      collapseTimeout: 500,
      contactData: { },
    };
    this.toggleValue = this.toggleValue.bind(this);
    this.addInput = this.addInput.bind(this);
    this.setCollapseTimeout = this.setCollapseTimeout.bind(this);
    this.deleteInput = this.deleteInput.bind(this);
    this.createInput = this.createInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    // This number always increments, ensuring key uniqueness
    this.currCounter = 0;

  }

  deleteInput(item) {    
    this.setState((prev) => {
      const newInputs = prev.contactInputs.slice(0);
      const index = newInputs.indexOf(item);
      newInputs.splice(index, 1);
      return { contactInputs: newInputs }
    })
  }

  addInput(event) {
    this.toggleValue(false);
    this.setCollapseTimeout(0);
    this.setState(prev => {
      const n = this.currCounter++;
      const newContactData = prev.contactData;
      newContactData[n] = '';
      return {
        contactInputs: [ n, ...prev.contactInputs ],
        contactData: newContactData
      }
    });
    setTimeout(() => {
      this.setCollapseTimeout(300);
      this.toggleValue(true);
    }, 100)
  }

  setCollapseTimeout(value) {
    this.setState(() => ({collapseTimeout: value}));
  }

  toggleValue(value) {
    this.setState(() => { return { open: value } });
  }

  
  handleInputChange(event, id) {
    console.log(id);
    console.log(event.target.value);
    const value = event.target.value;
    this.setState((prev) => {
      const newContactData = prev.contactData;
      newContactData[id] = value;
      return { contactData: newContactData };
    });
    event.preventDefault();
  }

  createInput(collapsable, id) {
    let input = (
      <TextField
        id={"link" + id}
        name={"link" + id}
        value={this.state.contactData[id]}
        onChange={event => this.handleInputChange(event, id)}
        label="Enlace"
        autoComplete="link"
        type="text"
        InputProps={{
          startAdornment: <InputAdornment position="start">www</InputAdornment>,
        }}
        fullWidth
      />
    )

    let wrapper;

    if(collapsable) {
      wrapper = (<Collapse
                  timeout={this.state.collapseTimeout}
                  in={this.state.open}
                >
                  {input}
                </Collapse>)
    } else {
      wrapper = input;
    }

    return (
      <Grid container>
        <Grid item xs={8}>
          {wrapper}
        </Grid>
        <Grid item xs={4}>
          <div style={{marginTop: 13}} />
          <Button
            color="secondary"
            startIcon={<DeleteIcon fontSize="large"/>}
            onClick={() => this.deleteInput(id)}
          />
        </Grid>
      </Grid>
    )
  }


  render() {
    const inputsQtty = this.state.contactInputs.length;
    const inputs = this.state.contactInputs.map((i, index) => {
      let input;
      if (index == inputsQtty - 1) {
        input = this.createInput(true, i)
      } else {
        input = this.createInput(false, i);
      }
      return (
        <Fragment key={i}>
          {input}
        </Fragment>
      )
    })
    return (
      <Grid container>
            {/* TODO: */}
            {/* https://material-ui.com/components/text-fields/#integration-with-3rd-party-input-libraries */}
            {inputs}
            <Grid item xs={12}>
              <Button
                color="primary"
                onClick={this.addInput}
                startIcon={[<FontAwesomeIcon icon={faFacebook} size="lg" key={1}/>, 
                            <FontAwesomeIcon icon={faInstagram} size="lg" key={2}/>, 
                            <FontAwesomeIcon icon={faTwitter} size="lg" key={3}/>]}
              >
                Agregar
                
              </Button>
            </Grid>
      </Grid>
    );
  }
}
 
export default AddSocial;
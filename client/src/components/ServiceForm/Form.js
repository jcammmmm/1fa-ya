import { Button, Paper, Step, StepConnector, StepContent, StepLabel, Stepper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AddContacts from './contacts/AddContacts';
import AddDetails from './details/AddDetails';
import AddImages from './images/AddImages';
import ShowOverview from './overview/ShowOverview';
import AddSocial from './social/AddSocial';
import AddTags from './tags/AddTags';

import Axios from 'axios';

// TODO: Create a post showing how to remove connectors to material ui vertical stepper
const styles = theme => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3, 0.5),
    // [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
    //   marginTop: theme.spacing(6),
    //   marginBottom: theme.spacing(6),
    //   padding: theme.spacing(3),
    // }
    actionsContainer: {
      marginBottom: theme.spacing(2)
    }
  },
  stepper: {
    padding: theme.spacing(3, 1.8, 5),
  },
  stepContent: {
    borderLeft: 0,
    paddingLeft: 0,
    marginLeft: 0
  },
  stepperLine: {
    display: 'none'
  }
})

const steps = ['Describe tu Servicio',
               'Añade números de contacto',
               'Enlaza tus redes sociales',
               'Sube un par imágenes',
               'Aparece en las búsquedas añadiendo etiquetas',
               'Qué tal queda?'
              ]

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 5,
      detailsState: { 
        serviceName: "",
        serviceDetails: "",
        servicePrice: "",
        showPrice: false,
        tradeable: false
      },
      contactsState: {
        contactInputs: [],    // only holds the state of wich input is currently rendered/deleted
        open: false,          // applies to the last added input to make the collapse effect
        collapseTimeout: 500, // applies to the last added input to make the collapse effect
        contactData: { },     // this object will finally containt the phone numbers
      },
      socialState: {
        contactInputs: [],    
        open: false,          
        collapseTimeout: 500, 
        contactData: { },
      }, 
      imagesState: {
        images: []
      },
      tagsState: {
        tags: [],
        selected: []          // Tags selected throught the form
      }
    }
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.transferState = this.transferState.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
  }

  handleNext() {
    this.setState((state) => {
      return {activeStep: state.activeStep + 1}
    })
  }

  handleBack() {
    this.setState((state) => {
      return {activeStep: state.activeStep - 1}
    })
  }

  transferState(stateData, formName) {
    this.setState(() => ({ [formName]: stateData }));
  }

  componentDidMount() {
    let config = { headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNTk3MTg0MDQzLCJpYXQiOjE1OTY1NzkyNDN9.BhqSBh-UrGzMNzPoYj9RzuEioomq8GPJ3_YCxakwOPE'} };
    Axios.get('http://192.168.1.15:8080/services/tags', config)
          .then(r => {
            console.log(r);
            this.setState(() => ({
              tagsState: {
                tags: r.data
              }
            }));
          })
          .catch(e => console.log(e));
  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return <AddDetails stateHandler={this.transferState} stateName={"detailsState"} parentState={this.state.detailsState}/>
      case 1:
        return <AddContacts stateHandler={this.transferState} stateName={"contactsState"} parentState={this.state.contactsState}/>
      case 2:
        return <AddSocial stateHandler={this.transferState} stateName={"socialState"} parentState={this.state.socialState} />
      case 3:
        return <AddImages stateHandler={this.transferState} stateName={"imagesState"} parentState={this.state.imagesState} />
      case 4: 
        return <AddTags stateHandler={this.transferState} stateName={"tagsState"} parentState={this.state.tagsState} />
      case 5:
        return <ShowOverview />
      default:
        throw new Error('Unknown step')
    }
  }

  render() {
    const {classes} = this.props;
    return (
      <main>
        <Paper className={classes.paper} elevation={11}>
          <Typography component="h1" variant="h5" align="center">
            Agrega lo que ofreces!
          </Typography>
          {/* // TODO: https://material-ui.com/components/steppers/#non-linear */}
          <Stepper orientation="vertical"
                   activeStep={this.state.activeStep}
                   className={classes.stepper}
                  //  The following line aid to remove connector line...
                   connector={<StepConnector classes={{ line: classes.stepperLine }}/>}
                   nonLinear
          >
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent classes={{ root: classes.stepContent}}>
                  <Fragment>
                    {this.getStepContent(index)}
                  </Fragment>
                  <div>
                    <Button
                      disabled={this.state.activeStep === 0}
                      onClick={this.handleBack}
                    >
                      Atrás
                    </Button>
                    <Button
                      color="primary"
                      onClick={this.handleNext}
                    >
                      {this.state.activeStep === steps.length - 1 ? 'Me gusta' : 'Siguiente'}
                    </Button>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {this.state.activeStep === steps.length && (
            <Fragment>
              <Typography>Vuelve atrás y busca tu servicio en la lista!</Typography>
              <Link to="/services" style={{ textDecoration: 'none' }}>
                <Button
                  color="default"
                  variant="contained"
                >
                  Volver
                </Button>
              </Link>
            </Fragment>
          )}
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(Form);
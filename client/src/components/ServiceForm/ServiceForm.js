import React, { Component, Fragment } from 'react';
import {withStyles} from '@material-ui/core/styles'
import { Paper, Typography, Step, Stepper, StepLabel, StepContent, Button } from '@material-ui/core';
import ServiceFormDetails from './ServiceFormDetails';
import ServiceFormImages from './ServiceFormImages';
import ServiceFormOverview from './ServiceFormOverview';
import { Link } from 'react-router-dom';


const styles = theme => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    // [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
    //   marginTop: theme.spacing(6),
    //   marginBottom: theme.spacing(6),
    //   padding: theme.spacing(3),
    // }
    actionsContainer: {
      marginBottom: theme.spacing(2)
    }
  }
})

const steps = ['Describe tu Servicio', 'Añade imágenes', 'Qué tal queda?']

function getStepContent(step) {
  switch (step) {
    case 0:
      return <ServiceFormDetails/>
    case 1:
      return <ServiceFormImages/>
    case 2:
      return <ServiceFormOverview/>
    default:
      throw new Error('Unknown step')
  }
}

class ServiceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0
    }
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
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

  render() { 
    const {classes} = this.props;
    return (
      <main>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5" align="center"> 
            Agrega lo que ofreces!
          </Typography>
          <Stepper activeStep={this.state.activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                <Fragment>
                  {getStepContent(index)}
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
                    Siguiente
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
                  color="primary"
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
 
export default withStyles(styles)(ServiceForm);
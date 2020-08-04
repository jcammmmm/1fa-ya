import { Button, Paper, Step, StepConnector, StepContent, StepLabel, Stepper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AddDetails from './details/AddDetails'
import AddContacts from './contacts/AddContacts'
import AddSocial from './social/AddSocial'
import AddImages from './images/AddImages'
import AddTags from './tags/AddTags'
import ShowOverview from './overview/ShowOverview'
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

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
      activeStep: 3
    }
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.addSubFormData = this.addSubFormData.bind(this);
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

  addSubFormData(data, formName) {
    this.setState(() => ({ [formName]: data }));
  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return <AddDetails submitHandler={this.addSubFormData} formName={"details"} />
      case 1:
        return <AddContacts submitHandler={this.addSubFormData} formName={"contacts"} />
      case 2:
        return <AddSocial submitHandler={this.addSubFormData} formName={"social"} />
      case 3:
        return <AddImages submitHandler={this.addSubFormData} formName={"images"} />
      case 4: 
        return <AddTags submitHandler={this.addSubFormData} formName={"tags"} />
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
        <Paper className={classes.paper}>
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
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

const MEDIA_HOST = 'http://localhost:8000'

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
      activeStep: 4,
      myHouse: {
        address: "Cr 81 B # 56 A 65"
      },
      detailsState: { 
        serviceName: "Fabricación de Calzado de alta costura",
        serviceDetails: "Se fabrica calzado de alta costura. Técnicas Italianas. Máxima ergonomía.",
        servicePrice: "54000",
        showPrice: true,
        tradeable: true
      },
      contactsState: [
        {number: 3828299393},
        {number: 3828299393},
        {number: 3828299393}
      ],
      socialState: [
        {url: "www.facebook.com/myservice"},
        {url: "www.instragram.com/myservice"},
        {url: "www.twitter.com/myservice"},
      ], 
      imagesState: {
        photos: [ 
          {url: "http://lorempixel.com/640/480/business"},
          {url: "http://lorempixel.com/640/480/city"},
          {url: "http://lorempixel.com/640/480/abstract"}
        ]
      },
      tagsState: {
        tags: [],
        selected: [
          {id: 4, name: "Fabricación Calzado"},
          {id: 3, name: "Restauración Calzado"},
          {id: 3, name: "Lavado Carros"}
        ]          // Tags selected throught the form
      }
    }
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.transferState = this.transferState.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.craftServiceData = this.craftServiceData.bind(this);
    this.dataURItoBlob = this.dataURItoBlob.bind(this);
    this.uploadPhotos = this.uploadPhotos.bind(this);
    this.postService = this.postService.bind(this);
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
    Axios.get('http://192.168.1.15:8080/tags', config)
          .then(r => {
            this.setState(() => ({
              tagsState: {
                tags: r.data
              }
            }));
          })  
          .catch(e => console.log(e));

    Axios.get('http://192.168.1.15:8080/houses/my', config)
            .then(r => {
              this.setState(() => ({
                myHouse: r.data
              }))
            })
          .catch(e => console.log(e));
  }

  postService() {
    this.uploadPhotos(this.state.imagesState.photos);

  }

  uploadPhotos(photos) {
    const formData = new FormData();
    
    for(let i in photos) {
      var photo = this.dataURItoBlob(photos[i].url, 'image/png');
      formData.append('photos', photo, (Math.random() + '').split('.')[1] + '.png');
    }
    formData.append('folder', (Math.random() + '').split('.')[1]);
    
    const url = MEDIA_HOST + '/upload-photos'
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    }
    Axios.post(url, formData, config)
      .then(r => {
        let uploadedPhotosUrl = [];
        r.data.forEach(element => {
          uploadedPhotosUrl.push({
            url: MEDIA_HOST + element.url
          })
        });
        console.log(uploadedPhotosUrl);
        this.setState({
          imagesState: {
            photos: uploadedPhotosUrl
          }
        });
      }
    );
  }

  dataURItoBlob(dataURI, type) {
    // TODO only execute below code if url is base64 encoded....

    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    var bb = new Blob([ab], { type: type });
    return bb;
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
        let serviceData = this.craftServiceData();
        return <ShowOverview parentState={serviceData} />
      default:
        throw new Error('Unknown step')
    }
  }

  craftServiceData() {
    let service = {
      "name":         this.state.detailsState.serviceName,
      "description":  this.state.detailsState.serviceDetails,
      "price":        this.state.detailsState.servicePrice,
      "publishPrice": this.state.detailsState.showPrice,
      "house":        this.state.myHouse,
      "tags":         this.state.tagsState.selected,
      "photos":       this.state.imagesState.photos,
      "cellphones":   this.state.contactsState,
      "webUris":      this.state.socialState
    }

    return service;
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
                      {this.state.activeStep === steps.length - 1 ?
                        <Button
                          color="primary"
                          onClick={() => {this.postService(); this.handleNext();}}
                        >
                          Me gusta
                        </Button>
                      :
                        <Button
                          color="primary"
                          onClick={this.handleNext}
                        >
                          Siguiente
                        </Button>}
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
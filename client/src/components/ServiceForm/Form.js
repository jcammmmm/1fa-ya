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
      activeStep: 3,
      myHouse: {},
      detailsState: { 
        serviceName: "",
        serviceDetails: "",
        servicePrice: "",
        showPrice: false,
        tradeable: false
      },
      contactsState: {
        contactData: [ 
          {"number": ""}, 
          {"number": ""}, 
          {"number": ""}]
      },
      socialState: {
        contactInputs: [],    
        open: false,          
        collapseTimeout: 500, 
        contactData: { },
      }, 
      imagesState: {
        photos: [ ]
      },
      tagsState: {
        tags: [],
        selected: [ ]          // Tags selected throught the form
      }
    }
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.transferState = this.transferState.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.craftServiceData = this.craftServiceData.bind(this);
    this.sparceArrayToList = this.sparceArrayToList.bind(this);
    this.getSampleState = this.getSampleState.bind(this);
    this.dataURItoBlob = this.dataURItoBlob.bind(this);
    this.uploadPhotos = this.uploadPhotos.bind(this);
    this.postService = this.postService.bind(this);

    // this.state = this.getSampleState();
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

    Axios.get('http://192.168.1.15:8080/houses/my', config)
            .then(r => {
              console.log(r);
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
    var photo = this.dataURItoBlob(photos[0].url, 'image/png');

    const formData = new FormData();
    const url = 'http://localhost:8000/upload-image'
    formData.append('image', photo, 'buahahahah.png');
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    }
    Axios.post(url, formData, config);



    console.log(photo);
  }

  dataURItoBlob(dataURI, type) {
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
        let serviceData = this.craftServiceData(this.state);
        return <ShowOverview parentState={serviceData} />
      default:
        throw new Error('Unknown step')
    }
  }

  craftServiceData() {
    return {
      "name": this.state.detailsState.serviceName,
      "description": this.state.detailsState.serviceDetails,
      "price": this.state.detailsState.servicePrice,
      "publishPrice": this.state.detailsState.showPrice,
      "house": this.state.myHouse,
      "tags": this.state.tagsState.selected,
      "photos": this.state.imagesState.images,
      "cellphones": this.sparceArrayToList(this.state.contactsState.contactData),
      "webUris": this.sparceArrayToList(this.state.socialState.contactData),

    }
  }

  sparceArrayToList(contactData) {
    let dataList = [];
    for(let i in contactData) {
      dataList.push(contactData[i])
    }
    return dataList;
  }

  getSampleState() {
    return {
      "activeStep": 1,
      "myHouse": {
        "id": 1,
        "name": "Vi.",
        "mainPhoto": "proto://cnd.uri/700",
        "location": "proto://map.uri/135",
        "address": "Cll 43 # 44 - 9"
      },
      "detailsState": {
        "serviceName": "Restauración de Calzado profesional",
        "serviceDetails": "Restauramos calzado de cualquier tipo especialmente artículos de cuero",
        "servicePrice": "34000",
        "showPrice": true,
        "tradeable": true
      },
      "contactsState": {
        "contactInputs": [
          3,
          2,
          1,
          0
        ],
        "open": true,
        "collapseTimeout": 300,
        "contactData": {
          "0": "321789903",
          "1": "321789902",
          "2": "321789901",
          "3": "321789904"
        }
      },
      "socialState": {
        "contactInputs": [
          1,
          0
        ],
        "open": true,
        "collapseTimeout": 300,
        "contactData": {
          "0": "facebook.com/buahahah",
          "1": "instagram.com/buahahah",
          "2": "instagram.com/buahahaha"
        }
      },
      "imagesState": {
        "images": [
          "http://imagehosting.net/image1",
          "http://imagehosting.net/image2"
        ]
      },
      "tagsState": {
        "selected": [
          {
            "id": 1,
            "name": "Restauración Calzado"
          },
          {
            "id": 4,
            "name": "Paseo Perros"
          },
          {
            "id": 3,
            "name": "Calzado a la Medida"
          }
        ],
        "tags": [
          {
            "id": 1,
            "name": "Restauración Calzado"
          },
          {
            "id": 2,
            "name": "Fabricación Calzado"
          },
          {
            "id": 3,
            "name": "Calzado a la Medida"
          },
          {
            "id": 4,
            "name": "Paseo Perros"
          },
          {
            "id": 5,
            "name": "Ropa a la Medida"
          },
          {
            "id": 6,
            "name": "Domicilios"
          },
          {
            "id": 7,
            "name": "Mandado"
          },
          {
            "id": 8,
            "name": "Voy haciendo fila"
          },
          {
            "id": 9,
            "name": "Corresponsal Mammi"
          },
          {
            "id": 10,
            "name": "Software a la Medida"
          },
          {
            "id": 11,
            "name": "Arreglos Modistería"
          },
          {
            "id": 12,
            "name": "Arreglos Computadores"
          },
          {
            "id": 13,
            "name": "Arreglos Electrodomésticos"
          },
          {
            "id": 14,
            "name": "Arreglos Mecánica"
          },
          {
            "id": 15,
            "name": "Almuerzos"
          },
          {
            "id": 16,
            "name": "Almuerzos Caseros"
          },
          {
            "id": 17,
            "name": "Cocinar platos demás"
          },
          {
            "id": 18,
            "name": "Cuidar Niños"
          },
          {
            "id": 19,
            "name": "Carnicería"
          },
          {
            "id": 20,
            "name": "Asesorías Metemáticas"
          },
          {
            "id": 21,
            "name": "Asesorías Física"
          },
          {
            "id": 22,
            "name": "Asesorías Química"
          },
          {
            "id": 23,
            "name": "Asesorías Académicas"
          },
          {
            "id": 24,
            "name": "Lavado Carros"
          },
          {
            "id": 25,
            "name": "Conductor Taxi"
          },
          {
            "id": 26,
            "name": "Conductor Plataforma"
          },
          {
            "id": 27,
            "name": "Yoga"
          },
          {
            "id": 28,
            "name": "Panadería"
          },
          {
            "id": 29,
            "name": "Arreglo Bicicletas"
          },
          {
            "id": 30,
            "name": "Aseo Casas"
          },
          {
            "id": 31,
            "name": "Pintura Casas"
          },
          {
            "id": 32,
            "name": "Fruver"
          },
          {
            "id": 33,
            "name": "Arepas"
          },
          {
            "id": 34,
            "name": "Arepas y Chorizos"
          },
          {
            "id": 35,
            "name": "Comidas Rápidas"
          },
          {
            "id": 36,
            "name": "Mango Biches"
          },
          {
            "id": 37,
            "name": "Helados"
          },
          {
            "id": 38,
            "name": "Fotocopias"
          },
          {
            "id": 39,
            "name": "Servicio de abogado"
          },
          {
            "id": 40,
            "name": "Ayuda Espiritual"
          },
          {
            "id": 41,
            "name": "Alquilo Carro"
          },
          {
            "id": 42,
            "name": "Alquilo Moto"
          },
          {
            "id": 43,
            "name": "Asesoría Inglés"
          },
          {
            "id": 44,
            "name": "Arreglos Eléctricos"
          },
          {
            "id": 45,
            "name": "Instalaciones Eléctricas"
          },
          {
            "id": 46,
            "name": "Ferretería"
          },
          {
            "id": 47,
            "name": "Pañalera y Bebes"
          },
          {
            "id": 48,
            "name": "Salsamentaria"
          },
          {
            "id": 49,
            "name": "Pollería"
          },
          {
            "id": 50,
            "name": "Pollos Asados"
          },
          {
            "id": 51,
            "name": "Bar"
          },
          {
            "id": 52,
            "name": "Rock"
          },
          {
            "id": 53,
            "name": "Salsa"
          },
          {
            "id": 54,
            "name": "Regge"
          },
          {
            "id": 55,
            "name": "Sala de Ensayos"
          },
          {
            "id": 56,
            "name": "Instructor Guitarra"
          },
          {
            "id": 57,
            "name": "Instructor Piano"
          },
          {
            "id": 58,
            "name": "Instructor Violín"
          },
          {
            "id": 59,
            "name": "Ornamentación"
          },
          {
            "id": 60,
            "name": "Acarreos"
          }
        ]
      }
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
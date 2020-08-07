import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Service from '../../Service'
import { Grid } from '@material-ui/core';

const styles = theme => ({
  formCompiled: {
    padding: theme.spacing(2, 0)
  }
})

class ShowOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
    this.serviceData = {
      "id": 1,
      "name": "Tovepa taxiva.",
      "description": "Teiixewaa liebeomoo fiopoo daoevazee weoade doopea mieozagei qii dea enireo oqimeiiki eqekea soa veoohoaba.",
      "avgStar": 4,
      "timesServed": 36,
      "hitCount": 440,
      "price": 9542,
      "units": "svcunit559",
      "publishPrice": false,
      "house": {
        "id": 1,
        "name": "Roo epe ixi.",
        "mainPhoto": "proto://cnd.uri/522",
        "location": "proto://map.uri/129",
        "address": "Cll 29 # 1 - 28"
      },
      "tags": [
        {
          "id": 3,
          "name": "Paseo Perros"
        },
        {
          "id": 2,
          "name": "Transporte Personalizado"
        },
        {
          "id": 1,
          "name": "Viajes"
        }
      ],
      "photos": [
        {
          "id": 1,
          "photoURL": "rnd://url.photo/101"
        },
        {
          "id": 2,
          "photoURL": "rnd://url.photo/472"
        },
        {
          "id": 3,
          "photoURL": "rnd://url.photo/187"
        }
      ],
      "cellphones": [
        {
          "id": 1,
          "number": "3101789077"
        },
        {
          "id": 2,
          "number": "3101070779"
        },
        {
          "id": 3,
          "number": "3011171324"
        }
      ],
      "webUris": [
        {
          "id": 1,
          "uri": "rnd://url.content/683"
        },
        {
          "id": 2,
          "uri": "rnd://url.content/482"
        },
        {
          "id": 3,
          "uri": "rnd://url.content/680"
        }
      ]
    }
  }

  render() { 
    const { classes } = this.props;
    return ( 
      <Grid container className={classes.formCompiled}>
        <Grid item xs={12}>
          <Service service={this.serviceData} />
        </Grid> 
      </Grid>
    );
  }
}
 
export default withStyles(styles)(ShowOverview);
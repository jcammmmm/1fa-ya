'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ServiceList from './components/ServiceList';
const axios = require('axios');

class Mammi extends React.Component {

	constructor(props) {
		super(props);
		this.state = {services: []};
	}


	componentDidMount() {
    let config = { headers: { 'Access-Control-Allow-Origin': 'https://localhost:8081' }}
    axios.get("http://localhost:8080/services?size=6", config)
            .then(r => {
              this.setState({ 
                services: r.data._embedded.services 
              }); 
            })
            .catch(e => console.log(e));
  }
  
	render() {
		return (
      <div>
        <Router>
          <NavBar/>
          {/** if you remove this div you will get your content behind the navbar */}
          <div style={{marginTop: 70}} />
          {/*This module is OK!! <Route path="/" component={OTPForm} /> */} 
          <Route path="/" children={<ServiceList services={this.state.services} />} /> 
        </Router>
      </div>
		)
	}
}

ReactDOM.render(
	<Mammi/>,
	document.getElementById('react')
)


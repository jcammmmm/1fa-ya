'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ServiceList from './components/ServiceList';
const when = require('when');
const axios = require('axios');

class Mammi extends React.Component {

	constructor(props) {
		super(props);
		this.state = {services: {}};
	}


	componentDidMount() {
    let config = { headers: { 'Access-Control-Allow-Origin': 'https://localhost:8081' }}
    axios.get("http://localhost:8080/services", config)
            .then(response => {
              return response.data._embedded.services.map(svc => {
                let p = axios.get(svc._links.house.href);
                svc.house = p;
                return svc;
              })
            })
            .then(svcPromises => {
              return when.all(svcPromises)
            })
            .then(r => { this.setState({ services: r }) })
            .catch(e => console.log(e));
  }
  
	render() {
    console.log(this.state.services);
		return (
    <div>
			<Router>
        <NavBar/>
        {/** if you remove this div you will get your content behind the navbar */}
        <div style={{marginTop: 50}} />
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


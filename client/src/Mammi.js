'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/Layout/NavBar';
// import OTPForm from './components/OTPForm';
import ServiceList from './components/ServiceList/ServiceList';
import ServiceForm from './components/ServiceForm/Form';

class Mammi extends React.Component {

	constructor(props) {
		super(props);
	}
  
	render() {
		return (
      <div>
        <Router>
          <NavBar/>
          {/** if you remove this div you will get your content behind the navbar */}
          <div style={{marginTop: 70}} />
          {/* <Route exact path="/otp" component={OTPForm} />  */}
          <Route exact path="/services" component={ServiceList} /> 
          <Route exact path="/create" component={ServiceForm} />
        </Router>
      </div>
		)
	}
}

ReactDOM.render(
	<Mammi/>,
	document.getElementById('react')
)


import React, { Component, Fragment } from 'react';
import RecipeReviewCard from './RecipeReviewCard';

class Service extends Component {
  
  constructor(props) {
    super(props);
    this.state = { }
  }

  render() { 
    return (<RecipeReviewCard/>);
  }
}
 
export default Service;
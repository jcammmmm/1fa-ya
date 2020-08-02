import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

import CarouselUploadedImages from './ServiceFormUploadedImages'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

class ServiceFormImages extends Component {

  constructor(props) {
    super(props);
    this.state = { images: [] }
    this.onImageChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.hiddenFileInput = React.createRef();
  }

  handleChange(event) {
    event.preventDefault();
    // TODO: review
    if(event.target.files && event.target.files[0]) {
      let images = [];
      images.push(URL.createObjectURL(event.target.files[0]));
      this.setState({
        images: images
      })
    }
  }

  handleClick(event) {
    this.hiddenFileInput.current.click();
  }

  // https://medium.com/@masakudamatsu/how-to-customize-the-file-upload-button-in-react-b3866a5973d8
  render() { 
    return (
    <Fragment>
      <CarouselUploadedImages/>
      <Button
        color="secondary"
        onClick={this.handleClick}        
        startIcon={<CloudUploadIcon />}
      >
        Seleccionar
      </Button>
      <input type="file" 
             onChange={this.handleChange} 
             style={{display:"none"}}
             ref={this.hiddenFileInput}          
      />
    </Fragment>);
  }
}
 
export default ServiceFormImages;
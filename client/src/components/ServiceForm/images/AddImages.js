import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

import CarouselUploadedImages from './Preview'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

class AddImages extends Component {

  constructor(props) {
    super(props);
    this.state = this.props.parentState;
    this.onImageChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getPreviewUrl = this.getPreviewUrl.bind(this);
    this.hiddenFileInput = React.createRef();
  }

  handleChange(event) {
    event.preventDefault();
    let photo = event.target.files[0];

    // TODO: https://stackoverflow.com/questions/58924617/componentwillreceiveprops-has-been-renamed
    this.getPreviewUrl(photo).then(previewUrl => {
      this.setState(prev => prev.photos.push({ "url": previewUrl }))
    }); 
  }

  getPreviewUrl(photoFile) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      }
      reader.onerror = (e) => {
        reject(e);
      }
      reader.readAsDataURL(photoFile);
    })
  }

  handleClick(event) {
    this.hiddenFileInput.current.click();
  }

  componentWillUnmount() {
    this.props.stateHandler(this.state, this.props.stateName);
  }

  // https://medium.com/@masakudamatsu/how-to-customize-the-file-upload-button-in-react-b3866a5973d8
  render() { 
    return (
    <Fragment>
      {this.state.photos.length != 0 && <CarouselUploadedImages photos={this.state.photos} />}
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
 
export default AddImages;
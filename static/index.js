const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

const app = express();

// enable files upload
app.use(express.static('./'));
app.use(fileUpload({
    createParentPath: true,
    limits: { 
      fileSize: 2 * 1024 * 1024 * 1024 //2MB max file(s) size
  },
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

//start app 
const port = process.env.PORT || 8000;
app.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
);

app.post('/upload-image', async (req, res) => {
  try {
      if(!req.files) {
          res.send({
              status: false,
              message: 'No file uploaded'
          });
      } else {
          //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
          let photo = req.files.image;
          let folder = req.body.folder;
          
          //Use the mv() method to place the file in upload directory (i.e. "uploads")
          photo.mv('./uploads/' + folder + "/" + photo.name);

          //send response
          res.send({
              status: true,
              message: 'File was uploaded',
              data: {
                  name: photo.name,
                  mimetype: photo.mimetype,
                  size: photo.size
              }
          });
      }
  } catch (err) {
      res.status(500).send(err);
  }
});

app.post('/upload-photos', async (req, res) => {
  try {
      if(!req.files) {
          res.send({
              status: false,
              message: 'No file uploaded'
          });
      } else {
          let data = []; 
          let folder = './uploads/' + req.body.folder + '/';

          photos = req.files.photos;
          if (!Array.isArray(photos))
            photos = [photos]
          
          //loop all files
          _.forEach(_.keysIn(photos), (key) => {
              let photo = photos[key];
              let location = folder + photo.name;
              //move photo to uploads directory
              photo.mv(location);

              //push file details
              data.push({
                  name: photo.name,
                  mimetype: photo.mimetype,
                  size: photo.size,
                  url: location.substring(1) // TODO do this more efficiently...
              });
          });
  
          //return response
          res.send(data);
      }
  } catch (err) {
      res.status(500).send(err);
  }
});
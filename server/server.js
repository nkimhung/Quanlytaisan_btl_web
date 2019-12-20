require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_helpers/error-handler');
const multer = require('multer');

app.use(express.static(__dirname + '/uploads'));

const PATH = './uploads';

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

let upload = multer({
  storage: storage
});

//app.post('/uploadAvatar', upload.single('file'), function (req, res,next) {
app.post('/uploadAvatar',(req, res, next) =>{
  //if (!req.file) {
  //  console.log("No file is available!");
  //  return res.send({
  //      success: false,
  //      file: req.file.path,
  //      name: req.file.filename,
  //      dm: req.filename,
  //      km: req
  //  });
  //    console.log(req.file);

  //} else {
  //   // return req.file.filename;
  //    console.log(req.file);
  //    return res.send(1);
  //    return 2;
  //}
    res.send(1);
   
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
 

// api routes
app.use('/users', require('./routes/users.route'));
app.use('/product', require('./routes/product.route'));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
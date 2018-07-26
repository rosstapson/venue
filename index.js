require('babel-register');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const formidable = require('express-formidable');
const app = express();
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());
// app.use(formidable({
//   encoding: 'utf-8',
//   uploadDir: __dirname + '/images',
//   multiples: true, // req.files to be arrays of files
// }));
const mongoose = require('mongoose');
const Venue = require('./models/Venue');

mongoose.connect('mongodb://venue:password@localhost/venues');
mongoose.Promise = global.Promise
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
try {
  db.once('open', function() {
    // we're connected!
    console.log("connected to mongodb.")
  });
}
catch(error) {
  console.log("damn");
  console.log(error.message);
}
app.use(require('./routes/venueRoutes'));
app.use('/image', express.static('./images/'));
app.listen(3001, () => console.log("zomg! listening on closely on 3001."))

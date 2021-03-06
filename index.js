require('babel-register');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());
const mongoose = require('mongoose');

mongoose.connect('mongodb://venue:password@localhost:27017/venues', { useNewUrlParser: true });
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
app.use(require('./routes/userRoutes'));
app.use('/image', express.static('./images/'));
app.listen(3001, () => console.log("zomg! listening on closely on 3001."))

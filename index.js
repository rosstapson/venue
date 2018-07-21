require('babel-register');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
const mongoose = require('mongoose');
const Venue = require('./models/Venue');

mongoose.connect('mongodb://venue:password@localhost/venues');
mongoose.Promise = global.Promise
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
try {
  db.once('open', function() {
    // we're connected!
    console.log("success")
  });
}
catch(error) {
  console.log("damn");
  console.log(error.message);
}
app.use(require('./routes/venueRoutes'));
app.use('/image', express.static('./images/'));
app.listen(3001, () => console.log("zomg! listening on closely on 3001."))

// var venue = new Venue({name: 'Thirsty Whale', email: 'Someone@thirsty.com'});
// venue.save(function(error) {
//     if(error) {
//         console.log(error.message)
//     }
//  })
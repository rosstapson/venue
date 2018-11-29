import express from 'express';
import Venue from '../models/Venue';
import cuid from 'cuid';
import formidable from 'formidable';

const app = module.exports = express.Router();

app.get('/venues', (req, res) => {
    
    let venues = Venue.find()
        .then((venues) => {           
            res.status(200).send(venues)
        })
        .catch((error) => {
            console.log(error)
            return res.status(418).send({message: error.message})
        })
})
app.post('/venues', (req, res) => {   
    let venue = new Venue(req.body);
    venue.save((error, venue) => {
        if(error) {
            console.log(error);
            return res.status(418).send(error.message)
        }        
        return res.status(201).send({message: 'zomg, success'})
    })
})
app.post('/images', (req, res) => {
    try {
        var form = new formidable.IncomingForm();
        form.parse(req);
        let newName = '';
        form.on('fileBegin', function(name, file) {
            newName = file.name.slice();            
            file.path = '/home/ross/js/venue_server/images/' + file.name;
        });
        res.status(201).send({message: 'zomg', url: newName})
    }
    catch(error) {
        res.status(418).send({message: error.message})
    }
})
    
import express from 'express';
import Venue from '../models/Venue';

const app = module.exports = express.Router();

app.get('/', (req, res) => {
    res.send("here's route folder.")
})

app.get('/venues', (req, res) => {
    
    let venues = Venue.find()
        .then((venues) => {
            console.log('then')
            console.log(venues)
            res.status(200).send(venues)
        })
        .catch((error) => {
            console.log('catch')
            return res.status(418).send({message: error.message})
        })
})
app.post('/venues', (req, res) => {
    console.log(req.body)
    let venue = new Venue(req.body);
    venue.save((error, venue) => {
        if(error) {
            console.log(error);
            return res.status(418).send(error.message)
        }
        console.log('success')
        return res.status(201).send({message: 'zomg, success'})
    })
})
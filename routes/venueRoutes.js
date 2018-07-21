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
            return res.status(418).send(error.message)
        })
    
    
})
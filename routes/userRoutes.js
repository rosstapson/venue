import express from 'express';
import User from '../models/User';
//import cuid from 'cuid';
import formidable from 'formidable';

const app = module.exports = express.Router();

app.get('/', (req, res) => {
    res.send("here's route folder.")
})

app.get('/users', (req, res) => {
    
    let users = User.find()
        .then((users) => {            
            res.status(200).send(users)
        })
        .catch((error) => {           
            return res.status(418).send({message: error.message})
        })
})
app.post('/users', (req, res) => {    
    let user = new User(req.body);
    user.save((error, user) => {
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
    
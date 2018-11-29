import express from 'express';
import User from '../models/User';
//import cuid from 'cuid';
import formidable from 'formidable';

const app = module.exports = express.Router();

app.get('/', (req, res) => {
    res.send("here's root url.")
});
app.post('/login', (req, res) => {
    let userDetails = req.body;    
    let user = User.findOne({username: req.body.username})
        .then((user) => {
            if (user.password !== req.body.password) { // todo: hash and compare
                return res.status(401).send({message: "Invalid Password"});
            }
            return res.status(200).send(user); // todo: send token
        })
        .catch((error) => {
            console.log(error)
            return res.status(401).send({message: "Invalid user credentials"})
        });   

});
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
    // hash password
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
    